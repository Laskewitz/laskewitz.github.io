---
target: the homepage
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-10T10-32-02Z
slug: c-vitepress-theme-components-entrancedirectory-vue
---
Method: dual-agent (A: design-review · B: detector-evidence)

Surface mode: **Persuade**. Target: `src/.vitepress/theme/components/EntranceDirectory.vue` (route `/`), inspected live at 1440x900 and 390x844.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | NEXT UP strip is excellent live status; no active-state marker on the nav. |
| 2 | Match System / Real World | 4 | Venue signage metaphor is literal and coherent: halls, doors, arrows, departure board. |
| 3 | User Control and Freedom | 3 | NEXT UP and the EVENTS row resolve to the same URL. |
| 4 | Consistency and Standards | 4 | One typeface, one arrow grammar (-> internal, diagonal external), rigorous hall system. |
| 5 | Error Prevention | 3 | Low-risk surface, large targets. Whole NEXT strip is one link. |
| 6 | Recognition Rather Than Recall | 3 | Labels are bare; hall colours look semantic but teach nothing on this page. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface; no power-user affordances expected. |
| 8 | Aesthetic and Minimalist Design | 3 | Restraint has tipped into under-fill on desktop; four rows strand empty black. |
| 9 | Error Recovery | 3 | Nothing to recover from; graceful. |
| 10 | Help and Documentation | n/a | Persuade homepage; no docs expected. |
| **Total** | | **26/32** | **Solid, disciplined, not yet excellent** |

## Design Specificity Verdict

**LLM assessment:** Partly authored, partly generic, and the generic part is the bottom two-thirds. The top half is unmistakably this product: the DevWorld stage photograph under a Hall-A tint, the name cut in 70px caps, and the saturated NEXT UP strip carrying a real upcoming event. No other product ships that strip unchanged. But EVENTS / TALKS / BLOG / ABOUT is a generic four-item nav in Wayfinding clothing. It carries zero information scent, and `SignRow`'s own `note` prop, used four times on the About page, is unused on every home row.

**Deterministic scan:** CLI detector clean. 0 findings across EntranceDirectory.vue, SignRow.vue, BannerImage.vue. Browser injection returned 6 findings, 4 of them false positives from injection self-contamination (the 364 KB detector bundle's own source contains the keywords `marquee`, `background-clip`, `theater`; injecting it as a DOM node makes the page-level scan match the detector's own vocabulary). `dark-glow #45629b` is VitePress DocSearch dead CSS; search is disabled. `single-font` is committed design per DESIGN.md. `clipped-overflow-container` is the VitePress nav container.

Measured and clean: every text element passes WCAG AA (lowest ratio 5.99, white on hall blue). No horizontal overflow at 390. No box-shadows. No heading skips. LCP 360ms desktop / 144ms mobile. Banner 38 KB, eager, fetchpriority high. 237 DOM nodes. No line over 80 characters.

## Overall Impression

The world is right and the engineering is clean. The appeal is being lost in exactly two places: the desktop directory strands its content in empty black, and the page hides the speaker's single biggest asset, his record. The homepage shows one upcoming event and zero cumulative proof, on a site whose own product principle is "the record is the argument."

## What's Working

1. **The NEXT UP strip is the best decision on the page.** A saturated Hall-A field carrying live data (name, date, flag, city) is both the loudest brand note and the most useful fact. It sections the page with colour where a lesser system would use a shadow, and it proves he is actively doing the thing.
2. **Ruthless one-screen discipline.** The whole entrance lands in 900px desktop / 845px mobile with the footer visible. Every destination is thumb-reachable without scrolling, which is exactly right for the phone-in-a-hallway primary user.
3. **Mobile banner integration.** At 390px the scrim geometry lets the photo read through the two-line name, so "name cut across a real room" actually happens, without breaking the contrast floor.

## Priority Issues

**[P1] The desktop sign rows are a void, and the directory carries no information scent.**
Why it matters: at 1440px each row is one short word at x=90 and an arrow at x=1340, with ~1200px of dead black between, four times over. The organiser persona is the one who actually lands on the homepage on desktop, and this is what they see: four generic words that any consultant could ship.
Fix: populate the existing `note` prop with live authored data per row. EVENTS -> the count and country tally. TALKS -> the topics plus talk count. BLOG -> the latest post title. ABOUT -> one plain line in his own voice. Existing prop, committed content, no new components.
Suggested command: `/impeccable layout`

**[P1] The record, the actual argument, is nowhere on the homepage.**
Why it matters: PRODUCT.md is explicit that the record is the argument, and lists ~90 events across ~25 countries since 2022. The homepage shows one event and no cumulative proof. An organiser's core question is "is he seasoned?" and the most persuasive answer available is missing from a Persuade surface.
Fix: fold a venue-scale count into the entrance, either as the EVENTS row note or a thin record line between the standfirst and the NEXT strip. Do not invent testimonials or attendance figures; PRODUCT.md forbids it and the event/country counts are real and already computed.
Suggested command: `/impeccable bolder`

**[P2] The desktop banner wastes the photograph.**
Why it matters: at 1440px the banner is a 359px band and the scrim plus tint render the left 60% near-black, so the name sits on flat black and the subject is squeezed into a 359px band on the right. The desktop first impression is portrait-beside-text, not the immersive frame mobile achieves. The photo is the emotional hook and half of it is thrown away.
Fix: on >=960px let the home banner stand taller (the `min-height: min(52vh, 17rem)` cap in EntranceDirectory is what flattens it) and re-anchor `focus` so the subject sits in the right third while the name crosses the lit area. A crop and height change, not a scrim change; the contrast floor stays intact.
Suggested command: `/impeccable layout`

**[P2] NEXT UP and EVENTS resolve to the same URL.**
Why it matters: two adjacent controls, one destination. The strip implies it goes to that specific event. It dilutes the strip's specificity and creates a needless micro-decision on the one control with the most pull.
Fix: point the NEXT strip at that event's own page or ticket link, and keep the EVENTS row as "see the whole record."
Suggested command: `/impeccable clarify`

**[P3] Hall colours read as meaningful but teach nothing here.**
Why it matters: blue/mint/red/orange tabs look like a code the visitor should crack. It is a small interpretive tax on a first-timer.
Fix: make the colour do work. Blue on the EVENTS row already matches the blue NEXT strip; leaning into that ties "next event" and "all events" into one visible system instead of an arbitrary rainbow.
Suggested command: `/impeccable colorize`

## Persona Red Flags

**Event organiser / CFP reviewer (desktop, the persona who actually lands here):** The four sign rows fail them. `.sign-row .label` is bare and `.note` is unused, so they learn nothing without clicking. The absent record fails them hardest: no "90 events / 25 countries" anywhere, so their central question is unanswered above the fold. The NEXT UP strip half-rescues them, but a sample of one is not a record.

**First-time visitor arriving from a conference slide (phone):** Best served of the three. Name, face, topics, next event and four doors on one screen. Fails on destination ambiguity: the bright NEXT strip and the EVENTS row both go to `/events/`, and a fast one-handed tap cannot tell which is "the thing I just saw."

**Returning peer / community reader:** The BLOG row gives no signal that anything is new. No latest title, no date. They cannot tell from the homepage whether there is fresh writing, so the row has no pull.

## Minor Observations

- The standfirst and the NEXT event name are the same size (both `--wf-step-1`, 22.4px). The time-sensitive fact should outrank a static bio line.
- 1px of vertical overflow at 390px (scrollHeight 845 vs viewport 844) makes the one-screen entrance technically scrollable on mobile.
- No active-state treatment on the nav's HOME item; a cheap orientation win consistent with the signage metaphor.
- The standfirst wraps to three lines on desktop and leaves a one-word orphan.
- The 18px flag in the NEXT strip reads as a smudge at desktop distance.
- The directory arrows pin to the far viewport edge on desktop, far from the label they belong to.

## Questions to Consider

1. If an organiser only ever saw this one screen and never clicked, would they invite him? Would "90 EVENTS / 25 COUNTRIES / SINCE 2022" at venue scale change that answer in a second?
2. What if the four rows were not labels but live headlines, so the sign is the pitch and not just the door?
3. The NEXT UP strip is the best thing here. What if the entrance led with the next two or three events and the evergreen doors sat beneath, leading with time-sensitive proof instead of a static portrait?
4. What if blue were reserved to link "next event" and "all events" as one system, and the other doors went monochrome, so colour finally meant something?
