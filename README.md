# Liv

### From finding local experiences to confidently choosing one

A personal product-discovery project exploring how people decide what to do in Vancouver. Liv combines an AI-assisted web prototype, qualitative research, and mobile concept mockups.

**The central product decision:** shift from aggregating more listings toward helping people judge whether an outing fits their time, budget, location, and plans.

[Read the product case study](docs/Liv_Canonical_PM_Case_Study.md) · [Explore the visual concepts](docs/Product_Visuals.md) · [Inspect the prototype](Liv/README.md)

![Liv mobile concept: Tonight discovery and jazz-event details in two phone mockups](docs/assets/liv-tonight-3000.jpg)

*Concept presentation, not an app screenshot. Events, prices, travel times, and wait information are illustrative.*

## Project at a glance

| | |
|---|---|
| **My contribution** | Product concept and direction, AI-assisted prototyping, discovery research, synthesis, and V2 concept testing |
| **Process** | Initial idea → prototype → discovery → revised product strategy → V2 concept feedback |
| **Research reported in the case study** | 12 survey respondents, four behavioural walkthroughs, five V2 concept tests; these are separate activities, not a verified total of unique participants |
| **Outcome so far** | A narrower product thesis, revised priorities, and a proposed sequence of experiments |
| **Stage** | Personal prototype and formative research; no commercial launch or measured product impact |

## Three decisions that shaped the direction

| Research signal reported in the case study | Product decision | Trade-off |
|---|---|---|
| People cross-checked logistics across several sources | Bring time, price, travel, and practical context into the decision flow | Reliable information matters more than listing volume |
| V2 testers described sharing options before committing | Prioritize sharing into existing conversations | Defer a standalone social network |
| Wait times and availability influenced concept choices | Test a small, manually verified local offering first | Establish supply reliability before automating or expanding |

These findings informed the direction; they do not establish demand, retention, or willingness to pay. The [case study](docs/Liv_Canonical_PM_Case_Study.md) explains the evidence and limitations.

## What you can inspect

| Artifact | What it demonstrates | Boundary |
|---|---|---|
| [Product case study](docs/Liv_Canonical_PM_Case_Study.md) | Problem framing, synthesis, prioritization, and proposed measurement | Raw participant records are not included in this repository |
| [Mobile mockups](docs/Product_Visuals.md) | A proposed Tonight → details → Nearby/Saved experience | Illustrative concepts; not presented as the exact screens used in the earlier tests |
| [Web prototype source](Liv/) | React/TypeScript app, listing APIs, maps, preferences, and rule-based scoring | Partial implementation with seeded content and documented gaps |
| [Prototype status and next improvements](docs/Prototype_Status.md) | What exists, what remains incomplete, and review priorities | Source inspection, not end-to-end runtime certification |

## Visual direction

The web Home screen explores visionOS-inspired translucent panels, depth, rounded controls, and purple accents. The mobile mockups explore a related dark interface with green action accents and a simplified three-tab navigation. They are distinct explorations, not a single fully implemented design system or a native visionOS app.

The [visual walkthrough](docs/Product_Visuals.md) connects each mockup to a product question and explains what would need testing.

## What I would test next

**Can a small set of verified local options help someone choose a feasible outing?** Start with a concierge pilot in one Vancouver neighbourhood, then test decision value, personalization, group decisions, and repeat use in that order.

Proposed measures include time-to-choice, confidence, meaningful next steps, and information accuracy. No results from this pilot are being claimed. See the [experiment sequence](docs/Liv_Canonical_PM_Case_Study.md#11-next-experiments-reduce-uncertainty-in-sequence).

## Technical entry point

Application code and package scripts live in **`Liv/`**, not the repository root. See [setup and implementation notes](Liv/README.md) for the database requirement, commands, and current limitations.

The implementation uses React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Express, Drizzle ORM, Neon PostgreSQL, and Leaflet. Recommendation scoring uses explicit weighted rules; it is not a trained machine-learning model.
