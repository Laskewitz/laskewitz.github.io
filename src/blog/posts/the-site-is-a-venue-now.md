---
title: The site is a venue now
description: Why I rebuilt laskewitz.io around the one thing it actually has to do — get a phone in a dark room to the right page.
date: 2026-02-10
tags: [Site, Design]
---

# The site is a venue now

The old version of this site was MkDocs Material. It worked. Events lived in one
long markdown table, the two session pages were hand-edited every time a
co-speaker changed, and there was no blog at all. Nothing was structured, so
nothing could be reused.

What finally pushed me was noticing who actually uses this site. It isn't a
recruiter, and it isn't someone browsing on a laptop. It's a person in the third
row of a session room that's already emptying, holding up a phone to catch the QR
code on my last slide, on conference wifi that gave up an hour ago. They have
about fifteen seconds of patience.

That's a wayfinding problem, not a website problem. So the site is built like a
venue: every page is a sign, every navigable thing is a full-width row with a
colour tab and an arrow, and each talk gets a hall colour it keeps everywhere it
appears — on its placard, on its delivery lines, and on the full-bleed door of
its resource page.

## Everything is data now

Events, talks and speakers are typed TypeScript files. Upcoming versus past is
computed from the date rather than maintained by hand, so an event never sits in
the wrong section because I forgot to move it. The talk pages know which events
they were given at because the talk holds the deliveries, and the event listing
knows which talks were given at it because it can ask the other way round.

The speaker registry is the part I'll get the most out of. Everyone I've shared a
stage with gets one entry, and every place that credits them reads from it.

## Resource pages that don't need editing

The session resource pages were the real reason for all of this. I'd hard-code
my co-speaker's contact details, print the QR, and then give the same talk with
somebody else three weeks later — and have to edit the page.

Now the co-speakers come from the URL:

```
laskewitz.io/r/copilot-studio?with=someone-else
```

The page is static, the QR code never changes, and the billing does. If the
parameter is missing the talk's default speakers show up, and if a slug is
misspelled it's quietly dropped, because an attendee standing in a corridor
should never be looking at an error message.

## And a feed

There's an [RSS feed](/feed.rss) now. No newsletter, no signup, no account. That
felt like the right amount of infrastructure for a personal site.
