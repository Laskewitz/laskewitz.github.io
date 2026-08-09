---
title: A CoE dashboard without the CoE Starter Kit
description: I rebuilt the Center of Excellence dashboard as a Power Apps Code App on top of the Inventory API, so there's no solution to install and nothing to sync.
date: 2026-05-30
categories: [Power Platform, Governance, Code Apps]
pageClass: wf-post
---

Every tenant I've worked in that runs the
[CoE Starter Kit](https://learn.microsoft.com/en-us/power-platform/guidance/coe/starter-kit)
has the same story. Someone installed it, the sync flows ran for a while, then a flow
failed quietly and nobody noticed for two months. By the time you look at the dashboard
you're not sure whether you're looking at your tenant or a snapshot of it from last
quarter.

So I built [Power Platform Control Hub](https://github.com/Laskewitz/Power-Platform-Control-Hub).

It's a [Power Apps Code App](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
that reads from the
[Power Platform Inventory API](https://learn.microsoft.com/en-us/power-platform/admin/inventory-api)
and the admin connectors directly. Canvas apps, model-driven apps, cloud flows, agent
flows, code apps, Copilot Studio agents and environments, all of it live at the moment
you open the page. There is no solution to import, no Dataverse tables to populate and
no nightly sync to babysit. Authentication comes from the Power Apps host, so there's no
app registration and no MSAL configuration either.

## Inventory is the boring half

Listing resources is the part everyone expects, and it's not the interesting part. What
I actually wanted was to click a resource and be told something useful about it.

So every canvas app, flow and agent has a detail panel with a Best Practice Analysis
section. Flows get 26 checks: no error handling, HTTP actions without a timeout, nested
`Apply to each` loops, a `Do Until` with no meaningful iteration limit, Parse JSON
without a schema, an HTTP trigger with no Response action. Canvas apps get 11, mostly
around sharing and staleness. Copilot Studio agents get 13, including the ones that
matter for security: authentication set to None, access control open to anyone, group
membership access with no groups actually configured.

Those checks are the reason the thing exists. An inventory tells you what you have. The
analysis tells you what to do on Monday.

The flow panel also renders the full trigger and action tree, with conditions showing
their True and False branches side by side and loops and scopes as collapsible
containers. It turns out that once you can read a flow's shape without opening it in the
designer, reviewing someone else's flow gets a lot less painful.

## Governance you can edit, not just read

The other thing the Starter Kit dashboard never did for me was let me change anything.
Control Hub does DLP policies end to end: list them, create them through a two-stage
flow, open a detail page per policy. There's an **Apply Best Practices** action that
checks a policy against a set of advisory rules, HTTP to Blocked, SharePoint to
Confidential, and shows you what it proposes before anything is saved.

Environment groups, rule-based policies and rule sets are full CRUD. Environments can be
enabled, disabled, made managed, backed up, and moved in and out of groups from the
Actions menu. Quarantining an app, disabling a flow or adding yourself as an owner all
happen in place.

## Why a Code App

Code Apps sit in a spot I like. It's a React and TypeScript app with Fluent UI v9, so I
get real components, real state and a real build, but it's still hosted by Power Apps
with Power Apps handling identity and connector authentication. I don't have to stand
up infrastructure to ship an admin tool to admins.

It also means the whole thing is a repository you can read, fork and change. If your
organisation's idea of a best practice differs from mine, the checks are a TypeScript
file, not a rule buried in a solution.

Light and dark mode, responsive layout, keyboard navigation and toast notifications for
every write action are in there too, because a governance tool people avoid opening is a
governance tool that doesn't work.

The repo is at
[Laskewitz/Power-Platform-Control-Hub](https://github.com/Laskewitz/Power-Platform-Control-Hub).
Issues and pull requests are welcome, particularly around the analysis rules.
