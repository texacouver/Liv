# Liv — product concept walkthrough

[Overview](../README.md) · [Case study](Liv_Canonical_PM_Case_Study.md) · [Prototype status](Prototype_Status.md)

These mobile mockups communicate the proposed product direction. They are not screenshots of shipped functionality, and they should not be presented as the exact stimuli used in the earlier five V2 tests. Event names, prices, travel times, waits, map positions, and availability are illustrative.

## 1. Tonight: make an option easy to assess

![Tonight concept feed beside jazz-event details, showing time, price, travel, and wait context](assets/liv-tonight-3000.jpg)

The feed pairs an appealing experience with time, price, and travel context. The detail screen expands the practical questions: getting there, tickets, wait, dress, and food.

**Research connection:** the case study reports that testers used logistics to decide whether an option was feasible. **Design hypothesis:** showing those details together could reduce cross-checking. **Next test:** compare time-to-choice and confidence against a basic listing card, using the same options.

## 2. Details: check whether the plan works

![Rooftop-session concept with separate distance, transit, ticket, wait, dress-code, and food rows](assets/liv-event-detail-3000.jpg)

The proposed hierarchy separates logistics into scannable rows before a ticket action. Dietary information addresses a friction point reported in the behavioural walkthroughs.

**Trade-off:** more information also creates more responsibility to keep it accurate. Wait and availability signals would need provenance, freshness, and an unknown state. “View tickets” is a proposed handoff, not evidence of a ticketing integration.

## 3. Nearby and Saved: retain viable alternatives

![Nearby concept map with example price markers beside a Saved shortlist of three outings](assets/liv-nearby-saved-3000.jpg)

The map explores nearby alternatives; the shortlist keeps candidate plans available for comparison. The research reports sharing in existing conversations, but these screens do not demonstrate a completed group-decision flow.

**Design hypothesis:** a small shortlist may help people compare and share feasible options. **Next test:** ask a pair to choose an outing and observe whether saving helps them converge or simply postpones the decision. The map is illustrative, not a navigation reference.

## How these relate to the web app

| | Mobile mockups | Current web prototype |
|---|---|---|
| Visual treatment | Dark surfaces, green action accents | Home uses translucent panels and purple accents; older styling remains elsewhere |
| Navigation | Tonight, Nearby, Saved | Home, Search, Saved, Map, Profile |
| Decision context | Proposed travel, wait, dietary, and availability information | Seeded listing data, distance calculation, and partial controls |
| Role in the portfolio | Communicate an intended experience | Show implementation exploration and its limits |

Both explore the revised product thesis. Neither establishes that the design improved usability. A future consistency pass should select one navigation vocabulary and accent system, then verify a complete mobile journey before expanding the visual treatment.

## Asset note

The three JPEGs above were opened and visually inspected for this presentation pass. The older `assets/liv-mvp-flow.png` does not decode as an image in the current checkout; it is retained for recovery but excluded from the presentation. Replace it from the original export before using it as evidence of a prototype flow.
