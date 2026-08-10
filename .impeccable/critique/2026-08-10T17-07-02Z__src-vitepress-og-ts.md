---
target: the OG cards
total_score: 10
max_score: 16
na_heuristics: 1,3,5,7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-10T17-07-02Z
slug: src-vitepress-og-ts
---
Method: dual-agent (A: og-design-review · B: og-detector-evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | n/a | Static image; no state to report |
| 2 | Match System / Real World | 3 | Venue language ("Talk", "Speaking record") maps cleanly to the speaker-site model |
| 3 | User Control and Freedom | n/a | No interaction |
| 4 | Consistency and Standards | 3 | 49/49 cards follow one template; OG/Twitter meta complete; colours match tokens exactly |
| 5 | Error Prevention | n/a | No user input |
| 6 | Recognition Rather Than Recall | 2 | Card names a room but not what happens inside: no date, event, format, or co-speaker |
| 7 | Flexibility and Efficiency | n/a | Persuade surface, static image |
| 8 | Aesthetic and Minimalist Design | 2 | 54–58% of canvas is empty on 29 of 49 cards; minimalism is unearned, not restraint |
| 9 | Error Recovery | n/a | No interaction |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **10/16** | **Needs work** |

Six heuristics marked n/a; applicable maximum is 16, not 40.

## Design Specificity Verdict

**Moderate, and carried by a single element.** The sticker kicker and the five-hall system are genuinely authored. Strip those and what remains — white uppercase Archivo on flat black, wordmark bottom-left — is the same card every developer-advocate site generator emits.

The gap is that Wayfinding is a *rich* system: directional arrows, hall-letter tiles, sign rows with terminal arrows, YearTiles, converging-pair speaker plates, full-bleed banner photography. **None appear on the card.** The most-shared surface of the site speaks the least of its language.

**Deterministic scan:** `detect.mjs` on `src/.vitepress/og.ts` → exit 0, zero findings. On `src/.vitepress/dist/` → exit 2, 65 findings, all in bundled VitePress theme CSS (`design-system-color` 46, `design-system-radius` 12, `border-accent-on-rounded` 2, `design-system-font` 2, `gradient-text` 1, `overused-font` 1, `side-tab` 1). **None relate to the OG cards.** The detector cannot analyse PNGs or satori virtual DOM, so it has no purchase on this target; the evidence here is measured, not pattern-matched.

**Verified clean:** all 12 hardcoded colours in og.ts match `style.css` tokens exactly — zero drift. Filenames unique. `og:image:alt` present on all 49. The `same()` kicker-dedup guard works across the current set.

**Visual overlays:** none. Browser visualization skipped — the target is a static PNG set, not a viewable DOM surface. No live server was started.

## Overall Impression

These cards are competent, consistent and correct. Every contrast pair passes, nothing overflows, nothing renders as tofu. But they are *quiet* in a medium that punishes quiet, and they withhold the one thing this site exists to prove.

The single biggest opportunity: **the card carries no evidence.** This is a speaker site whose core argument is the speaking record — 127 events, ~25 countries, since 2019. The events card says "EVENTS" in 92px type and nothing else, on 58% empty canvas. The argument is absent from the surface that travels furthest.

## What's Working

1. **The sticker kicker is real design.** Hall field, measured on-hall ink, tilted, `align-self: flex-start` so it hugs its words. It obeys the Contrast Law (text on the field, never on the substrate) and its width-scaling tilt is a genuinely considered detail. It is the only element that could not have come from a template.

2. **The fixed black substrate is a defensible strategic call.** Multiple cards in one timeline read as a wall of signs rather than five competing swatches, and near-black is neutral against both LinkedIn's white chrome and X's dark mode.

3. **Measured discipline throughout.** Contrast: title 19.80:1; hall pairs 5.09–15.83:1; every field clears the 3:1 non-text floor against the substrate. File sizes 20–45KB (median 34KB) — fast unfurls. Colour tokens match the design system exactly. This is a rigorously built pipeline.

## Priority Issues

### [P1] The card withholds the evidence the site is built on
**Why it matters:** A CFP reviewer or organiser is the highest-value viewer. They see "EVENTS" and must click to learn anything. The record — event count, country count, first year — is already computed in `data/events.ts` (`eventCount()`, `countryCount()`, `firstYear()`) and already printed on the home banner. It is absent from every card.
**Fix:** Give index and talk cards a record line in the footer zone, in the `.wf-label` register: `127 EVENTS · 25 COUNTRIES · SINCE 2019` for events/home; delivery count and next venue for a talk card. Talk cards can carry date and event name from `deliveries`.
**Command:** `/impeccable bolder`

### [P1] 54–58% of the canvas is dead on 29 of 49 cards
**Why it matters:** Measured, not estimated: a single-line 92px title leaves 272px of the 502px content height as distributed gap; a single-line 72px title leaves 292px. The worst offenders are exactly the most-shared pages — `talks.png`, `events.png`, `blog.png`, `about.png`. `justify-content: space-between` spreads three small children across a large frame, so the emptiness grows as the title shortens.
**Fix:** Fill it with Wayfinding vocabulary rather than scaling type up: a large hall-letter tile, a terminal directional arrow, the record line, or a hard-cut hall panel. Short-title cards should be the *most* expressive, not the least.
**Command:** `/impeccable layout`

### [P2] The hall identity evaporates at the size people actually see
**Why it matters:** Both assessments converged here. The 8px band is 1.3% of card height — at a 400px-wide feed render it is 2.7px, at 200px it is 1.3px, effectively a hairline. The 26px kicker renders at 8.7px at 400px wide and 4.3px at 200px: illegible. So at thumbnail scale the card loses both its colour anchor and its only label, leaving undifferentiated white-on-black. The hall system is the identity, and it disappears precisely where the card does its work.
**Fix:** Raise the band to 16–24px or convert the bottom strip into a full-bleed hall panel carrying the wordmark in on-hall ink — closer to the site's full-bleed panel vocabulary and a second, substantial field. Raise the kicker to ~32–34px.
**Command:** `/impeccable bolder`

### [P2] None of Wayfinding's signature moves reach the card
**Why it matters:** Design specificity rests entirely on the sticker. The arrow in particular is the system's most recognisable object — `LinkRow` is described as "the atom of the world," a sign with a colour tab and a terminal arrow — and a card is literally a sign pointing at a page.
**Fix:** Introduce one signature object, not four. A hall-coloured terminal arrow, or a hall-letter tile, sized as venue graphics rather than as an icon.
**Command:** `/impeccable delight`

### [P3] Title sizing is measured in characters, and one tier is dead code
**Why it matters:** `titleSize()` offers three tiers but **0 of 49 cards use the 56px tier** (29 at 92px, 20 at 72px) — the longest card title is 60 characters. Character count is also a poor proxy for rendered width in a variable-width font, and an emoji costs 3 characters (surrogate pair plus space) toward a *smaller* tier while rendering as an image, so three emoji titles land at 40 chars and drop to 72px on a technicality.
**Fix:** Either delete the unreachable branch, or size on measured rendered width and let the emoji contribute its true box width.
**Command:** `/impeccable polish`

### [P3] Left-aligned content is fully lost under square crop
**Why it matters:** Content sits at x=[72,1128], all left-aligned. A centre-crop to 1:1 shows x=[285,915]: the wordmark (x=72–263) is entirely gone, the kicker is gone, and every title line loses its first ~213px. At 4:5 the loss is ~276px. Platforms that square-crop previews show a beheaded card.
**Fix:** Accept it as out of scope for 1.91:1, or pull the wordmark and kicker inside a centre-safe band.
**Command:** `/impeccable adapt`

## Persona Red Flags

**Conference attendee, LinkedIn on a phone (~335px card width):** kicker renders ~7px — unreadable. Band ~2px — invisible. Sees a dark rectangle with white text and no face, no date, no event. Nothing distinguishes it from any other tech-talk card in the scroll.

**CFP reviewer evaluating an invite:** opens `/events/` — the card for the site's core argument is the emptiest in the set. No counts, no countries, no evidence before the click. This is the highest-value viewer meeting the weakest card.

**Developer seeing a Slack unfurl (~400px, dark mode):** the `#0a0a0a` substrate has no visible edge against Slack's dark surface; the card melts into the channel. The 8px band is the only colour and is a hairline at that width.

## Minor Observations

- The tilt is imperceptible on most cards: `transformOrigin: '0 50%'` means lift scales with width, so "TALK" lifts ~3px and reads level. The motif only registers on the two longest kickers.
- The wordmark at 191×56 renders ~19px tall at a 400px card width; its "LASKEWITZ" sub-line is illegible there.
- **Corrected false positive:** Assessment A flagged emoji vertical misalignment as P2. Measured against cap-height, the emoji centre sits 1.1px below cap centre at 92px and 0.2px at 72px — optically centred. The real (milder) effect is that the emoji *box* at `size*0.82` overshoots cap height by ~5px because Twemoji artwork carries internal padding, so it reads slightly large rather than misplaced. No change needed.
- **Rejected recommendation:** Assessment A proposed switching the home card to Hall D lime "because it is most distinctive." DESIGN.md assigns Hall A to the home banner tint and to Copilot Studio; hall assignment is semantic, not decorative. Keep home on Hall A.
- A speaker portrait would help stop the scroll, but any implementation must be a hard-edged square crop — DESIGN.md bans circular portraits in cards outright.
- `same()` strips a trailing "s" to dedup kicker against title; it works across the current set but would collide on a future "Blog"/"Blogs" pair.

## Questions to Consider

1. The site's argument is 127 events across ~25 countries since 2019, and the card never says so. What if the card *were* the evidence — every talk card carrying its delivery count and next stage?
2. `LinkRow` is called the atom of this world, and its terminal arrow is the most recognisable object in the system. A card is a sign pointing at a page. Why is there no arrow?
3. Every card shares the black substrate for consistency. What if exactly one — the home card — flooded the frame with Hall A and carried the wordmark in on-hall white? One controlled exception in 49 becomes the signature card. Does that strengthen the wall of signs, or break it?
