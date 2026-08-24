/**
 * Regenerates everything on the profile that is derived from live data:
 *
 *   README.md            the package table between the STATS markers
 *   assets/installs-*.svg  an at-a-glance card with a 60-day install sparkline
 *
 * Deliberately self-hosted. The usual third-party card services (
 * github-readme-stats and friends) are single Vercel deployments shared by
 * hundreds of thousands of profiles — the public one was returning
 * DEPLOYMENT_PAUSED when this was written, which renders as a broken image on
 * every profile pointing at it. Generating the SVG here costs one workflow step
 * and cannot go down independently of GitHub itself.
 *
 * Zero dependencies, and no secrets: everything comes from the public npm
 * registry. If a fetch fails the script throws before writing, so a flaky
 * upstream fails the job rather than committing an empty card.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";

const PACKAGES = ["rn16k", "rn-arch-check"];
const SPARK_DAYS = 60;

const ROOT = new URL("../../", import.meta.url);
const README = new URL("README.md", ROOT);
const START = "<!-- STATS:START -->";
const END = "<!-- STATS:END -->";

/** Matches the portfolio's palette so the two properties read as one identity. */
const THEMES = {
  light: { ink: "#2E2A24", muted: "#6B6459", accent: "#7B2434", line: "#D8D2C8" },
  dark: { ink: "#F2EFE8", muted: "#9A9287", accent: "#D4677C", line: "#33302B" },
};

const day = (offset = 0) =>
  new Date(Date.now() - offset * 86_400_000).toISOString().slice(0, 10);

async function json(url) {
  const res = await fetch(url, { headers: { "user-agent": "mishalibrar-profile" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

async function collect(name) {
  const registry = await json(`https://registry.npmjs.org/${name}`);
  const version = registry["dist-tags"].latest;

  // The earliest publish of any version — not of the current one, which would
  // shorten the "all time" window every time a patch ships.
  const first = Object.entries(registry.time)
    .filter(([k]) => k !== "created" && k !== "modified")
    .map(([, v]) => v)
    .sort()[0]
    .slice(0, 10);

  // npm caps a single range query at 18 months; these are newer than that, so
  // "since the first publish" really is all time.
  const [month, all, range] = await Promise.all([
    json(`https://api.npmjs.org/downloads/point/last-month/${name}`),
    json(`https://api.npmjs.org/downloads/point/${first}:${day()}/${name}`),
    json(`https://api.npmjs.org/downloads/range/${day(SPARK_DAYS)}:${day()}/${name}`),
  ]);

  return {
    name,
    version,
    month: month.downloads,
    total: all.downloads,
    published: registry.time[version].slice(0, 10),
    daily: range.downloads,
  };
}

const fmt = (n) => n.toLocaleString("en-US");

// ---------------------------------------------------------------- README table

function renderTable(rows, stamp) {
  return [
    "| Package | Latest | Installs · 30 days | Installs · all time | Last publish |",
    "| --- | --- | --: | --: | --- |",
    ...rows.map(
      (r) =>
        `| [\`${r.name}\`](https://www.npmjs.com/package/${r.name}) | \`${r.version}\` | ` +
        `${fmt(r.month)} | ${fmt(r.total)} | ${r.published} |`,
    ),
    "",
    `<sub>Live npm data — rewritten nightly by [\`readme-stats.yml\`](.github/workflows/readme-stats.yml). Last refresh ${stamp}.</sub>`,
  ].join("\n");
}

// ------------------------------------------------------------------- SVG card

/** Sums the packages day by day; the days line up because every range is the same span. */
function combineDaily(rows) {
  const totals = new Map();
  for (const row of rows) {
    for (const { day: d, downloads } of row.daily) {
      totals.set(d, (totals.get(d) ?? 0) + downloads);
    }
  }
  const series = [...totals.entries()].sort(([a], [b]) => a.localeCompare(b));
  // Drop the run of zeroes before the first publish — a flat line leading into
  // the data reads as a dead package rather than a young one.
  const first = series.findIndex(([, v]) => v > 0);
  return first === -1 ? series : series.slice(first);
}

/** Catmull-Rom through the points, converted to cubic béziers. */
function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const W = 720;
const H = 190;
const PAD = 28;

function renderCard(rows, series, theme, stamp) {
  const t = THEMES[theme];
  const mono = "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, Consolas, monospace";

  const month = rows.reduce((n, r) => n + r.month, 0);

  // Combined headline, then the per-package split. All-time lives in the README
  // table instead — on a young package it is the same number as the 30-day one,
  // and two tiles showing the same figure reads as a rendering bug.
  const tiles = [
    { value: fmt(month), label: "installs · 30 days" },
    ...rows.map((r) => ({ value: fmt(r.month), label: r.name })),
  ];

  // Sparkline geometry. A flat series would divide by zero, so floor the span.
  const top = 104;
  const bottom = H - 34;
  const values = series.map(([, v]) => v);
  const peak = Math.max(...values, 1);
  const step = series.length > 1 ? (W - PAD * 2) / (series.length - 1) : 0;
  const points = values.map((v, i) => [
    PAD + i * step,
    bottom - (v / peak) * (bottom - top),
  ]);

  const line = smoothPath(points);
  const area = `${line} L ${points.at(-1)[0].toFixed(1)} ${bottom} L ${points[0][0].toFixed(1)} ${bottom} Z`;
  const last = points.at(-1);

  const tileMarkup = tiles
    .map((tile, i) => {
      const x = PAD + i * ((W - PAD * 2) / tiles.length);
      return `
    <text x="${x}" y="72" font-family="${mono}" font-size="30" font-weight="600" fill="${t.ink}">${tile.value}</text>
    <text x="${x}" y="90" font-family="${mono}" font-size="11" letter-spacing="0.6" fill="${t.muted}">${tile.label}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${fmt(month)} npm installs in the last 30 days across ${rows.map((r) => r.name).join(" and ")}">
  <title>npm installs — ${fmt(month)} in the last 30 days</title>
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${t.accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${t.accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="none" stroke="${t.line}"/>

  <text x="${PAD}" y="34" font-family="${mono}" font-size="12" letter-spacing="2" fill="${t.accent}">OPEN SOURCE · LIVE FROM NPM</text>
  <text x="${W - PAD}" y="34" text-anchor="end" font-family="${mono}" font-size="11" fill="${t.muted}">${stamp}</text>
${tileMarkup}

  <path d="${area}" fill="url(#fade)"/>
  <path d="${line}" fill="none" stroke="${t.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="${t.accent}"/>

  <text x="${PAD}" y="${H - 14}" font-family="${mono}" font-size="10" fill="${t.muted}">${series[0][0]}</text>
  <text x="${W - PAD}" y="${H - 14}" text-anchor="end" font-family="${mono}" font-size="10" fill="${t.muted}">daily installs · peak ${fmt(peak)}</text>
</svg>
`;
}

// ------------------------------------------------------------------------ run

const rows = await Promise.all(PACKAGES.map(collect));
const series = combineDaily(rows);
const stamp = day();

await mkdir(new URL("assets/", ROOT), { recursive: true });
for (const theme of Object.keys(THEMES)) {
  await writeFile(new URL(`assets/installs-${theme}.svg`, ROOT), renderCard(rows, series, theme, stamp));
}
console.log(`cards rendered — ${series.length} days of data`);

const readme = await readFile(README, "utf8");
const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start === -1 || end === -1) {
  throw new Error(`README.md is missing the ${START} / ${END} markers`);
}

const next =
  readme.slice(0, start + START.length) + "\n\n" + renderTable(rows, stamp) + "\n\n" + readme.slice(end);

if (next === readme) {
  console.log("README table unchanged");
} else {
  await writeFile(README, next);
  console.log("README table updated");
}
