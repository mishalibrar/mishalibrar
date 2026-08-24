<h1 align="center">Mishal Ibrar</h1>

<p align="center">
  <b>Mobile &amp; Web Developer</b> — React Native apps, the Next.js platforms behind them,<br/>
  and the Node · MongoDB · Postgres services that keep both honest.
</p>

<p align="center">
  <a href="https://portfolio-mishal.vercel.app/"><img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-mishalibrar-2E2A24?style=flat-square&logo=vercel&logoColor=white"></a>
  <a href="https://www.linkedin.com/in/mishalibrar/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-mishalibrar-0A66C2?style=flat-square&logo=linkedin&logoColor=white"></a>
  <a href="https://www.npmjs.com/~mishalibrar"><img alt="npm" src="https://img.shields.io/npm/dm/rn16k?style=flat-square&logo=npm&logoColor=white&label=npm%20installs%2Fmo&color=CB3837"></a>
  <a href="mailto:mishalibrar12@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-mishalibrar12%40gmail.com-7B2434?style=flat-square&logo=gmail&logoColor=white"></a>
</p>

---

Full-stack product developer at **Hello World Technologies**, shipping since March 2024 across
fitness, healthcare, automotive and wellness. I build the whole round trip — the app people
install, the dashboard the team runs it from, the API and database underneath — because owning
both ends means fewer meetings about whose side the bug is on.

### What I'm doing right now

- 🏗️ Building multi-tenant healthcare and fitness platforms — Next.js + React Native from one codebase
- 📦 Maintaining [`rn16k`](https://www.npmjs.com/package/rn16k) and [`rn-arch-check`](https://www.npmjs.com/package/rn-arch-check), CLIs that catch Android 15 and New Architecture breakage before the store does
- 🎓 Teaching cross-platform mobile development at IT Centre Rahim Yar Khan
- 💬 Ask me about React Native's New Architecture, Android's 16 KB page size requirement, or EAS release plumbing

<br/>

## 📱 Shipped to the stores

<table>
<tr>
<td width="50%" valign="top">

### Bravo Life
**Self-development & habit-building app** · ⭐ 4.9 on the App Store

A short daily loop — curated actions, a belief card, a journal prompt, a streak to protect,
a community feed of wins. Firebase carries auth and analytics, Cloud Functions schedule
timezone-aware reminders, and CodePush ships fixes the day they land instead of after review.

`React Native` `TypeScript` `Firebase` `Cloud Functions` `IAP` `CodePush`

[App Store](https://apps.apple.com/us/app/the-bravo-life-delulu-sprint/id6749274123) · [Google Play](https://play.google.com/store/apps/details?id=com.thebravolifeapp)

</td>
<td width="50%" valign="top">

### LocumForce
**Healthcare locum staffing marketplace** · two-sided, one codebase

Locums find shifts, organisations fill them. Gemini ranks jobs and candidates, Socket.IO
carries the conversation, GPS check-in evidences attendance against the site, and Stripe
Connect pays each professional directly.

`React Native` `TypeScript` `Socket.IO` `Stripe Connect` `Gemini` `Maps` `OneSignal`

[App Store](https://apps.apple.com/de/app/locumforce/id6755456767?l=en-GB) · [Google Play](https://play.google.com/store/apps/details?id=com.locumforce)

</td>
</tr>
</table>

<br/>

## 📦 Open source

Both are zero-config, MIT, and built for the same reason: a React Native release requirement
that fails silently until Google Play rejects the upload.

| | What it does | Why it exists |
|---|---|---|
| [**rn16k**](https://github.com/mishalibrar/react-native-16kb-page-support-checker) <br/> <sub>[npm](https://www.npmjs.com/package/rn16k) · zero deps</sub> | Decides whether an Android build meets Android 15's **16 KB page size** requirement — ELF segment and APK ZIP alignment, no Android SDK needed. | It resolves the transitive Maven graph that `node_modules` never shows, then names the dependency that shipped the failing `.so`. |
| [**rn-arch-check**](https://github.com/mishalibrar/rn-arch-check) <br/> <sub>[npm](https://www.npmjs.com/package/rn-arch-check) · Expo + bare</sub> | Checks every dependency for **New Architecture** support (Fabric, TurboModules, JSI) against React Native Directory. | Sorts by what needs action, quotes npm deprecation notices the directory misses, and exits non-zero only on a confirmed break — so it can gate CI. |

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/installs-dark.svg">
    <img alt="npm installs across rn16k and rn-arch-check, with a 60-day daily sparkline" src="assets/installs-light.svg" width="720">
  </picture>
</p>

<details>
<summary>Per-package detail — versions, all-time installs, last publish</summary>

<!-- STATS:START -->

| Package | Latest | Installs · 30 days | Installs · all time | Last publish |
| --- | --- | --: | --: | --- |
| [`rn16k`](https://www.npmjs.com/package/rn16k) | `1.2.3` | 954 | 954 | 2026-08-10 |
| [`rn-arch-check`](https://www.npmjs.com/package/rn-arch-check) | `0.1.4` | 725 | 725 | 2026-08-10 |

<sub>Live npm data — rewritten nightly by [`readme-stats.yml`](.github/workflows/readme-stats.yml). Last refresh 2026-08-24.</sub>

<!-- STATS:END -->

</details>

```bash
npx rn16k            # 16 KB page size audit
npx rn-arch-check    # New Architecture compatibility report
```

<br/>

## 🛠️ Platforms I've built

| Platform | What it is | Stack | |
|---|---|---|---|
| **BrightSmile** | Multi-tenant dental clinic platform — online booking, interactive odontograms, treatment planning across **5 user portals** with automated white-labeling and full tenant data isolation. | Next.js · React Native · Supabase · PostgreSQL · Stripe | [Live ↗](https://dentist.helloworldtech.com/) |
| **ApexGym** | Fitness coaching platform — **7,000+ exercise assets**, workout programming, client progress tracking and referral onboarding, synced across a web dashboard and mobile apps. | Next.js · React Native · Expo · TypeScript · Firebase | [Live ↗](https://fitness.helloworldtech.com/) |
| **ShineCrew** | Car wash operating system — location-based **QR booking**, real-time cleaner dispatch, Stripe payments and before/after job verification. | Next.js · React Native CLI · Node · Express · MongoDB · Stripe | [Live ↗](https://carwash.helloworldtech.com/) |
| **Smart Wellness Platform** | Enterprise wellness pod ecosystem — **4 connected platforms** covering IoT provisioning, biometric session scheduling and offline-first kiosk sync at ~50 ms device latency. | React Native · Next.js · Electron · Node · Redis · Socket.IO | — |

<br/>

## ⚙️ Stack

**Mobile** &nbsp;
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
![Reanimated](https://img.shields.io/badge/Reanimated-001A72?style=flat-square&logo=react&logoColor=white)
![Skia](https://img.shields.io/badge/Skia-FF6B00?style=flat-square&logo=react&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=flat-square&logo=apple&logoColor=white)

**Web** &nbsp;
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

**Backend** &nbsp;
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=firebase&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)

**Ship** &nbsp;
![EAS](https://img.shields.io/badge/EAS_Build-000020?style=flat-square&logo=expo&logoColor=white)
![Fastlane](https://img.shields.io/badge/Fastlane-00F200?style=flat-square&logo=fastlane&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)

<br/>

## 💼 Experience

| Role | Where | When |
|---|---|---|
| **Full Stack Developer** | Hello World Technologies | Jun 2026 — Present |
| **Mobile App Instructor** | IT Centre Rahim Yar Khan | Mar 2025 — Present |
| **React Native Developer** | Hello World Technologies | Mar 2024 — Jun 2026 |
| **React Native Intern** | Hello World Technologies | Jan 2024 — Mar 2024 |

Promoted from mobile into full-stack product work: backend services, database schemas and
Next.js portals alongside ongoing React Native development. Teaching in parallel — course
material and mentoring from UI implementation through store deployment.

<br/>

## 📊 GitHub

<!-- CARDS:START -->
<!-- CARDS:END -->

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mishalibrar/mishalibrar/output/github-contribution-grid-snake-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mishalibrar/mishalibrar/output/github-contribution-grid-snake.svg">
  <img alt="Contribution graph snake animation" src="https://raw.githubusercontent.com/mishalibrar/mishalibrar/output/github-contribution-grid-snake.svg">
</picture>

<sub>This profile keeps itself current — see [`.github/workflows`](.github/workflows). The
install card and table are rendered nightly from live npm data, the snake is regenerated from
the contribution graph, the stats cards come from a self-hosted
[github-readme-stats](https://github.com/mishalibrar/github-readme-stats) instance that is
health-checked before it is embedded, and every link on this page is crawled weekly. Nothing
above is typed in by hand.</sub>

<br/>

## 📬 Open to work

Full-time, contract and freelance — React Native, Next.js, or full-stack product work end to end.
New builds, or existing codebases that need finishing.

**[mishalibrar12@gmail.com](mailto:mishalibrar12@gmail.com)** · **[Portfolio + CV ↗](https://portfolio-mishal.vercel.app/)** · **[LinkedIn ↗](https://www.linkedin.com/in/mishalibrar/)**
