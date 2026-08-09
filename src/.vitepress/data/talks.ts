import type { ResourceGroup, Talk } from './types'

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
          }
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
    deliveries: [{ eventSlug: 'ai-agents-hack-2025', coSpeakers: ['garrytrinder'] }]
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
    slug: 'beyond-shipping',
    title: 'Beyond Shipping: How to Keep Your Low-Code Solutions Healthy',
    summary:
      'What "maintainable code" means once the code is a canvas app and a handful of flows.',
    abstract:
      'We love how fast low-code lets us build, but what happens after launch? As ' +
      'solutions grow, so does complexity. Modules expand, connectors multiply, ' +
      'and before you know it, small changes start to feel risky.\n\n' +
      'In this session, we will look at what "maintainable code" really means in a ' +
      'Power Platform world. Inspired by timeless software engineering principles, ' +
      'we will translate them into practical habits for low-code: short, modular ' +
      'apps, simple logic, reusable components, clear interfaces, and the right ' +
      'amount of automation.\n\n' +
      'Through quick demos, you will see how to design solutions that stay flexible ' +
      'and fun to improve. Because maintainability is not just for code anymore.',
    hall: 'c',
    tags: ['Power Platform', 'Maintainability', 'Solution Architecture'],
    resourceSlug: 'beyond-shipping',
    defaultCoSpeakers: ['appieschot'],
    resources: [
      {
        title: 'Tools from the session',
        links: [
          { label: 'Copilot Studio Kit', href: 'https://aka.ms/copilotstudiokit' },
          { label: 'Inventory Report', href: 'https://aka.ms/inventory-report' }
        ]
      }
    ],
    deliveries: [
      { eventSlug: 'european-bizapps-summit-2026', coSpeakers: ['appieschot'] }
    ]
  },
  {
    slug: 'prompt-builder-playbook',
    title: 'Prompt Builder Playbook',
    summary:
      'Design, test and operationalise prompts that behave the same in apps, flows and agents.',
    abstract:
      'With Prompt Builder in AI Builder, you can design, test, and operationalize ' +
      'prompts that work consistently across apps, flows, and agents. This session ' +
      'shares real-world lessons on how to take advantage of Prompt Builder ' +
      'features like output formatting (text, JSON, Word), grounding knowledge, ' +
      'code interpreter, multi-modal inputs, and even Copilot-assisted authoring. ' +
      'We will also explore how to bring your own model through Azure AI Foundry, ' +
      'giving you flexibility and control over how your prompts execute. You will ' +
      'leave with patterns you can put to work immediately.',
    hall: 'e',
    tags: ['AI Builder', 'Prompts', 'Azure AI Foundry'],
    resourceSlug: 'prompt-builder-playbook',
    defaultCoSpeakers: ['aprildunnam'],
    resources: [
      {
        title: 'Writing the prompt',
        links: [
          { label: 'Copilot Studio prompt guide', href: 'https://aka.ms/promptguide' },
          { label: 'AI prompts FAQ', href: 'https://aka.ms/prompt-builder-faq' }
        ]
      },
      {
        title: 'Try it yourself',
        links: [
          { label: 'Try out prompts', href: 'https://aka.ms/tryprompts' },
          {
            label: 'Power Platform prompt library',
            href: 'https://aka.ms/power-prompts'
          }
        ]
      },
      {
        title: 'Going further',
        links: [
          { label: 'AI Builder learning path', href: 'https://aka.ms/learn/ai-builder' },
          {
            label: 'Licensing and credits',
            href: 'https://aka.ms/ai-builder-cost'
          }
        ]
      }
    ],
    deliveries: [
      { eventSlug: 'directions-asia-2026' },
      { eventSlug: 'm365-conference-2026', coSpeakers: ['aprildunnam'] }
    ]
  },
  {
    slug: 'reusable-prompts',
    title: 'The art of building reusable prompts with AI Builder',
    summary:
      'Write the prompt once as a function, then let everyone else just fill in the inputs.',
    abstract:
      'In this session, Miguel and Daniel will show you how you can use the AI ' +
      'Builder Prompt Builder to infuse your low code solutions with AI. Nobody ' +
      'really wants to write long prompts themselves, so why annoy people with ' +
      'that? The Prompt Builder enables you to write prompt functions, so that end ' +
      'users only have to fill in the inputs and not the whole prompt. And the good ' +
      'thing about it is that they are reusable, so you only have to write it ' +
      'once.\n\n' +
      'You will learn how to prompt well and how to make prompts reusable, what the ' +
      'Prompt Builder does for you, and how to use prompts across Power Apps, Power ' +
      'Automate and Copilot Studio.',
    hall: 'd',
    tags: ['AI Builder', 'Prompts', 'Power Platform'],
    resourceSlug: 'reusable-prompts',
    /* Same ground as the Prompt Builder Playbook, so it hands out the same links. */
    resourcesFrom: 'prompt-builder-playbook',
    defaultCoSpeakers: ['miguelverweij'],
    deliveries: [
      { eventSlug: 'european-bizapps-summit-2026', coSpeakers: ['miguelverweij'] }
    ]
  },
  {
    slug: 'omg-mcp-wtf',
    title: 'OMG MCP WTF: Three Ways MCP Servers Can Change Your Life',
    summary:
      'Three practical, day-to-day scenarios where an MCP server beats the process it replaces.',
    abstract:
      'The adoption of the Model Context Protocol (MCP) standard by Microsoft ' +
      'heralds an important moment in the generative AI journey, as work is done ' +
      'to better facilitate agent to agent communication, and unlock the full ' +
      'capabilities of solutions such as Microsoft Dataverse, Dynamics 365 ' +
      'Customer Service, and more. With access to just a single (or indeed ' +
      'multiple) MCP server, complex, multi-turn actions can be accomplished in a ' +
      'pinch. But are the promises as real and as easy to work with as claimed? ' +
      'How can a functional user start to integrate these experiences into their ' +
      'day to day workflows?\n\n' +
      'In this session, join Joe and Daniel, as they demystify the buzz around MCP ' +
      'servers, and present 3 practical, day-to-day scenarios where using MCP ' +
      'servers obliterates any previous process, in terms of speed and efficiency. ' +
      'You will gain a thorough understanding of how to get going with MCP ' +
      'servers, and walk away with insights and inspiration on how to use them ' +
      'yourself. This session is perfect for the MCP curious, who may not be ' +
      'strong as a developer, but is keen to see how MCP servers can be used in an ' +
      'easy way.',
    hall: 'c',
    tags: ['MCP', 'Copilot', 'Agents'],
    resourceSlug: 'omg-mcp-wtf',
    /* Same ground as "MCP or not to MCP", so it hands out the same links. */
    resourcesFrom: 'mcp',
    defaultCoSpeakers: ['joegriffin'],
    deliveries: [
      { eventSlug: 'helish-summit-2026', coSpeakers: ['joegriffin'] },
      { eventSlug: 'dynamicsminds-2026', coSpeakers: ['joegriffin'] }
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
    resourceSlug: 'mcp-vs-connectors',
    /* Same ground as "MCP or not to MCP", so it hands out the same links. */
    resourcesFrom: 'mcp',
    defaultCoSpeakers: ['mnecker'],
    deliveries: [
      { eventSlug: 'espc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'ppcc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'scottish-summit-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'eppc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'dynamicsminds-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'european-bizapps-summit-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'cttt-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'nordic-summit-2025', coSpeakers: ['mnecker'] }
    ]
  },
  {
    slug: 'mcp-one-year-later',
    title:
      'MCP in Power Platform: One Year Later — Building Custom MCP Servers with Low Code',
    summary:
      'What changed in a year of MCP, and how to build your own server with low code.',
    abstract:
      'A year ago, we introduced Model Context Protocol (MCP) and how it compares ' +
      'to connectors in the Power Platform. A lot has changed since then. MCP has ' +
      'matured from a buzzword into a real building block for agent integrations, ' +
      'and Microsoft has shipped significant updates to how MCP and connectors work ' +
      'together and how you can create your own.\n\n' +
      "In this updated session, Mats and Daniel will show you what's new in 2026: " +
      'deeper platform support for MCP, the evolving relationship between MCP ' +
      'servers and custom connectors, and the big one — how to build your own ' +
      'custom MCP server using low code directly in the Power Platform. No SDKs, no ' +
      'deployment pipelines, just low-code tooling that makes MCP accessible to ' +
      'makers and pro devs alike. We will also cover the governance aspects of it ' +
      'and how Agent 365 fits in the whole story and why you should know about Work ' +
      'IQ.\n\n' +
      "Whether you caught last year's session or are starting fresh, you'll walk " +
      'away with practical demos, honest takes on where MCP fits (and where ' +
      'connectors still win), and a clear picture of how these two integration ' +
      'patterns are converging to power the next generation of AI agents. After ' +
      'this session you will be up to speed where we are with MCP servers and have ' +
      'the guidance and tools to get started.',
    hall: 'd',
    tags: ['MCP', 'Custom Connectors', 'Power Platform', 'Low Code', 'Governance'],
    defaultCoSpeakers: ['mnecker'],
    deliveries: [
      { eventSlug: 'espc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'nordic-summit-2026', coSpeakers: ['mnecker'] }
    ]
  },
  {
    slug: 'agent-academy-live',
    title: 'Agent Academy Live!',
    summary:
      'A hands-on day building agents in Copilot Studio, from first topic to production.',
    abstract:
      'In this workshop, you will learn how to build successful agents using ' +
      'Microsoft Copilot Studio. Loosely based on the Microsoft Agent Academy ' +
      'content, we will guide you through the fundamentals of agent development and ' +
      'progress to advanced techniques including multi-agent orchestration, content ' +
      'moderation, and enterprise integrations.\n\n' +
      "Whether you're new to AI agents or looking to enhance your skills, this " +
      'hands-on workshop will equip you with practical knowledge to design, build, ' +
      'and deploy intelligent agents that solve real-world business challenges. ' +
      'Through a combination of guided instruction, live demonstrations, and ' +
      'hands-on labs, you\'ll experience the full agent development lifecycle, from ' +
      'your first conversation to production-ready solutions.',
    hall: 'b',
    format: 'workshop',
    tags: ['Copilot Studio', 'Agents'],
    deliveries: [{ eventSlug: 'scottish-summit-2026' }]
  },
  {
    slug: 'agentic-solutions-copilot-studio',
    title: 'Building Agentic Solutions with Copilot Studio',
    summary:
      'A 75-minute hands-on build of an agent, from first topic to Agent Flows and MCP.',
    abstract:
      'This 75-minute hands-on workshop with Microsoft Copilot Studio guides you ' +
      'through building agentic solutions with Copilot Studio. You will learn how ' +
      'to build, integrate, automate, and deploy a fully functional agent using ' +
      'tools like Agent Flows and MCP. You will walk away with practical skills to ' +
      'customise agents for real-world business needs.\n\n' +
      'By the end of the session you will be able to create an agent from scratch ' +
      'in Copilot Studio, know when and how to bring in Agent Flows, understand ' +
      'what MCP is and how to connect MCP servers to your agent, and see how to ' +
      'test and deploy the result.',
    hall: 'a',
    format: 'workshop',
    tags: ['Copilot Studio', 'Agents', 'MCP'],
    slides:
      'https://assetsmanagement952e.blob.core.windows.net/assets/WRK532%20Building%20agentic%20solutions%20with%20Copilot%20Studio/WRK532_Presentation_V1.0.pptx',
    resourceSlug: 'agentic-solutions-copilot-studio',
    resources: [
      {
        title: 'Workshop',
        links: [
          {
            label: 'Workshop repository',
            href: 'https://github.com/microsoft/aitour26-WRK532-building-agentic-solutions-with-copilot-studio'
          },
          {
            label: 'Session recording',
            href: 'https://youtu.be/emavMkhFPew'
          }
        ]
      },
      {
        title: 'Keep learning',
        links: [
          {
            label: 'AI Tour Copilot Studio resources',
            href: 'https://adoption.microsoft.com/en-us/microsoft-ai-tour-resources/copilot-studio/'
          },
          {
            label: 'Get started with Copilot Studio',
            href: 'https://aka.ms/copilotstudio-getstarted'
          },
          {
            label: 'AI Tour 2026 Resource Center',
            href: 'https://aka.ms/AITour26-Resource-Center'
          },
          { label: 'Learn at AI Tour', href: 'https://aka.ms/LearnAtAITour' }
        ]
      }
    ],
    deliveries: [
      { eventSlug: 'ai-tour-zurich-2026' },
      { eventSlug: 'ai-tour-utrecht-2026' },
      { eventSlug: 'ai-tour-paris-2026' },
      { eventSlug: 'ai-tour-london-2026' }
    ]
  },
  {
    slug: 'cowork-in-action',
    title:
      'Copilot Cowork in Action: What It Is, How to Get It & What You Can Do With It',
    summary:
      'Getting access to Cowork, and the everyday scenarios worth trying first.',
    abstract:
      'A lot of people have heard of Cowork, but there is still a gap between ' +
      'hearing about it and actually knowing how to use it. How do you get access? ' +
      'What does it look like in practice? And what can it realistically help you ' +
      'with day to day?\n\n' +
      'This session is here to close that gap. Join us for a practical, ' +
      'demo-driven showcase where we walk through Cowork from the ground up. You ' +
      'will see it in action across real scenarios: managing your inbox, staying on ' +
      'top of meetings, collaborating with your team, and getting things done ' +
      'faster inside Microsoft 365. We will not just tell you what is possible, we ' +
      'will show you the reality.\n\n' +
      'What makes this session a little different is that you will hear from both ' +
      'the Microsoft side and the partner side. That means you get a balanced view: ' +
      'the vision and direction behind Cowork, alongside real-world experience of ' +
      'adopting and using it in practice. Two perspectives, one session.\n\n' +
      'By the end, you will know exactly how to get access, what to expect when you ' +
      'first open it, and which use cases are worth exploring straight away. We ' +
      'will highlight the features that make the biggest difference in everyday ' +
      'work, demonstrate what those look like live, and give you a clear starting ' +
      'point to take back with you.\n\n' +
      'This session is for anyone who works in Microsoft 365 regularly, whether you ' +
      'are in IT, a power user, or just someone looking to get more out of the ' +
      'tools you already have. No deep technical background required. If you are ' +
      'curious about Cowork and want to leave with something concrete, this is the ' +
      'session for you.',
    hall: 'e',
    tags: ['Copilot Cowork', 'Microsoft 365'],
    /* Same ground as the other Cowork talk, so it hands out the same links. */
    resourceSlug: 'cowork-in-action',
    resourcesFrom: 'cowork',
    defaultCoSpeakers: ['melissahale'],
    deliveries: [
      { eventSlug: 'espc-2026', coSpeakers: ['melissahale'] },
      { eventSlug: 'scottish-summit-2026', coSpeakers: ['melissahale'] }
    ]
  },
  {
    slug: 'coding-agents-work-iq',
    title:
      'Coding Agents Meet Work IQ: Grounding Copilot in Your Dataverse Business Data',
    summary:
      'A full day putting coding agents to work across admin, pro dev, analytics and agents.',
    abstract:
      'Together, Dataverse and Work IQ give your AI agents a deep understanding of ' +
      'how your business operates, grounding Copilot in the real data, processes, ' +
      'and workflows that live in Dataverse. In this hands-on lab, you will put ' +
      'coding agents to work across four jobs. For administration, you will ' +
      'provision environments, security roles, and your Dataverse data model. For ' +
      'pro development, you will build Dataverse codeful plug-ins and use developer ' +
      'tooling to extend business logic and manage solution assets. For analytics, ' +
      'you will query and analyze your business data. And you will build agents in ' +
      'Copilot Studio that take advantage of Work IQ across your business ' +
      'applications. Finally, you will see how tuning search, semantic models, and ' +
      'business skills gives end users better results in M365 Copilot, Copilot ' +
      'Cowork, or the custom agents they build.',
    hall: 'c',
    format: 'workshop',
    tags: ['Dataverse', 'Copilot Studio', 'Agents', 'Power Platform'],
    defaultCoSpeakers: ['nathanhelgren', 'kentweare', 'rohithchetla'],
    deliveries: [
      {
        eventSlug: 'ppcc-2026',
        coSpeakers: ['nathanhelgren', 'kentweare', 'rohithchetla']
      }
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
    resourceSlug: 'canvas-apps-optimization',
    defaultCoSpeakers: ['cathrinebruvold'],
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
        title: 'Power CAT Tools',
        links: [
          { label: 'Power CAT Tools', href: 'https://aka.ms/powercattools' },
          {
            label: 'Code Review rules',
            href: 'https://github.com/Laskewitz/Canvas-App-Optimization/blob/main/rules/README.md',
            note: 'What the Code Review tool checks'
          }
        ]
      },
      {
        title: 'Reduce the amount of code',
        links: [
          {
            label: 'Named Formulas',
            href: 'https://www.microsoft.com/power-platform/blog/power-apps/power-fx-introducing-named-formulas'
          },
          {
            label: 'Simplify formulas with With',
            href: 'https://www.microsoft.com/power-platform/blog/power-apps/simplify-formulas-with-the-with-function/'
          },
          {
            label: 'User defined functions and types',
            href: 'https://www.microsoft.com/en-us/power-platform/blog/power-apps/user-defined-functions-user-defined-types-and-enhanced-component-properties-move-forward/'
          }
        ]
      },
      {
        title: 'Components',
        links: [
          {
            label: 'Canvas components',
            href: 'https://learn.microsoft.com/power-apps/maker/canvas-apps/create-component'
          },
          {
            label: 'Code components',
            href: 'https://learn.microsoft.com/power-apps/developer/component-framework/overview'
          },
          {
            label: 'Creator Kit',
            href: 'https://learn.microsoft.com/power-platform/guidance/creator-kit/overview'
          },
          { label: 'PCF Gallery', href: 'https://pcf.gallery/' },
          { label: 'Resco Power Components', href: 'https://www.resco.net/power-components/' }
        ]
      },
      {
        title: 'Custom connectors',
        links: [
          {
            label: 'Custom connectors docs',
            href: 'https://learn.microsoft.com/connectors/custom-connectors/'
          },
          {
            label: 'Open-source connectors',
            href: 'https://github.com/microsoft/powerplatformconnectors'
          }
        ]
      },
      {
        title: 'Building for scale',
        links: [
          {
            label: 'Canvas YAML code view',
            href: 'https://learn.microsoft.com/power-apps/maker/canvas-apps/code-view'
          },
          {
            label: 'Responsive layout',
            href: 'https://learn.microsoft.com/power-apps/maker/canvas-apps/create-responsive-layout'
          },
          { label: 'Test Engine', href: 'https://microsoft.github.io/PowerApps-TestEngine/' }
        ]
      }
    ],
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
    resourceSlug: 'custom-connectors',
    resources: [
      {
        title: 'Build a connector',
        links: [
          { label: 'Create a connector from the UI', href: 'https://aka.ms/cc/create-from-ui' },
          { label: 'Connectors GitHub repo', href: 'https://aka.ms/pp/connectors' },
          { label: 'Power Platform CLI', href: 'https://aka.ms/pac' }
        ]
      },
      {
        title: 'Go further',
        links: [
          { label: 'Policy templates', href: 'https://aka.ms/cc/policy-templates' },
          { label: 'x-ms extensions', href: 'https://aka.ms/cc/extend-openAPI' },
          { label: 'Connector AI plugins', href: 'https://aka.ms/cc/create-ai-plugin' }
        ]
      },
      {
        title: 'Service principal',
        links: [
          { label: 'Service principal support', href: 'https://aka.ms/cc/service-principal' },
          { label: 'Service principal lab', href: 'https://aka.ms/cc/spn-lab' }
        ]
      },
      {
        title: 'MCP',
        links: [{ label: 'MCP samples', href: 'https://aka.ms/mcsmcp/samples' }]
      }
    ],
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
    resourceSlug: 'admin-essentials',
    defaultCoSpeakers: ['carlcookson'],
    resources: [
      {
        title: 'Power Platform CLI',
        links: [{ label: 'Power Platform CLI docs', href: 'https://aka.ms/pac' }]
      },
      {
        title: 'Power Platform Admin Center',
        links: [
          {
            label: 'Managed Environments overview',
            href: 'https://learn.microsoft.com/en-us/power-platform/admin/managed-environment-overview'
          }
        ]
      },
      {
        title: 'XrmToolBox',
        links: [
          { label: 'XrmToolBox', href: 'https://www.xrmtoolbox.com' },
          {
            label: 'Linn Zaw Win Power Platform tools',
            href: 'https://linnzawwin.blogspot.com/p/tools.html'
          }
        ]
      },
      {
        title: 'XrmToolBox plugins',
        links: [
          {
            label: 'Org Settings Updater',
            href: 'https://linked365.blog/2020/06/18/d365-org-db-settings-xrmtoolbox-addon/'
          },
          {
            label: 'Personal User Views Migration',
            href: 'https://github.com/carfup/XTBPlugins.PersonalViewsMigration'
          },
          { label: 'Clone User', href: 'https://github.com/donschia/XrmToolBox.CloneUserSetup' },
          {
            label: 'Flow & Process Definition Searcher',
            href: 'https://www.linkedin.com/pulse/searching-power-automate-flows-metadata-field-table-porter-p4pwe'
          },
          { label: 'Flow Administrator', href: 'https://linked365.blog/2023/12/18/flow-administrator/' }
        ]
      },
      {
        title: 'Power Platform ToolBox',
        links: [
          { label: 'Power Platform ToolBox', href: 'https://www.powerplatformtoolbox.com' }
        ]
      },
      {
        title: 'Power Platform ToolBox tools',
        links: [
          {
            label: 'Environment Manager',
            href: 'https://www.powerplatformtoolbox.com/tools/de178113-27a1-4acb-b8f4-6b62ef0021e0'
          },
          {
            label: 'Environment Variable Manager',
            href: 'https://www.powerplatformtoolbox.com/tools/7c1bc888-11c0-4a12-a561-75cb2f1f617b'
          },
          {
            label: 'Plugin Registration',
            href: 'https://www.powerplatformtoolbox.com/tools/0db0368c-e0dd-4575-bdf0-7495a43ef660'
          },
          {
            label: 'Flow Finder',
            href: 'https://www.powerplatformtoolbox.com/tools/4064fa95-067c-4017-adae-bc8c9fcd4c8f'
          },
          {
            label: 'Auditing Manager',
            href: 'https://www.powerplatformtoolbox.com/tools/94612c66-2d1d-4384-b519-9501ab67f603'
          }
        ]
      }
    ],
    deliveries: [
      { eventSlug: 'european-bizapps-summit-2026', coSpeakers: ['carlcookson'] },
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
  Dataverse: 'product',
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
}

const talkByResource = new Map(
  talks.filter((t) => t.resourceSlug).map((t) => [t.resourceSlug!, t])
)

/** The groups a talk hands out, following `resourcesFrom` when it is set. */
export function talkResources(talk: Talk): ResourceGroup[] {
  if (talk.resources?.length) return talk.resources
  const source = talk.resourcesFrom ? talkBySlug.get(talk.resourcesFrom) : undefined
  return source?.resources ?? []
}

export function getTalk(slug: string): Talk | undefined {
  return talkBySlug.get(slug)
}

export function getTalkByResource(resourceSlug: string): Talk | undefined {
  return talkByResource.get(resourceSlug)
}

export function talkCount(): number {
  return talks.length
}

/**
 * The word on the plate. A talk without an explicit format is a session, which
 * is the common case, so the data stays quiet and the label is still printed.
 */
export function formatLabel(talk: Talk): string {
  return talk.format === 'workshop' ? 'Workshop' : 'Session'
}

/** Every talk given at a particular event, for the hall directory. */
export function talksAtEvent(eventSlug: string): Talk[] {
  return talks.filter((t) => t.deliveries.some((d) => d.eventSlug === eventSlug))
}
