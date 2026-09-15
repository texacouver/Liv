# Liv — prototype status and next improvements

[Overview](../README.md) · [Case study](Liv_Canonical_PM_Case_Study.md) · [Setup](../Liv/README.md)

Reviewed against source at `9afe21e` on 15 September 2026. This is a source and asset review, not a completed runtime, accessibility, or production-readiness audit.

## What exists today

| Area | Evidence | Current boundary |
|---|---|---|
| Listings and categories | [Home](../Liv/client/src/pages/Home.tsx), [routes](../Liv/server/routes.ts) | Seeded examples, not a live inventory feed |
| Recommendations | [storage](../Liv/server/storage.ts) | Weighted rules; no trained model or measured relevance gain |
| Maps and location | [Map](../Liv/client/src/pages/Map.tsx), [geolocation hook](../Liv/client/src/hooks/useGeolocation.ts) | Mapping code exists; no verified travel-time or wait-time service |
| Saved items | [Favorites](../Liv/client/src/pages/Favorites.tsx), [Detail](../Liv/client/src/pages/Detail.tsx), Home | Mock IDs and component state; save buttons do not implement persistence |
| Live-context and radius controls | Home | Visual state only; neither changes the underlying results |
| Search | Routes and storage | Route-ordering defect; underlying query is name substring matching |
| Liv Pass | [QRCode](../Liv/client/src/pages/QRCode.tsx) | Icon and text code, not a generated scannable code or merchant integration |
| Identity | Routes | Mock-user fallback; authentication is unfinished |
| Visual assets | [Concept walkthrough](Product_Visuals.md) | Three usable JPEGs; older MVP PNG fails decoding |
| Research | [Case study](Liv_Canonical_PM_Case_Study.md) | Reported sample and synthesis; raw records absent from this checkout |

## Highest-impact remaining work

| Priority | Improvement | Why it matters | Done when |
|---|---|---|---|
| 1 | Establish a truthful, complete demo journey | A reviewer should be able to follow the product story without dead controls | Search routing is fixed; Home → details → save → Saved works; saved items persist; incomplete controls are labelled or removed; sample-data status is visible |
| 2 | Add a concise, anonymized evidence appendix from original records | Makes the reasoning independently inspectable | Each key finding links to an actual excerpt or observation; recruitment, methods, and participant overlap are described; no records are reconstructed from memory |
| 3 | Capture the actual prototype at mobile and desktop sizes | Bridges the gap between mockups and implementation | Screenshots or a short recording show the tested journey; captures are labelled by version; the broken MVP export is recovered |
| 4 | Make the UI consistent across that journey | Home and older routes currently communicate different design stages | Navigation names, accent color, spacing, and controls align; keyboard use, contrast, focus, and narrow screens are checked |
| 5 | Run the narrow supply-and-decision pilot | Produces new evidence beyond presentation polish | A small verified offering is tested against an explicit comparison; accuracy, choice, confidence, and next steps are recorded with limitations |

The first four improve reviewability; the fifth tests product value. More decorative mockups would add less evidence than completing a demonstrable journey and documenting the research behind it.

## Specific demo risks to resolve

- Move the static search route before the parameterized listing route and check both valid IDs and search queries.
- Use one shared saved-items implementation rather than independent mock state.
- Home currently presents `validUntil` as a time and a hard-coded Friday-evening heading. Model start time separately or label the field accurately; do not imply that an expiry date is an event start.
- The rationale “Because this fits your interests” is static. Replace it with a supported explanation or label it as illustrative.
- Seed data includes 2025 expiries and sample promotional claims. Use clearly labelled fixtures for demos; changing dates alone would not make the offers real.
- Protect mutation routes and implement identity before public multi-user hosting. The seed endpoint deletes listings and is currently unprotected.

## Presentation changes in this pass

The root README now leads with the problem, contribution, decisions, and project stage. The technical README replaces conflicting capability claims and corrects the clone path, working directory, environment setup, and seed order. Visual captions distinguish concepts from implementation. The case study preserves the reported findings while clarifying source availability and current prototype limits.

No user counts, performance improvements, revenue, partnerships, test results, or implemented features have been added as accomplishments.
