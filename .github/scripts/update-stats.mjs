/**
 * Refreshes the live stats block in README.md.
 *
 * Pulls version and download data straight from the npm registry and rewrites
 * everything between the STATS markers. No dependencies and no secrets — the
 * whole point is that the block can never disagree with npm, and that it costs
 * nothing to keep running.
 *
 * If either API is unreachable the script throws before touching the file, so a
 * flaky upstream fails the job rather than landing an empty section.
 */

import { readFile, writeFile } from "node:fs/promises";

const PACKAGES = ["rn16k", "rn-arch-check"];

const README = new URL("../../README.md", import.meta.url);
const START = "<!-- STATS:START -->";
const END = "<!-- STATS:END -->";

async function json(url) {
  const res = await fetch(url, { headers: { "user-agent": "mishalibrar-profile" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

const today = new Date().toISOString().slice(0, 10);

async function collect(name) {
  const registry = await json(`https://registry.npmjs.org/${name}`);
  const version = registry["dist-tags"].latest;
  const first = Object.keys(registry.time)
    .filter((k) => k !== "created" && k !== "modified")
    .map((k) => registry.time[k])
    .sort()[0]
    .slice(0, 10);

  // npm caps a single range query at 18 months; these packages are newer, so
  // "since the first publish" is genuinely all time.
  const [month, all] = await Promise.all([
    json(`https://api.npmjs.org/downloads/point/last-month/${name}`),
    json(`https://api.npmjs.org/downloads/point/${first}:${today}/${name}`),
  ]);

  return {
    name,
    version,
    month: month.downloads,
    total: all.downloads,
    published: registry.time[version].slice(0, 10),
  };
}

const fmt = (n) => n.toLocaleString("en-US");

function render(rows) {
  return [
    "| Package | Latest | Installs · 30 days | Installs · all time | Last publish |",
    "| --- | --- | --: | --: | --- |",
    ...rows.map(
      (r) =>
        `| [\`${r.name}\`](https://www.npmjs.com/package/${r.name}) | \`${r.version}\` | ` +
        `${fmt(r.month)} | ${fmt(r.total)} | ${r.published} |`,
    ),
    "",
    `<sub>Live npm data — rewritten nightly by [\`readme-stats.yml\`](.github/workflows/readme-stats.yml). Last refresh ${today}.</sub>`,
  ].join("\n");
}

const rows = await Promise.all(PACKAGES.map(collect));
const readme = await readFile(README, "utf8");

const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start === -1 || end === -1) {
  throw new Error(`README.md is missing the ${START} / ${END} markers`);
}

const next = readme.slice(0, start + START.length) + "\n\n" + render(rows) + "\n\n" + readme.slice(end);

if (next === readme) {
  console.log("stats unchanged");
} else {
  await writeFile(README, next);
  console.log("README.md stats block updated");
}
