# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** a conference attendee who just watched Daniel speak, standing in a session
room or hallway, phone in hand, scanning a QR code from the last slide. They want the
links, the slides, and a way to contact the speakers — in seconds, on cellular, one-handed,
often while the room is emptying around them.

**Secondary:** event organisers, user-group leads, and CFP reviewers evaluating whether to
invite Daniel and which talk to ask for. They arrive on desktop, want to know what he
speaks about, where he has spoken, and how to reach him.

**Tertiary:** peers in the Power Platform / Microsoft 365 community reading blog posts and
following project work.

## Product Purpose

laskewitz.io is Daniel Laskewitz's personal speaker site. It exists to (1) hand session
attendees the resources promised on stage without friction, (2) show organisers what he
speaks about and where he has spoken, and (3) publish his own writing and open-source
project work. Success is an attendee getting the link they came for in under five seconds,
and an organiser being able to answer "what would he talk about?" without emailing.

## Positioning

A working speaker's site where the speaking record is the content, not a bio page with an
events list bolted on. Talks are first-class recurring objects delivered many times, each
delivery with its own event and its own co-presenters — so co-speakers are credited
everywhere they appear, from a single source, including on the QR-code resource pages.

## Operating Context

- Roughly 90 events since 2022, across ~25 countries, most of them multi-day conferences.
- Talks are given repeatedly at different events, often with different co-presenters.
- On-stage QR codes point to a resources page; today those live as ad-hoc GitHub/MkDocs
  pages that get edited per delivery when the co-speaker changes.
- Slide decks are published as PDFs and behind `aka.ms` short links.
- Attendees hit resource pages on conference wifi or cellular, on a phone, in poor light,
  with seconds of attention.

## Capabilities and Constraints

- Static site, no backend. Hosted on GitHub Pages at the custom domain `laskewitz.io`
  (CNAME in repo), deployed from the `Laskewitz/laskewitz.github.io` repository.
- Current stack is MkDocs Material; the confirmed decision is a full replacement with
  VitePress (Vue 3 SSG), default theme extended.
- Structured content (events, talks, speakers) is stored as typed TypeScript data modules.
- Co-speakers on a resource page are selected at view time via a query parameter
  (`?with=<slug>,<slug>`) resolved client-side against a speaker registry, so the same URL
  and QR code serve every delivery of a talk.
- A blog with an RSS feed is in scope.
- Existing public URLs (`/events/`, `/sessions/copilot-studio/`,
  `/sessions/cowork/`) and `aka.ms` short links must keep resolving.
- The Projects section was retired at Daniel's request; `/projects/` is gone rather
  than redirected, because the content it described no longer lives on the site.
- No analytics is currently configured; no cookie consent is required unless that changes.

## Brand Commitments

- Existing logo/wordmark assets (`logo-white.png`, `logo-dark.png`, `icon.png`) carry over.
- The site is explicitly Daniel's own personal site in his own voice. It is not a Microsoft
  property and must not read as one, even though he is a Principal Cloud Advocate
  at Microsoft. Microsoft product names appear as subject matter, not as branding.
- Voice in the existing copy is direct, plain and first-person ("I like building things
  that make my work — and hopefully yours — easier"). No corporate marketing register.

## Evidence on Hand

- Full event history (~90 entries with dates, cities, countries, websites, ticket links) in
  `docs/events.md`.
- Ten published slide decks in `docs/slides/` plus `aka.ms` slide short links.
- Two live resource pages: Microsoft Copilot Studio, Copilot Cowork.
- Projects: `learn-for-cowork` Cowork plugin, Power Platform Connectors VS Code extension,
  Independent Publisher Connectors programme.
- Social presence: GitHub, LinkedIn, Twitter/X, YouTube, Power Platform Weekly.
- Speaking photography supplied from Daniel's own archive. Four stage/room photographs are
  now in `src/public/images/stage/` at 960/1600/2400 widths: `stage-paris` (AI Tour Paris,
  used on the home banner), `hall-paris`, `stage-berlin`, `room-adriatics`. Photography is
  used only as full-bleed hanging banners behind a hall-colour tint, and never on `/r/`
  resource pages — Principle 1 outranks it there.
- No testimonials, ratings, attendance numbers, or speaker-fee information exist. None may
  be invented.

## Product Principles

1. **The QR path is the critical path.** Anything that slows a resource page on a phone on
   conference wifi is wrong, however good it looks elsewhere.
2. **One fact, one place.** A person, an event, or a talk is described once and reused
   everywhere it appears; per-delivery edits are a bug.
3. **The record is the argument.** Where he has spoken and what he speaks about is the
   evidence; no claims are needed beyond it.
4. **Credit co-speakers properly.** Shared sessions name and link both speakers, by default,
   without manual per-event editing.
5. **His voice, not his employer's.** Personal, plain, specific.

## Accessibility & Inclusion

No formal standard has been mandated. Given the primary usage scene — phone, one-handed, in
a dimly lit room emptying out, on poor connectivity — resource pages must meet at minimum:
large tap targets, high contrast in both light and dark, readable at default system text
size, and full function without JavaScript beyond the co-speaker enhancement.
