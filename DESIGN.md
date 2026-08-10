---
name: Daniel Laskewitz — Wayfinding
description: The site is the venue and every page is a sign.
colors:
  wf-ink: "#0a0a0a"
  wf-ink-raised: "#141414"
  wf-ink-rule: "#2a2a2a"
  wf-optic: "#ffffff"
  wf-optic-dim: "#a3a3a3"
  wf-hall-a: "#1f4bff"
  wf-hall-b: "#00c2a8"
  wf-hall-c: "#d6203a"
  wf-hall-d: "#c8ff00"
  wf-hall-e: "#ff6b00"
  wf-on-hall-a: "#ffffff"
  wf-on-hall-b: "#04231f"
  wf-on-hall-c: "#ffffff"
  wf-on-hall-d: "#101400"
  wf-on-hall-e: "#1a0a00"
typography:
  sign:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 118"
  read:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(0.95rem, 0.92rem + 0.15vw, 1.05rem)"
    lineHeight: 1.65
    letterSpacing: "0"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(0.78rem, 0.76rem + 0.1vw, 0.84rem)"
    fontWeight: 700
    letterSpacing: "0.1em"
    fontVariation: "'wdth' 112"
  venue:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(3.2rem, 0.5rem + 12vw, 11rem)"
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: "-0.035em"
rounded:
  square: "0"
spacing:
  hair: "0.25rem"
  xs: "0.5rem"
  s: "0.875rem"
  m: "1.5rem"
  l: "2.5rem"
  xl: "4rem"
  xxl: "6.5rem"
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  measure: "68ch"
  tap: "56px"
components:
  link-row:
    backgroundColor: "{colors.wf-ink}"
    textColor: "{colors.wf-optic}"
    typography: "{typography.sign}"
    rounded: "{rounded.square}"
    padding: "0.875rem 0"
    height: "56px"
  year-tile-a:
    backgroundColor: "{colors.wf-hall-a}"
    textColor: "{colors.wf-on-hall-a}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.32em 0.6em"
  resource-page-a:
    backgroundColor: "{colors.wf-hall-a}"
    textColor: "{colors.wf-on-hall-a}"
    typography: "{typography.sign}"
    rounded: "{rounded.square}"
    padding: "max(env(safe-area-inset-top), 1.5rem) clamp(1.25rem, 4vw, 4rem) max(env(safe-area-inset-bottom), 2.5rem)"
---

# Design System: Daniel Laskewitz — Wayfinding

## Overview

**Creative North Star: "Wayfinding"**

Wayfinding is built from one thesis: the site is the venue and every page is a sign. It owns the world of conference environmental graphics: matte vinyl colour fields, optic-white cut lettering, oversized directional arrows, hall-letter tiles, and full-bleed hanging-banner photography. The form seed is `8b56bdc1`, candidate 3, and the direction contract is shipped into every page head from `src/.vitepress/contract.ts`.

The site rejects the usual developer-advocate layout of portrait, bio line, feature cards, gradient hero and timeline. It also rejects an editorial broadsheet. The user is often holding a phone in a dark room after a session, so navigation is not decoration: rows, halls, doors and arrows are the interface. The one recorded staging idea, `converging-pair`, is used only on the session placard via `SpeakerCard`, where two speaker plates on one baseline become one billed session block.

**Key Characteristics:**
- Full-bleed near-black substrate with optic lettering: `--wf-ink`, `--wf-optic`, `--wf-ink-rule`.
- Hall colours are fields, not accent text: `--wf-hall-a` through `--wf-hall-e` carry `--wf-on-hall-*` ink.
- Every navigable thing tries to become a sign row with a terminal arrow.
- Reading content gets an explicit exception: prose keeps the venue but leaves the signage register.
- Motion is cut, hard and directional; signage does not bounce.

## Colors

The palette is a dark venue substrate plus five semantic hall fields. Dark is the home mode (`appearance: 'dark'`); light mode is an inverted vinyl substrate, not a separate identity.

### Primary
- **Venue Ink** (`--wf-ink`): the default room, page background and VitePress background (`--vp-c-bg`). Dark value is `#0a0a0a`; light mode inverts it to `#f7f7f5`.
- **Optic Cut Lettering** (`--wf-optic`): main sign text and banner lettering. Dark value is `#ffffff`; light mode inverts it to `#0a0a0a`.

### Secondary
- **Hall A Blue** (`--wf-hall-a`): `#1f4bff`, with `--wf-on-hall-a: #ffffff`. Used for Copilot Studio and the home banner hall tint.
- **Hall B Mint** (`--wf-hall-b`): `#00c2a8`, with `--wf-on-hall-b: #04231f`. Used for Copilot Cowork.
- **Hall C Red** (`--wf-hall-c`): `#d6203a`, with `--wf-on-hall-c: #ffffff`. Used for Declarative Agents.
- **Hall D Lime** (`--wf-hall-d`): `#c8ff00`, with `--wf-on-hall-d: #101400`. Used for selection, focus, tickets and high-signal strips.
- **Hall E Orange** (`--wf-hall-e`): `#ff6b00`, with `--wf-on-hall-e: #1a0a00`. Added when the programme outgrew four rooms.

### Neutral
- **Raised Ink** (`--wf-ink-raised`): hover and raised dark surfaces (`#141414`; light mode `#ffffff`).
- **Rule Ink** (`--wf-ink-rule`): dividers and structural rules (`#2a2a2a`; light mode `#d8d8d4`).
- **Dim Optic** (`--wf-optic-dim`): secondary labels on the substrate (`#a3a3a3`; light mode `#5c5c5c`).
- **Marker** (`--wf-marker`): the resting colour of any underline, tab or rule that marks a navigable thing. Aliases `--wf-ink-rule`.
- **Live Marker** (`--wf-marker-live`): the same marker under the pointer or with focus. Aliases `--wf-hall-a` (`#1F4BFF`).
- **Live Marker Ink** (`--wf-marker-live-ink`): the live colour where it has to be read *as a word* rather than drawn as a rule. `#4D74FF` in dark mode, `--wf-hall-a` in light mode.
- **VitePress bridge colors:** `--vp-c-text-1` maps to `--wf-optic`, `--vp-c-brand-3` maps to `--wf-hall-a`, and `--vp-c-brand-soft` is `rgba(31, 75, 255, 0.18)` in dark mode and `rgba(31, 75, 255, 0.12)` in light mode.

### Named Rules
**The Contrast Law Rule.** Hall colours are field colours carrying white or black text; never set small hall-coloured text on the substrate. The measured shipping pairs are Hall A `#1F4BFF` on white at 5.99:1, Hall B `#00C2A8` with `#04231F` at 7.34:1, Hall C `#D6203A` on white at 5.09:1, Hall D `#C8FF00` with `#101400` at 15.83:1, and Hall E `#FF6B00` with `#1A0A00` at 6.76:1.

**The Red Correction Rule.** The original red `#FF3D57` measured only 3.47:1 and was darkened to `#D6203A`. Do not restore the brighter red.

**The Marker Rule.** Every underline, tab and rule that marks a navigable thing waits in `--wf-marker` and lights `--wf-marker-live` on hover and focus. Standing still the marker is anatomy, not decoration; live, it is the way out. A row that genuinely belongs to a hall overrides the live colour with that hall's own. Markers sitting on a saturated hall field are the one exception and stay `currentColor`, because a grey rule on Hall A blue disappears. This rule governs the nav, the sign tabs, prose links, the `clear` controls and every board exit.

**The Marker Ink Rule.** `--wf-marker-live` is a *marker* colour, not an ink one. Hall A on the dark substrate measures 3.31:1, which passes the 3:1 floor for a 2px rule and fails the 4.5:1 floor for text. Wherever the live colour is a word rather than a rule — the nav's current and hovered items — it must use `--wf-marker-live-ink` (`#4D74FF`, 4.96:1). Light mode needs no lift: flat Hall A on paper measures 5.99:1.

**The No Fade On Fields Rule.** Opacity must never be used to dim text sitting on a hall field. `0.85` opacity dropped Hall C to 4.01:1 and Hall A to 4.74:1. Signage separates by scale and weight, never by fade.

## Typography

**Display Font:** Archivo (`--wf-font: 'Archivo', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif`)  
**Body Font:** Archivo with the same fallback stack  
**Label/Mono Font:** labels are Archivo; code keeps VitePress monospace (`ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace`)

Archivo is self-hosted as subset WOFF2 files (`/fonts/archivo-latin.woff2`, `/fonts/archivo-latin-ext.woff2`) with `font-display: swap`. The body enables tabular figures and stylistic set 1 (`font-feature-settings: 'tnum' 1, 'ss01' 1`) so dates, counts and hall codes line up.

### Hierarchy
- **Venue** (`--wf-step-venue: clamp(3.2rem, 0.5rem + 12vw, 11rem)`, 900, line-height around 0.85): huge record/display moments such as event counts.
- **Sign** (`.wf-sign`): `font-variation-settings: 'wdth' var(--wf-width-sign)`, `font-weight: 800`, uppercase, `letter-spacing: -0.01em`, `line-height: 0.92`. Components often raise it to 900 and tighten letter spacing for page titles.
- **Title scale:** `--wf-step-4: clamp(2.6rem, 1.2rem + 6.5vw, 6rem)`, `--wf-step-3: clamp(2rem, 1.4rem + 3vw, 3.4rem)`, `--wf-step-2: clamp(1.5rem, 1.25rem + 1.2vw, 2.1rem)`.
- **Body / Read** (`.wf-read`): `font-variation-settings: 'wdth' var(--wf-width-read)`, `max-width: var(--wf-measure)`, `font-size: var(--wf-step-0)`, `line-height: 1.65`, no uppercase and no added tracking.
- **Label** (`.wf-label`): `font-variation-settings: 'wdth' 112`, 700, uppercase, `letter-spacing: 0.1em`, `font-size: var(--wf-step--1)`, normally `--wf-optic-dim` unless it sits on a hall field.

### Named Rules
**The Reading Exception Rule.** Blog posts and talk abstracts drop out of the signage register into a real reading measure, currently `--wf-measure: 68ch` and about 623px rendered. They keep the substrate, hall colour and rules, but use sentence case. Caps-at-venue-scale governs wayfinding, not prose.

**The Specificity Trap Rule.** `.VPPage .vp-doc > div` suppresses the reading measure on full-bleed signage pages, while `.VPDoc .vp-doc > div` applies it to prose. Do not use a plain `.vp-doc > div` measure rule; it loses to the higher-specificity suppression.

## Layout

The layout model is full-bleed signage with a consistent gutter: `--wf-gutter: clamp(1.25rem, 4vw, 4rem)`. Vertical rhythm comes from `--wf-gap-hair: 0.25rem`, `--wf-gap-xs: 0.5rem`, `--wf-gap-s: 0.875rem`, `--wf-gap-m: 1.5rem`, `--wf-gap-l: 2.5rem`, `--wf-gap-xl: 4rem`, and `--wf-gap-xxl: 6.5rem`. Minimum touch signage is `--wf-tap: 56px`; QR resource links intentionally go larger at 64px.

VitePress is opened to full width (`--vp-layout-max-width: 100%`, `--vp-content-container-max-width: 100%`) so signage can run edge to edge. Prose is then put back on `--wf-measure` inside `.VPDoc .vp-doc > div`. Signage pages use `layout: page`; QR resource pages use `layout: false` so no nav, sidebar or footer slows the critical path.

**The Navbar Offset Rule.** Below 960px the VitePress navbar is in normal flow; at and above 960px it is fixed. Therefore `.VPContent` gets `padding-top: var(--vp-nav-height)` only inside `@media (min-width: 960px)`. Applying that padding at all widths double-offsets mobile; applying it nowhere crops signage under the navbar.

**The Door Rule.** `/r/` resource pages are full-viewport hall fields (`background: var(--hall); color: var(--on-hall)`) with safe-area padding and a max-width sheet of 44rem. They must stay minimal because Product Principle 1 is “The QR path is the critical path.”

## Elevation & Depth

Wayfinding is flat. There is no box-shadow vocabulary in the implementation. Depth is made from field changes, hard rules, full-bleed panels, border thickness, scale and the raised ink hover state (`--wf-ink-raised`). VitePress default card-like softness is suppressed; the room is matte vinyl, not glass.

### Named Rules
**The No Shadow Vocabulary Rule.** Do not introduce ambient cards, glows or soft elevation to solve hierarchy. Use a rule (`1px` or `3px`), a hall field, a larger sign register, or a directional arrow.

## Shapes

The form language is square, cut and infrastructural. Focus rings are hard cut edges (`outline: 3px solid var(--wf-hall-d); outline-offset: 2px; border-radius: 0`). Hall tiles are rectangular labels with `padding: 0.32em 0.6em`; sign rows use a `6px` tab; placards use an `8px` band. Resource doors and banners fill the viewport rather than sitting in rounded containers.

Rules are literal: `1px solid var(--wf-ink-rule)` for ordinary dividers, `2px solid currentColor` on QR door links, and `3px solid var(--hall)` where a billed block needs a stronger baseline.

## Components

### LinkRow
`LinkRow.vue` is the atom of the world: a full-width directional sign with a colour tab, a cut label, an optional note and a terminal arrow. Props are `href`, `label`, `note`, `hall`, `external`, and `size: 'default' | 'door'`. Internal links use `→`; external links use `↗`. Rows are never shorter than `--wf-tap` and the door variant raises the label to `--wf-step-2`. The field spans the full width, but the information does not: the label and note sit in a `minmax(0, var(--wf-measure))` track so the arrow terminates the sentence rather than the viewport. Every row shows its tab: `--wf-marker` when the row belongs to no hall, the hall colour when it does, and `--row-hall` on hover and focus, which resolves to `--wf-marker-live` for a hall-less row. A parent may override the `minmax(0, var(--wf-measure))` track with `1fr` when it lays rows into columns, so the arrow terminates the column instead of the measure.

### YearTile
`YearTile.vue` is the smallest venue identifier. It takes `hall`, `text`, and `variant: 'solid' | 'outline'`. Solid tiles use `background: var(--hall)` and `color: var(--on-hall)`. Outline tiles use a `1px` hall/rule border and optic text.

### BannerImage
`BannerImage.vue` is the only sanctioned photography component. It is full-bleed, uses `/images/stage/<src>-960/1600/2400.jpg`, and accepts `src`, required `alt`, `hall`, `height: 'strip' | 'half' | 'full'`, `focus`, `focusNarrow`, and `priority`. `focusNarrow` is the crop anchor below `48rem` and defaults to `focus`, so only a panorama needs to name it: a phone crops a wide frame to a fraction of its width, and the anchor that frames a subject on a desktop can push them onto the edge. The home banner is 2.7:1 and shows its full width on a desktop but only a third of it on a phone, so it anchors `62% 34%` wide and `72% 50%` narrow. Anchors are carried as custom properties on the banner rather than inline on the image, so the media query can win. The image, tint and scrim are absolutely positioned so the photo's intrinsic aspect ratio cannot dictate banner height. The hall tint uses `mix-blend-mode: color` and `opacity: 0.55`; the gradient scrim (`var(--wf-ink)` through `rgba(10,10,10,0.5)`) guarantees the contrast floor. Measured white-on-backdrop contrast over the home banner is 17.2:1 desktop and 16.4:1 mobile. Never use a circular portrait in a card.

### HomePage
`HomePage.vue` is the home entrance and takes no props: a hanging `BannerImage` leads, the board of booked dates follows, then the directory. The banner carries the name, a standfirst and the record line (`eventCount` / `countryCount` / `firstYear`), printed on the room rather than left for the visitor to count. The board renders the next three events in the same grammar `EventsPage` uses on `/events/` — a 9rem date column, the name and place, then Website and a Hall D Tickets button — so a visitor who learns to read it here can read it there; it carries no rules between rows, because three entries are aligned by the date column and separated by space, and only a hundred-row board earns ruling. It closes with an `All events` exit on the standard marker. The directory sits under an **Explore** heading and lays its four signs two-up above `768px`, one-up below, each row's arrow terminating its own column. No row carries a hall colour: the board directly above the signs already is events, so colouring the Events row pointed at something the visitor had just scrolled past. **The entrance deliberately does not hold one screen.** Holding the fold forces a choice of three from: an immersive photograph, the record, a real next-event block, and four signs — at 1440x900 the four rows alone take 300px of the 734px between nav and footer. The board is the argument the site exists to make, so it takes the room and the page scrolls.

### ResourcePage
`ResourcePage.vue` is the QR path at `/r/<slug>`. It is a saturated hall field with contrast-checked `--on-hall` text, 64px minimum resource links, `SpeakerCard` contact billing, and no VitePress chrome. Co-speakers come from `?with=<slug>,<slug>` after mount and fall back to the talk's default billing, so the same QR code serves multiple deliveries.

### VitePress Shell
The shell is the default VitePress theme extended, then suppressed. `src/.vitepress/config.ts` keeps the nav to `Events`, `Talks` and `Writing`, disables sidebar, outline and aside, sets `appearance: 'dark'`, and injects the `DIRECTION_CONTRACT` into `<head>`. The nav typography is uppercased Archivo (`font-variation-settings: 'wdth' 112`, 700, `letter-spacing: 0.08em`) and the navbar sits on `--wf-ink` with a `1px` `--wf-ink-rule` bottom border.

### SpeakerCard
`SpeakerCard.vue` is the one place the `converging-pair` staging is literal: two speakers on a shared `3px` hall-colour baseline. `withLinks` is only for resource pages; talk placards show billing without contact links.

### EventsPage, TalksPage, TalkPage, BlogPage, RedirectNotice
`EventsPage.vue` turns events into upcoming and past boards, with date-derived movement and year toggles. `TalksPage.vue` shows one room placard per talk. `TalkPage.vue` owns the detailed talk placard, the reading abstract, delivery lines and resource doors. `BlogPage.vue` pins blog posts as wall notes before opening into prose. `RedirectNotice.vue` is the moved sign for legacy session URLs.

## Do's and Don'ts

### Do:
- **Do** use `--hall` and `--on-hall` together whenever a hall field carries text.
- **Do** keep navigable objects as full-width rows or doors with arrows and at least `--wf-tap` height.
- **Do** use `BannerImage` for photography, with hall tint and scrim intact.
- **Do** preserve `@media (prefers-reduced-motion: reduce)` and keep motion to instant state changes or directional arrow slides.
- **Do** keep prose in `.wf-read` / `.VPDoc .vp-doc > div` at `--wf-measure` instead of stretching it across the venue.

### Don't:
- **Don't** use small hall-coloured text on `--wf-ink`; hall colours are fields, not link colours.
- **Don't** dim text on hall fields with opacity; the measured failures are known.
- **Don't** put photography on `/r/` resource pages, or make a resource page wait on decorative assets.
- **Don't** use circular portraits, soft cards, gradients or stock VitePress ornaments inside committed Wayfinding surfaces.
- **Don't** apply `padding-top: var(--vp-nav-height)` to `.VPContent` below 960px, and don't remove it above 960px.
