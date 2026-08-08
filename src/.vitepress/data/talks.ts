import type { Talk } from './types'

/**
 * The talks.
 *
 * A talk is a recurring object, not a one-off: it is given many times, at
 * different events, sometimes with different people. Each talk holds a hall
 * colour and keeps it everywhere — placard, delivery line, and the full-bleed
 * door of its resource page.
 *
 * Deliveries record only outings that are actually evidenced. An empty list is
 * an honest gap to be filled, never a reason to invent a stage.
 */
export const talks: Talk[] = [
  {
    slug: 'copilot-studio',
    title: 'A developers introduction to Copilot Studio',
    summary: 'Building agents in Copilot Studio, from first topic to production.',
    abstract:
      'Building Agents should be easy! And it can be if you are using Copilot ' +
      'Studio. In this demo rich session Daniel and Albert-Jan will show you how ' +
      'you can build agents, orchestrate their behaviour, introduce knowledge and ' +
      'apply custom reasoning models and add actions.',
    hall: 'a',
    tags: ['Copilot Studio', 'Agents', 'Power Platform'],
    resourceSlug: 'copilot-studio',
    defaultCoSpeakers: ['appieschot'],
    resources: [
      {
        title: 'Product',
        links: [
          { label: 'Try Microsoft Copilot Studio', href: 'https://aka.ms/trycopilotstudio' },
          {
            label: 'Implementation Guide',
            href: 'https://aka.ms/copilotstudioimplementationguide'
          },
          { label: 'AI Builder prompting guide', href: 'https://aka.ms/promptguide' }
        ]
      },
      {
        title: 'Community',
        links: [
          { label: 'Prompt Library', href: 'https://aka.ms/ai-builder-prompts' },
          { label: 'Copilot Studio Snippets', href: 'https://aka.ms/copilot-studio-snippets' }
        ]
      }
    ],
    deliveries: [{ eventSlug: 'agentcon-utrecht-2025', coSpeakers: ['appieschot'] }]
  },
  {
    slug: 'cowork',
    title: 'Copilot Cowork: Work Together with AI, Get Things Done',
    summary: 'Extending Copilot Cowork with plugins that do long, multi-step work.',
    abstract:
      'Copilot has been promising to change how you work. Cowork is where it ' +
      'starts to deliver on that. The idea: you describe what needs to happen, and ' +
      'Copilot Cowork builds a plan and executes it across your Microsoft 365 apps. ' +
      'Calendar cleanup, meeting packets, company research — not one prompt, but the ' +
      'full chain of steps, running while you do something else. Twenty-five to ' +
      'thirty minutes is enough to see how Work IQ gives Copilot the context to act ' +
      'on your behalf, what plugins and skills look like in practice, and whether ' +
      'this is real or still mostly polished demos. Bring your skepticism. It is a ' +
      'fair starting point.',
    hall: 'b',
    tags: ['Copilot Cowork', 'Microsoft 365', 'MCP'],
    resourceSlug: 'cowork',
    resources: [
      {
        title: 'Get started',
        links: [
          {
            label: 'Copilot Cowork overview',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/'
          },
          {
            label: 'Get started with Copilot Cowork',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/get-started'
          },
          {
            label: 'Use Copilot Cowork',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork'
          },
          {
            label: 'Common questions',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-faq'
          }
        ]
      },
      {
        title: 'Hands-on labs',
        links: [
          { label: 'Copilot Cowork Collective', href: 'https://aka.ms/cowork-collective' }
        ]
      },
      {
        title: 'Skills',
        links: [
          {
            label: 'Cowork skills reference',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork#cowork-skills'
          },
          {
            label: 'Skills.sh — open agent skills ecosystem',
            href: 'https://skills.sh'
          }
        ]
      },
      {
        title: 'Plugins',
        links: [
          {
            label: 'Copilot Cowork plugins',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-plugins'
          },
          {
            label: 'Available plugins',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-available-plugins'
          },
          {
            label: 'Build plugins for Cowork',
            href: 'https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-plugin-development'
          },
          {
            label: 'Microsoft Learn for Cowork plugin',
            href: 'https://github.com/Laskewitz/learn-for-cowork',
            note: 'My plugin — steal the structure'
          }
        ]
      },
      {
        title: 'From the session',
        links: [
          {
            label: 'Copilot Cowork deck',
            href: 'https://github.com/Laskewitz/cowork/blob/main/assets/Copilot%20Cowork.pptx'
          },
          { label: 'All session resources', href: 'https://github.com/Laskewitz/cowork' }
        ]
      }
    ],
    deliveries: [
      { eventSlug: 'shift-enter-summit-2026' },
      { eventSlug: 'poweraddicts-nl-2026-05' },
      { eventSlug: 'agentcon-utrecht-2026', coSpeakers: ['appieschot'] },
      { eventSlug: 'collabdays-nl-2026' },
      { eventSlug: 'colorcloud-2026' }
    ]
  },
  {
    slug: 'declarative-agents',
    title: 'Building Declarative Agents',
    summary: 'Declarative agents for Microsoft 365 Copilot, built and shipped.',
    abstract:
      'A declarative agent is the shortest path from an idea to something running ' +
      'inside Microsoft 365 Copilot: you describe what it knows, what it can reach, ' +
      'and how it should behave. This session builds one from scratch, wires it to ' +
      'real knowledge and actions, and covers the parts of the manifest that decide ' +
      'whether it feels sharp or vague in use.',
    hall: 'c',
    tags: ['Declarative Agents', 'Microsoft 365 Copilot', 'Agents'],
    resourceSlug: 'declarative-agents',
    slides: '/slides/20250416-AIAgentsHack-BuildingDeclarativeAgents.pdf',
    resources: [
      {
        title: 'Get started',
        links: [
          {
            label: 'Declarative agents overview',
            href: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/overview-declarative-agent'
          },
          {
            label: 'Build a declarative agent',
            href: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/build-declarative-agents'
          },
          { label: 'Microsoft 365 Agents Toolkit', href: 'https://aka.ms/M365AgentsToolkit' }
        ]
      },
      {
        title: 'From the session',
        links: [
          {
            label: 'Slides',
            href: '/slides/20250416-AIAgentsHack-BuildingDeclarativeAgents.pdf'
          },
          { label: 'AI Agents Hackathon', href: 'https://aka.ms/agentshack' }
        ]
      }
    ],
    deliveries: [{ eventSlug: 'ai-agents-hack-2025' }]
  },
  {
    slug: 'mcp',
    title: 'MCP or not to MCP — that is THE question',
    summary:
      'Connecting Copilot Studio agents to real systems with the Model Context Protocol.',
    abstract:
      'So, the Model Context Protocol (MCP) is everywhere these days, and now that ' +
      'Copilot Studio jumped on board in March 2025, everyone is wondering: what is ' +
      'the big deal? And more importantly, what happens to all those connectors we ' +
      'have been using? We will break it all down for you in this session. We will ' +
      'dive into what MCP servers actually are, how you can start using them in ' +
      'Copilot Studio, and why you might want to try them out in other AI tools too. ' +
      'Fair warning: this is going to be demo-heavy, so get ready to see MCP in ' +
      'action across a bunch of different scenarios — including both Microsoft’s own ' +
      'MCP servers, like the Dataverse MCP server, and third-party ones.',
    hall: 'd',
    tags: ['MCP', 'Copilot Studio', 'Agents'],
    resourceSlug: 'mcp',
    /* Usually given with Mats; ?with=aprildunnam re-bills it without an edit. */
    defaultCoSpeakers: ['mnecker'],
    resources: [
      {
        title: 'Documentation',
        links: [
          { label: 'Copilot Studio MCP announcement', href: 'https://aka.ms/mcsmcp' },
          { label: 'Copilot Studio MCP documentation', href: 'https://aka.ms/mcsmcpdocs' },
          {
            label: 'Dataverse MCP agent instructions',
            href: 'https://learn.microsoft.com/power-apps/maker/data-platform/data-platform-mcp-disable#sample-agent-instructions'
          },
          {
            label: 'Work IQ in Copilot Studio',
            href: 'https://learn.microsoft.com/microsoft-copilot-studio/use-work-iq'
          }
        ]
      },
      {
        title: 'Labs',
        links: [
          { label: 'Copilot Studio ❤️ MCP lab', href: 'https://aka.ms/mcsmcplab' },
          { label: 'Dataverse MCP lab', href: 'https://aka.ms/dataverse/mcp/lab' }
        ]
      },
      {
        title: 'Samples and tools',
        links: [
          { label: 'Copilot Studio MCP samples', href: 'https://aka.ms/copilot-studio-mcp' },
          { label: 'Power Platform CLI MCP preview', href: 'https://aka.ms/pac/mcp' }
        ]
      },
      {
        title: 'Community',
        links: [
          { label: 'Copilot Studio MCP community', href: 'https://aka.ms/mcsmcpcommunity' }
        ]
      }
    ],
    deliveries: [
      { eventSlug: 'directions-asia-2026' },
      { eventSlug: 'colorcloud-2026' },
      { eventSlug: 'm365-conference-2026', coSpeakers: ['aprildunnam'] },
      { eventSlug: 'dotnetfriday-2026' },
      { eventSlug: 'd365pp-manchester-2025' },
      { eventSlug: 'bizz-summit-es-2025' }
    ]
  },
  {
    slug: 'maintainable-flows',
    title: 'Building Maintainable Power Automate Flows: From Chaos to Clarity',
    summary:
      'Guidelines for building Power Automate flows that are a breeze to maintain.',
    abstract:
      'Power Automate enables anyone to automate processes. However, “anyone” often ' +
      'means flows that grow fast… and become unmanageable even faster. In this ' +
      'session, we will explore how to design and build Power Automate flows that ' +
      'are performant, reusable, and easy to maintain by applying proven software ' +
      'engineering principles to the low-code platform. While Power Automate is ' +
      'marketed as a low-code tool for citizen developers, many flows end up being ' +
      'built without scalability or maintainability in mind, leading to fragile ' +
      'automations, duplicated logic, and performance bottlenecks. Designed with the ' +
      'right mindset, it becomes an enterprise-grade automation platform. We walk ' +
      'through real-world examples showing how to refactor what you already have.',
    hall: 'e',
    tags: ['Power Automate', 'Power Platform', 'Maintainability'],
    resourceSlug: 'maintainable-flows',
    defaultCoSpeakers: ['agniusbartninkas'],
    resources: [
      {
        title: 'The book',
        links: [
          {
            label: 'Building Maintainable Software (SIG)',
            href: 'https://www.softwareimprovementgroup.com/wp-content/uploads/Building_Maintainable_Software_SIG_Java.compressed.pdf'
          }
        ]
      },
      {
        title: 'Tools and frameworks',
        links: [
          {
            label: 'Power Platform Control Hub',
            href: 'https://github.com/Laskewitz/Power-Platform-Control-Hub/'
          },
          {
            label: 'PADFramework',
            href: 'https://github.com/AgniusBartninkas/power-automate-desktop-framework'
          }
        ]
      }
    ],
    deliveries: [
      { eventSlug: 'eppc-2026', coSpeakers: ['agniusbartninkas'] }
    ]
  },
  {
    slug: 'mcp-vs-connectors',
    title:
      'Model Context Protocol vs. Connectors: Rethinking Integration in the Power Platform',
    summary: 'Where MCP fits, where connectors still win, and how they work together.',
    abstract:
      'Model Context Protocol (MCP) quickly became the thing everybody doing AI ' +
      'talks about, and its adoption rate across different tech providers is rapid. ' +
      'Microsoft has embraced it as well and is combining it with an old friend of ' +
      'ours: (custom) connectors. In this session we break down the differences ' +
      'between MCP and traditional connectors in the Power Platform. Attendees learn ' +
      'how each works, where they fit best, and how they compare, with practical ' +
      'demos showing how to get started with MCP and how it can work alongside ' +
      'connectors — not replace them. It is aimed at solution architects, developers ' +
      'and IT leaders looking to modernise how they build integrations.',
    hall: 'a',
    tags: ['MCP', 'Custom Connectors', 'Power Platform'],
    defaultCoSpeakers: ['mnecker'],
    deliveries: [
      { eventSlug: 'espc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'ppcc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'scottish-summit-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'eppc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'cttt-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'nordic-summit-2025', coSpeakers: ['mnecker'] }
    ]
  },
  {
    slug: 'power-platform-cli',
    title: 'Power Platform CLI Exposed',
    summary: 'Managing and automating the Power Platform from the command line.',
    abstract:
      'The Power Platform Command Line Interface is an essential tool for developers ' +
      'and IT professionals who work with the Power Platform. This session ' +
      'demonstrates how to use the CLI to manage and automate common tasks such as ' +
      'creating and deploying solutions, managing environments, and managing users ' +
      'and permissions. It covers the basics of installing and setting up the CLI, ' +
      'walks through the different command groups that are out there, and discusses ' +
      'best practices for using the CLI in your organisation — both from an inner ' +
      'loop and an outer loop perspective.',
    hall: 'b',
    tags: ['Power Platform CLI', 'ALM', 'Power Platform'],
    deliveries: [
      { eventSlug: 'festive-tech-calendar-2023' },
      { eventSlug: 'nordic-summit-2023' },
      { eventSlug: 'scottish-summit-tour-2023' }
    ]
  },
  {
    slug: 'canvas-apps-optimization',
    title: 'Optimizing Canvas Apps for maintainability, reusability, and performance',
    summary: 'Development standards for Canvas Apps that scale and stay fast.',
    abstract:
      'A session on enhancing your Canvas Apps by focusing on best-practice ' +
      'development for better performance, ensuring maintainability and promoting ' +
      'reusability. Learn how to use effective techniques and tools such as YAML, ' +
      'canvas and code components, HTML and custom connectors for building and ' +
      'designing well-performing applications. Cathrine and Daniel showcase examples ' +
      'from their own experience and the principles behind them, so you gain a ' +
      'greater understanding of development standards in Power Apps that let you ' +
      'build for scalability and avoid the common pitfalls and long loading times.',
    hall: 'c',
    tags: ['Power Apps', 'Canvas Apps', 'Performance'],
    defaultCoSpeakers: ['cathrinebruvold'],
    deliveries: [
      { eventSlug: 'nordic-summit-2025', coSpeakers: ['cathrinebruvold'] },
      { eventSlug: 'power-summit-2025', coSpeakers: ['cathrinebruvold'] },
      { eventSlug: 'eppc-2025', coSpeakers: ['cathrinebruvold'] }
    ]
  },
  {
    slug: 'build-your-own-copilot',
    title: 'Build your own copilot with Copilot Studio',
    summary: 'Getting started fast, from extending Microsoft 365 Copilot to building your own.',
    abstract:
      'Copilot Studio is a low-code way to extend existing copilots like Microsoft ' +
      '365 Copilot, or to build your own from scratch. This session shows how to get ' +
      'started quickly by building one: what Copilot Studio is and how you can use ' +
      'it, which generative AI features are there to quickly add knowledge, how to ' +
      'connect your copilot to external systems, and where low code genuinely helps ' +
      'you develop faster.',
    hall: 'd',
    tags: ['Copilot Studio', 'Low Code', 'Microsoft 365'],
    deliveries: [
      { eventSlug: 'future-tech-2025' },
      { eventSlug: 'gppb-be-2025' },
      { eventSlug: 'lcnc-ppc-2024' },
      { eventSlug: 'ai-community-day-berlin-2024' },
      { eventSlug: 'azure-ai-lowlands-2024' },
      { eventSlug: 'gppb-2024' }
    ]
  },
  {
    slug: 'custom-connectors',
    title: 'Extend the Power Platform with Custom Connectors',
    summary: 'Building, designing and publishing your own connectors.',
    abstract:
      'Custom connectors extend the capabilities of the Power Platform with your own ' +
      'APIs. This session provides an overview of what custom connectors are, how ' +
      'they work, and the benefits of using them in your apps and workflows. It ' +
      'walks through the step-by-step process of building custom connectors and ' +
      'discusses best practices for designing and publishing them — whether you end ' +
      'up shipping a custom, certified, or independent publisher connector.',
    hall: 'e',
    tags: ['Custom Connectors', 'Power Platform', 'APIs'],
    deliveries: [
      { eventSlug: 'scottish-summit-tour-2023' },
      { eventSlug: 'collabdays-nl-2022' },
      { eventSlug: 'nordic-summit-2022' },
      { eventSlug: 'scottish-summit-2022' },
      { eventSlug: 'oslo-power-platform-2022' },
      { eventSlug: 'teams-nation-2022' },
      { eventSlug: 'collabdays-benl-2021' }
    ]
  },
  {
    slug: 'build-your-custom-agent',
    title: 'Build your custom agent with Microsoft Copilot Studio',
    summary: 'Taking an agent from idea to something people actually use.',
    abstract:
      'Copilot Studio lets you build your own agent without writing much code at ' +
      'all. This session walks through building a custom agent end to end: giving it ' +
      'the knowledge it needs, wiring it up to the systems your organisation already ' +
      'runs on, adding actions so it can do real work rather than only answer ' +
      'questions, and then getting it in front of the people who will use it. Expect ' +
      'demos rather than slides.',
    hall: 'a',
    tags: ['Copilot Studio', 'Agents', 'Low Code'],
    deliveries: [
      { eventSlug: 'devworld-2025' },
      { eventSlug: 'nordic-summit-2024' }
    ]
  },
  {
    slug: 'admin-essentials',
    title: 'Power Platform Admin Essentials: CLI, Tools & Tips',
    summary: 'Running the Power Platform properly, with the tooling that makes it possible.',
    abstract:
      'Administering the Power Platform is a lot more than clicking through the ' +
      'admin centre. This session covers the essentials: the Power Platform CLI, the ' +
      'admin connectors, the Centre of Excellence toolkit, and the tips that make ' +
      'day-to-day environment, DLP and capacity management manageable rather than ' +
      'painful. Aimed at admins and makers who have inherited a tenant and want to ' +
      'get it under control.',
    hall: 'b',
    tags: ['Power Platform CLI', 'Administration', 'Governance'],
    defaultCoSpeakers: ['carlcookson'],
    deliveries: [
      { eventSlug: 'eppc-2025', coSpeakers: ['carlcookson'] },
      { eventSlug: 'cttt-2025', coSpeakers: ['carlcookson'] }
    ]
  }
]

const talkBySlug = new Map(talks.map((t) => [t.slug, t]))

/**
 * Tags carry two different jobs: naming the thing being demoed, and naming the
 * subject being discussed. The index filters on those separately, so the split
 * lives here rather than being guessed from the tag string at render time. A
 * tag absent from this map simply never appears as a filter.
 */
export type TagKind = 'product' | 'topic'

export const tagKinds: Record<string, TagKind> = {
  'Copilot Cowork': 'product',
  'Copilot Studio': 'product',
  'Microsoft 365': 'product',
  'Microsoft 365 Copilot': 'product',
  'Power Apps': 'product',
  'Canvas Apps': 'product',
  'Power Automate': 'product',
  'Power Platform': 'product',
  'Power Platform CLI': 'product',
  Agents: 'topic',
  'Declarative Agents': 'topic',
  MCP: 'topic',
  'Custom Connectors': 'topic',
  APIs: 'topic',
  'Low Code': 'topic',
  ALM: 'topic',
  Administration: 'topic',
  Governance: 'topic',
  Maintainability: 'topic',
  Performance: 'topic'
}

/** Every tag of one kind that is actually in use, in talk-count order. */
export function tagsOfKind(kind: TagKind): string[] {
  const counts = new Map<string, number>()
  for (const talk of talks) {
    for (const tag of talk.tags) {
      if (tagKinds[tag] !== kind) continue
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}const talkByResource = new Map(
  talks.filter((t) => t.resourceSlug).map((t) => [t.resourceSlug!, t])
)

export function getTalk(slug: string): Talk | undefined {
  return talkBySlug.get(slug)
}

export function getTalkByResource(resourceSlug: string): Talk | undefined {
  return talkByResource.get(resourceSlug)
}

export function talkCount(): number {
  return talks.length
}

/** Every talk given at a particular event, for the hall directory. */
export function talksAtEvent(eventSlug: string): Talk[] {
  return talks.filter((t) => t.deliveries.some((d) => d.eventSlug === eventSlug))
}
