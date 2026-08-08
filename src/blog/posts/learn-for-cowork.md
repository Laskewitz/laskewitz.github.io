---
title: A Microsoft Learn plugin for Copilot Cowork
description: I needed a Cowork demo for CollabDays Netherlands that produced something real, so I built a plugin around the Microsoft Learn MCP server.
date: 2026-06-15
tags: [Copilot Cowork, MCP, Microsoft Learn]
---

# A Microsoft Learn plugin for Copilot Cowork

I gave [Copilot Cowork: Work Together with AI, Get Things Done](/talks/cowork/) at
[CollabDays Netherlands](/events/) on Saturday. Cowork isn't something you can
explain on a slide, so the demos carry the session. What I didn't want was another
demo where an agent tidies up a to-do list and everyone politely nods.

So I built [Microsoft Learn for Cowork](https://github.com/Laskewitz/learn-for-cowork).

It's a plugin that points Cowork at the
[Microsoft Learn MCP server](https://learn.microsoft.com/en-us/training/support/mcp),
which is the same knowledge service behind Ask Learn. It's remote, there's no
authentication, and it's free, which makes it about the easiest MCP server to demo
in front of a room on conference wifi.

On top of that I added two skills. One asks what you want a deck about and who it's
for, goes and reads the docs, and comes back with a PowerPoint that has speaker
notes and links to its sources. The other does the same research and writes a Word
one-pager instead.

The thing I care about is that both skills are written to search Learn several
times rather than once. One search gets you something that looks like an answer.
Several get you something you'd be willing to send to a colleague. It's a small
difference in the SKILL.md and a big difference in what comes out.

Watching that happen live, with links back to the real documentation in the output,
went over better than I expected. Nobody in the room had to take the agent's word
for anything, and that changes how people react to it.

The whole plugin is a manifest, two icons and two SKILL.md files zipped up. If you
have an MCP server you like, that's not a lot of work to copy.

Everything else from the session is on the [resources page](/r/cowork/).
