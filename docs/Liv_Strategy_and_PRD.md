# Liv: strategy and PRD

**Written in October 2026, after the research and prototype.** It's a plan for what I'd build next and how I'd measure it. Nothing here is built unless the status column says so. Numbers marked *proposed target* are starting points to reset once a pilot gives real baselines.

Liv helps people in Vancouver go from "What should we do?" to "Let's do this." This doc covers the strategy, the product requirements (P0 to P2), the metrics, the roadmap and the competition. The research behind it is in the [case study](Liv_Canonical_PM_Case_Study.md).

**Contents:** [Where Liv stands](#where-liv-stands) · [Strategy](#product-strategy) · [PRD](#prd) · [Metrics](#metrics-plan) · [Roadmap](#roadmap) · [Competition](#competitive-scan)

---

## Where Liv stands

Liv is a working prototype and a small research project. It hasn't launched, and there's no revenue or proven demand.

| What exists | Evidence |
| --- | --- |
| Prototype (this repo) | Tonight feed with rule-based scoring, search and filters, Leaflet map, event detail. QR codes and saved list partly work. Listings are seeded sample data. |
| Discovery survey | 12 people (8 locals, 4 visitors), ages 19 to 34. 8 of 12 checked more than one source before deciding. |
| Behavioural walkthroughs | 4 people rebuilt a recent night out. Every one mixed social sources with a logistics check. |
| V2 concept tests | 5 locals, Friday 7 PM scenario. All 5 shared an option with someone before committing. |

The sample is small and formative. It shows patterns worth testing, not how common they are.

---

## Product strategy

Liv wins by helping a small group commit to a plan tonight, in one neighbourhood, using trusted local supply that the big platforms don't carry well. People can already find options. They struggle to feel sure enough to go.

### The problem

A night out starts with six questions, and each one sends people to a different app. P1 spent "twenty minutes juggling three different apps" to confirm basic logistics. P2 found an event on Instagram, then checked Do604, Instagram again, Google Maps, a group chat and Eventbrite before buying.

| Question | What people check today |
| --- | --- |
| Discovery: what's on? | Instagram, TikTok, event sites, Reddit |
| Trust: is it actually good? | Reddit threads, tagged photos, friends |
| Fit: is it my kind of thing? | Vibe, crowd, music, food |
| Feasibility: can I get there and afford it? | Time, distance, price, hours |
| Timing: can I still get in? | Wait, tickets left, how busy it is |
| Consensus: will my friends come? | Group chats, DMs, shared links |

The split is useful to people. Each source answers a different question well. So Liv only earns a place if it bundles enough of those answers that people stop opening the other tabs.

### Thesis

Liv moves people from "What should we do?" to "Let's do this." The unit of value is a decision made and shared, not a listing viewed.

### Who it's for first

- **Primary:** Vancouver locals, about 19 to 34, making a same-night plan with one friend or a small group, with nothing specific in mind. This is the V2 test scenario: Friday, 7 PM.
- **Secondary:** visitors who want the smaller, local options that tourist lists miss. Same needs, less local knowledge, so trust signals matter more.
- **Not yet:** families, planners booking weeks ahead, large events. Eventbrite, Ticketmaster and Fever serve those well.

### Positioning

For people in Vancouver who want to do something tonight, Liv shows a few options they can actually act on, with what it takes to go and why each was picked. Event sites list what exists. Liv helps you choose.

### Where to play

1. **One neighbourhood before one city.** A user who finds 8 good, verified options nearby trusts Liv. A user who finds 400 stale ones doesn't.
2. **Tonight before this weekend.** Same-night plans have the most friction and the most need for live signals like wait and tickets left.
3. **Small and independent before big.** Big events are easy to find. Small venues, pop-ups and local deals are where people feel "out of the know," and where Liv's original idea came from.

### The big bet: supply

The biggest risk is local supply, not demand. The smaller and more distinctive an event is, the less likely it shows up in any API. Liv's edge depends on getting that inventory and keeping it accurate.

The plan is to start by hand. A concierge pilot curates a small set of options in one neighbourhood and verifies the logistics. That tests the core value before paying for integrations. If it works, supply grows in this order: venue and organizer self-serve listings, then ticketing and event APIs for mainstream inventory, then trusted local contributors.

### Principles

- **Explain why.** Every recommendation says why it was picked ("Because you like indie music"). UT1 and UT3 trusted the pick more when it did.
- **Show what it takes to go.** Time, distance, price, food and availability sit on the card, not three taps away.
- **Fewer, better options.** Five you can act on beat fifty you have to check.
- **Every live signal shows its age.** A wait time without "updated 10 min ago" is a guess.
- **Share out, don't build a network.** People already plan in group chats. Liv makes a pick worth sending there.
- **Label paid placement.** Sponsored picks are always marked, and they never outrank fit.

### What Liv won't do, for now

- Build a social network, friends graph or chat.
- Expand city-wide or to other cities before one neighbourhood works.
- Replace rule-based scoring with machine learning before there's real behaviour data to learn from.
- Build its own checkout before deep links prove people want to buy through Liv.

### How Liv could make money (untested)

| Model | How it works | Risk |
| --- | --- | --- |
| Venue offers | Venues pay to run deals redeemed by QR at the door | Redemption must actually work; venues must see results |
| Ticket and booking referrals | A fee per ticket or reservation started from Liv | Low per-sale value until volume grows |
| Labelled promotion | Venues pay to appear, clearly marked | Erodes trust if it outranks fit |

None of these should come before Liv proves it helps people decide. Venue offers fit best, because they bring supply and revenue from the same partner.

---

## PRD

P0 helps a person pick and share a plan for tonight. P1 makes them trust it. P2 lets them book it. Each tier ships only when the one before passes its gate in the [roadmap](#roadmap).

### Goals

1. Cut the time from opening Liv to choosing an option, compared with people's usual mix of apps.
2. Make people confident enough in the choice to share it and go.
3. Keep listings accurate. A wrong wait time or a closed venue costs more trust than a missing listing.

### Key scenarios

| Scenario | Who | What done looks like |
| --- | --- | --- |
| Friday, 7 PM, nothing planned | Two friends, locals | They pick one option and send it to each other in under 5 minutes (*proposed target*) |
| Already out, want a next stop | Visitor after a seawall ride (like P1) | They find somewhere open, close, with food, and walk there |
| Group can't agree | A local planning for 4 friends (like P2) | They share 2 or 3 options and the group settles on one |
| Dressed and ready, one place is packed | Student on a night out (like P4) | They see the wait and a nearby backup before leaving home |

### P0: Decide

| ID | Requirement | Prototype today |
| --- | --- | --- |
| P0.1 | **Tonight feed.** 5 to 10 options open or starting in the next 6 hours in the pilot area, ranked by fit. | Working, with seeded data |
| P0.2 | **Explained pick.** Each card gives one plain reason it was picked, from the scoring factors (taste, price, distance, timing). | Not built. Scoring exists; no reason shown |
| P0.3 | **Decision card.** Start time, travel time, price, food and dietary notes, atmosphere tags. Missing fields say "unknown," never a guess. | Partly. Detail screen has price, place, time |
| P0.4 | **Quick setup.** Pick up to 3 interests and a price range in under 30 seconds. Skippable. | Concept. Preferences API exists, not wired up |
| P0.5 | **Share a pick.** One tap shares a link into any messaging app. The link opens a web page that works without the app. | Not built |
| P0.6 | **Saved list.** Save and remove options. The list persists between sessions. | Partly. Not stored between sessions |
| P0.7 | **Map view.** Same options on a map, with price on each pin and the user's location. | Working |
| P0.8 | **Search and filters.** Category, price and start time. | Working |
| P0.9 | **Event tracking.** The client sends views, opens, saves, shares and direction taps to the server. | Partly. Server records; client doesn't send |
| P0.10 | **Curated supply.** An admin tool to add, edit and verify listings by hand, with a "last verified" time on each. | Not built. Seed script only |

### P1: Trust

| ID | Requirement |
| --- | --- |
| P1.1 | **Live signals.** Wait time and tickets left, each with its source and age ("Venue, 12 min ago"). Hidden once older than 60 minutes. |
| P1.2 | **Recent proof.** Recent photos, menu or a performer preview on the detail screen, each with its date. |
| P1.3 | **Verified badge.** Marks listings a venue or the Liv team confirmed in the last 7 days. |
| P1.4 | **Nearby backups.** If an option is full or has a long wait, show 2 or 3 similar options within a 10-minute walk. |
| P1.5 | **Group shortlist.** Share up to 3 options as one link. Friends tap the one they want, no account needed. |
| P1.6 | **Venue self-serve.** Venues and organizers add and update their own listings and live signals. Liv reviews new venues before they go live. |
| P1.7 | **Feedback after going.** The next day: "Did you go? Was it right for you?" One tap. Feeds the guardrails. |

### P2: Act

| ID | Requirement |
| --- | --- |
| P2.1 | **Ticket and booking links.** Deep links to the right ticket or reservation page, with the referral tracked. |
| P2.2 | **Redeemable offers.** QR codes the venue can scan and mark as used, with a simple venue-side screen. Today the QR shows but nothing validates it. |
| P2.3 | **In-app checkout.** Build only if P2.1 data shows real drop-off at the handoff. |
| P2.4 | **Venue dashboard.** Views, saves, shares and redemptions per listing, so venues see what Liv sends them. |

### Non-functional requirements

- **Freshness:** every listing and signal stores its source and last-verified time, and the UI shows it.
- **Privacy:** location is used only while the app is open, and only with consent. No location history is stored. Preferences and tracking can be deleted from the profile screen.
- **Speed:** the Tonight feed loads in under 2 seconds on a mid-range phone on 4G.
- **Access:** meets WCAG 2.2 AA. Every map result is also in the list view.
- **Honesty:** sponsored listings are labelled and never ranked above a better fit.

### Non-goals

- Friends, followers, chat or a social feed.
- Coverage outside the pilot area during P0.
- Machine-learned ranking before P1 ends.
- Native iOS and Android apps. The installable web app is enough until retention is proven.

### Open questions

- Which neighbourhood for the pilot? Gastown, Mount Pleasant and Main Street are candidates. Pick the one with the most small venues open late.
- How many verified options does a night need to feel full? My guess is 20 to 30.
- Can one person keep 30 listings verified daily, and what does each one cost?
- Should a shared link carry the reason it was picked, or is that private to the sender?
- Where do live wait times come from at first: venue staff, Liv staff calling, or users?
- Is login needed in P0, or can saved lists live on the device?

---

## Metrics plan

The north star is the share of sessions that end in a real next step: a save, share, directions tap or ticket start. Downloads and time in app are left out on purpose. Liv's job is to get people out the door fast, so more time in the app can mean it's failing.

### North star: qualified discovery-to-action rate

The percentage of qualified sessions where the user takes at least one action step on an option.

- **Qualified session:** the user opens the Tonight feed or map, inside the pilot area, and views at least one card. Sessions under 5 seconds don't count.
- **Action step:** save, share, directions tap, or ticket or booking start.
- **Stronger signal, later:** confirmed attendance, from a QR redemption or the next-day prompt (P1.7).

There's no baseline yet. The pilot sets one, and targets come after that.

### Supporting measures

| Measure | Definition | Why it matters |
| --- | --- | --- |
| Time to choice | Seconds from session start to first action step | Tests the core claim: Liv is faster than juggling apps |
| Card open rate | Card opens ÷ cards shown | Are the picks interesting at all? |
| Share rate | Sessions with a share ÷ qualified sessions | Sharing showed up in all 5 V2 tests |
| Shared-link open rate | Opens of a shared link ÷ links shared | Did the friend engage, or ignore it? |
| Self-reported confidence | 1 to 5 answer to "How sure are you about this pick?" | Confidence is the thing Liv sells |
| 14-day return | Users with a second qualified session within 14 days | Repeat value, the last risk in the sequence |

### Guardrails

If one of these gets worse, stop and fix it, even if the north star goes up. The alert levels are *proposed targets*.

| Guardrail | Measure | Alert at |
| --- | --- | --- |
| Stale data | Reports of wrong info ÷ action steps | Above 2% |
| Bad fit | "Not right for me" answers on the next-day prompt | Above 20% |
| Ad creep | Share of top-3 slots held by sponsored listings | Above 1 in 3 |
| Big-venue drift | Share of shown options from venues with more than one location | Rising 3 weeks in a row |
| Privacy | Location or data complaints, and deletion requests | Any complaint gets a review |

### Instrumentation

- Events: `session_start`, `card_view`, `card_open`, `save`, `share`, `shared_link_open`, `directions_tap`, `ticket_start`, `qr_redeem`, `feedback_answer`.
- Each event carries session id, listing id, card position and a timestamp. Never a precise location.
- The server already records interactions ([`Liv/server`](../Liv/server)). P0.9 wires up the client to send them.

---

## Roadmap

The roadmap follows the five risks in order, cheapest test first. It has no dates on purpose: each phase ends when it passes its gate. Gate numbers are *proposed targets*.

1. **Concierge pilot, one neighbourhood.** Tests supply reliability and decision value. Ships hand-curated listings, decision cards with reasons, the share link and tracking.
    - **Gate A:** 20+ verified options a night for 4 weeks, and testers choose faster than with their usual apps.
2. **Decide (P0).** Tests personalization. Ships quick setup, the ranked Tonight feed, a saved list that persists, map and filters.
    - **Gate B:** users can say why a pick was shown, and the north-star baseline is set and holding.
3. **Trust (P1).** Tests group decisions. Ships live signals with their age, the verified badge, backups and the group shortlist.
    - **Gate C:** group shortlists settle plans more often than single shares, and stale reports stay under 2%.
4. **Act (P2).** Tests repeat value, and whether venues will pay. Ships ticket and booking links, redeemable QR offers and the venue dashboard.

If a gate fails, the phase repeats with a change, or Liv stops. Stopping is a fair result if the pilot shows supply can't be kept accurate.

---

## Competitive scan

No one product answers all six questions for small, same-night plans in Vancouver. Each competitor owns one or two. The real threat is Google Maps, if Ask Maps reaches Canada and gets good at "tonight" questions.

| Product | What it does well | Questions it answers | Gap Liv can use |
| --- | --- | --- | --- |
| [Google Maps, Ask Maps](https://www.droid-life.com/2026/03/12/google-gets-new-ai-powered-ask-maps-feature/) | Gemini answers open questions about places, using listings and reviews. Rolled out in the US and India from March 2026. | Discovery, feasibility, some trust | Places, not events. Not yet in Canada. No live wait or tickets for small venues. |
| Instagram, incl. [Instagram Map](https://techcrunch.com/2025/08/06/instagram-takes-on-snapchat-with-new-instagram-map) | Where people find small, local things first. The map shows places friends and creators posted about. | Discovery, trust, fit | No price, time or logistics. Posts expire. You still leave to check. |
| [Eventbrite](https://www.eventbrite.com/d/canada--vancouver/events--tonight/) | Big ticketed inventory with date, price and category filters. | Discovery, some feasibility | Cards show no distance. The "tonight" page mixes in later dates. Thin on bars and venues. |
| [Fever](https://feverup.com/en/vancouver) | Polished ticketed experiences, including its own (Candlelight), plus a "Pick your vibe" filter. | Discovery, fit | Leans to planned, bookable, tourist-friendly picks. Not built for a spontaneous night. |
| [DICE](https://musicbusinessworldwide.com/after-raising-65m-dice-expands-into-canada) | Music ticketing with recommendations from your listening. Launched in Canada (Toronto) in October 2023. | Discovery, fit, timing (waitlist) | Music only. |
| [Partiful](https://partiful.com/) | Event pages and RSVPs with no app needed. | Consensus | For hosting your own event, not choosing a public one. A model for Liv's shared link. |
| [Do604](https://do604.com/) | Vancouver event listings. P2 used it in their walkthrough. | Discovery | A listing site. Logistics and trust checks still happen elsewhere. |
| Reddit (r/vancouver) | Candid local opinion. P1 and P3 started there. | Trust | Slow, scattered, no structure. |

### What this means for Liv

- **Own the decision card.** Nobody puts time, distance, price, food and live availability on one card for small venues. That's P0.3 and P1.1.
- **Borrow Partiful's link.** A shared pick that opens without an app fits how people already decide in group chats.
- **Move before Ask Maps does.** Google's lead is data scale. Liv's lead has to be verified, live, local supply in one area, which is slow for Google to copy venue by venue.
- **Partner on tickets.** Eventbrite, Fever and DICE can be P2 deep-link partners.
