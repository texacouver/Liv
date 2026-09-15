# Liv web prototype

[Portfolio overview](../README.md) · [Product case study](../docs/Liv_Canonical_PM_Case_Study.md) · [Implementation status](../docs/Prototype_Status.md)

This directory contains the AI-assisted React/Express prototype. Its Home screen has a visionOS-inspired visual treatment; other routes retain earlier styling. It uses seeded listings and partial interaction flows. The mobile product mockups are separate concept artifacts.

## Run locally

Use Node.js with npm and a development Neon PostgreSQL database. The backend uses the Neon serverless WebSocket driver; a generic local PostgreSQL URL alone is not a verified substitute.

```bash
git clone https://github.com/texacouver/liv-app.git
cd liv-app/Liv
npm ci
export DATABASE_URL='your_development_neon_connection_string'
npm run db:push
npm run dev
```

The server listens on port 5000. These are Bash/zsh commands. Export `DATABASE_URL` in each terminal that runs database commands: the current app does not automatically load a `.env` file.

With the server running, use a second terminal to populate a **disposable development database**:

```bash
curl --fail -X POST http://localhost:5000/api/seed
```

The seed handler deletes existing listings before inserting examples. Open `http://localhost:5000` afterward. Seed offers and venue details are sample content, not verified current inventory or partner promotions; the seed expiry dates are in 2025.

These instructions were checked against source and package scripts. Database-backed startup and complete user journeys have not been verified in this documentation pass.

## Package scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Express server with Vite development middleware |
| `npm run check` | TypeScript check |
| `npm run build` | Build the client and bundle the server |
| `npm start` | Start the built server; requires `DATABASE_URL` |
| `npm run db:push` | Apply the Drizzle schema to the configured database |

## Source map

| Location | Responsibility |
|---|---|
| [client/src/pages](client/src/pages/) | Home, details, map, favorites, profile, and Liv Pass screens |
| [client/src/index.css](client/src/index.css) | Shared styles and visionOS-inspired Home treatment |
| [server/routes.ts](server/routes.ts) | Listing, preferences, interaction, recommendation, and seed endpoints |
| [server/storage.ts](server/storage.ts) | Database access and weighted recommendation scoring |
| [server/seed.ts](server/seed.ts) | Static example listings |
| [shared/schema.ts](shared/schema.ts) | Tables, shared types, and validation schemas |

## Implementation boundaries

- Recommendations use fixed scoring factors for category, price, tags, interaction history, ratings, and recency. The generic Home rationale is not a computed explanation of these factors.
- User-specific routes fall back to `mock-user-1`; this is not completed authentication or user isolation.
- Favorites use local component state and mock IDs. Home and detail save controls do not persist a shortlist.
- Home's distance slider and live-context toggle change their own state without filtering listings or fetching operational data.
- `/api/listings/search` is declared after `/api/listings/:id`, so `search` is intercepted as an invalid ID. The storage search is substring matching, not fuzzy search.
- Liv Pass displays an icon and seeded text code; merchant redemption and QR scanning are not implemented.

See [the prioritized follow-up list](../docs/Prototype_Status.md) before presenting a live demo. This prototype is not ready for public multi-user deployment: authentication and protection of mutation endpoints, including seeding, remain unfinished.

## Dependencies and attribution

UI uses React, Tailwind CSS, shadcn/ui and Radix primitives; maps use Leaflet and OpenStreetMap. Seed image URLs point to Unsplash. Their presence does not establish that they depict the named venues. Real business names in fixtures do not imply affiliation or a verified offer.

`package.json` declares MIT, but no standalone license file is included in the current repository. Confirm the intended license before publishing reuse terms.
