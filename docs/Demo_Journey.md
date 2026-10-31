# Prototype demo journey

## Scope

Home → search by listing name → View → save with the heart → Saved → reload → remove → reload.

This is a seeded Vancouver discovery prototype. It has no accounts, live inventory, verified prices or waits, ticket purchase, reservation, venue redemption or device sync. Saving does not update the recommendation engine. Existing case-study mockups remain concepts.

## What changed

- Registered `/api/listings/search` before `/api/listings/:id`. Trimmed search input and rejected empty or non-string queries. Detail IDs must be positive safe integers.
- Replaced Home's session state and Saved's hard-coded IDs with one shared shortlist. Detail's heart now saves/removes the same IDs. IDs are stored under `liv-saved-ids-v1` in local storage. First use starts empty.
- Added a visible session-only warning when saved data is corrupt or browser storage fails. There is no server-side favorites persistence or live synchronization between already-open tabs. Clearing site data clears saves.
- Added search retry, detail loading/not-found/error recovery, Saved loading/error recovery and notice of unavailable saved listings. Search results are no longer silently cut off at six.
- Added navigation from Detail to Saved. Moved the demo-code action into the page so it does not overlap the navigation dock.
- Removed the inactive Home profile control, fixed transit estimate, unsupported wait claim and claim that saves drive recommendations. Listing dates are labeled as samples. Missing prices no longer default to `$$` on this journey.
- Labeled the QR screen as a non-redeemable demo preview. Its QR graphic is an icon, not an encoded ticket. Disabled and labeled the direct profile route's unfinished settings.
- Updated README status and clone instructions. Added a browser regression test and generated captures. No database schema, authentication, scoring or transaction changes.

## Repeatable automated check

From `Liv/`, use Node 20+ for the browser test:

```bash
npm ci
npx playwright install chromium
npm run check
npm run test:demo
```

The test builds the real client, mounts the real Express API routes and supplies a controlled `IStorage` fixture. It does **not** connect to PostgreSQL or test SQL search semantics. The fixture is named **Demo Jazz**, uses ID 7 and a plain image, and has an intentionally old date. It must not be presented as a live listing or real product demand.

The test checks route dispatch and input validation; category filtering; initial empty Saved; search → Detail → save → Saved; persistence after reload and in a new tab; removal after reload; Home save reflected in Detail; the demo-code disclaimer; no search results; search failure and retry; detail not found; Saved API failure; corrupt storage and blocked writes; no client exceptions; and desktop horizontal overflow.

Screenshots are regenerated under `Liv/test-results/` (ignored by git). Reviewed captures from this run are committed below. Normal browser installation failed in this workspace because the download returned HTML. The passing run used Chromium 153 from a temporary `@sparticuz/chromium` installation with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/liv-chromium`. That temporary browser is not an application dependency.

## Verified in this change

- `npm run check`: passed.
- `npm run build`: passed (also run by `test:demo`).
- `npm run test:demo` with the Chromium executable override above: passed.
- Mobile 390 × 844 and desktop 1280 × 900 captures reviewed. Existing fixed navigation overlays some scrollable content in full-page captures; scrolling exposes it. No visual redesign was attempted.
- Mechanical interface detector: no findings on changed targets. This is not a full accessibility audit.

## Captured journey — controlled fixture

These are browser-test evidence, not portfolio mockups or a production capture.

[Home search](demo/01-search.png) → [Detail saved](demo/02-detail-saved.png) → [Saved after reload](demo/03-saved-after-reload.png).

[Desktop Saved with blocked-storage warning](demo/04-desktop-saved.png).

## Still unverified

- Real PostgreSQL connection, schema setup, seed operation, SQL search and recommendation queries: no database connection was configured here.
- The full journey with the repository's seeded venues and remote images; deployed hosting and production API configuration.
- Safari/iOS, geolocation and Nearby map behavior, keyboard/screen-reader coverage, private browsing and browser-specific storage limits.
- Behavior when multiple already-open tabs write their shortlists. Saves are browser-local, last write wins; this change does not claim multi-tab synchronization.

Before recording a portfolio demo, run the app with its database, seed once, then repeat the journey above. Show the prototype/sample labels and capture the reload and removal. This database-backed capture remains the next step before further polish.
