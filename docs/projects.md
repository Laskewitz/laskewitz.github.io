---
title: Projects
description: Projects I'm working on - Cowork plugins and Power Platform connectors.
hide:
- footer
icon: material/rocket-launch
---

# Projects

I like building things that make my work (and hopefully yours) easier. Here's what I'm working on.

## Cowork Plugins

[Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-manage-plugins) is a way to work with Copilot in Microsoft 365 on longer, multi-step tasks. You can extend it with plugins that connect to MCP servers and add custom skills.

I've been building a few of these. Grab them if they're useful, or steal the structure to make your own.

### Learn for Copilot Cowork

This plugin hooks into the [Microsoft Learn MCP Server](https://learn.microsoft.com/en-us/training/support/mcp) so Cowork can search through Microsoft docs and pull together research for you.

It has two skills:

- **Learn Deck** - researches a topic on Microsoft Learn and builds a PowerPoint with speaker notes and sources
- **Learn One-Pager** - same idea, but outputs a one-page Word doc instead

🌎 [Learn for Copilot Cowork (GitHub)](https://github.com/Laskewitz/learn-for-cowork)

## Power Platform Connectors

I spend a lot of time building connectors for Power Platform. This section has some resources that might save you time if you're doing the same.

### VS Code Extension

I made a VS Code extension with snippets for building custom connectors. Type `ppc` after hitting `ctrl+space` (Windows) or `command+space` (Mac) and you'll see what's available.

🌎 [Power Platform Connectors (VS Code Extension)](https://aka.ms/ppc-vscode)

### Independent Publisher Connectors

Before 2021, only service owners could publish connectors. If you wanted a Tesla connector, Tesla had to build it.

The Independent Publisher Connector program changed that. Now anyone can build and publish a connector for any public API. The repo below is where all of them live.

🌎 [Power Platform Connectors GitHub Repository](https://aka.ms/ipconnectors)
