import type { ResourceGroup, Talk } from './types'

/**
 * The talks.
 *
 * A talk is a recurring object, not a one-off: it is given many times, at
 * different events, sometimes with different people. Each talk holds a track
 * colour and keeps it everywhere — placard, delivery line, and the full-bleed
 * door of its resource page.
 *
 * Deliveries record only outings that are actually evidenced. An empty list is
 * an honest gap to be filled, never a reason to invent a stage.
 */
export const talks: Talk[] = [
  {
    slug: 'copilot-studio',
    active: false,
    title: 'A developers introduction to Copilot Studio',
    summary: 'Building agents in Copilot Studio, from first topic to production.',
    abstract:
      'Copilot Studio makes building an agent about as hard as it should be, ' +
      'which is to say not very. Daniel and Albert-Jan build one on stage: ' +
      'topics first, then the orchestration that decides what happens when, the ' +
      'knowledge it answers from, custom reasoning models, and actions so it can ' +
      'do something rather than only talk. Mostly demos.',
    track: 'a',
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
    active: true,
    title: '🤖 Copilot Cowork: Work Together with AI, Get Things Done',
    summary: 'Extending Copilot Cowork with plugins that do long, multi-step work.',
    abstract:
      'Copilot has been promising to change how you work. Cowork is where it ' +
      'starts to deliver on that. You describe what needs to happen, and ' +
      'Copilot Cowork builds a plan and executes it across your Microsoft 365 apps. ' +
      'Calendar cleanup, meeting packets, company research: whole chains of steps, ' +
      'running while you do something else. Twenty-five to ' +
      'thirty minutes is enough to see how Work IQ gives Copilot the context to act ' +
      'on your behalf, what plugins and skills look like in practice, and whether ' +
      'this is real or still mostly polished demos. Bring your skepticism. It is a ' +
      'fair starting point.',
    track: 'b',
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
            label: 'Skills.sh, the open agent skills ecosystem',
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
            note: 'My plugin, steal the structure'
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
    active: false,
    title: 'Building Declarative Agents',
    summary: 'Declarative agents for Microsoft 365 Copilot, built and shipped.',
    abstract:
      'A declarative agent is about the quickest way to get an idea running ' +
      'inside Microsoft 365 Copilot. You describe what it knows, what it can ' +
      'reach and how it should behave, and Copilot does the rest. This session ' +
      'builds one from scratch, wires it to real knowledge and actions, and then ' +
      'spends time on the manifest, because that is where an agent stops giving ' +
      'vague answers and starts giving useful ones.',
    track: 'c',
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
    active: true,
    title: '🧠 MCP or not to MCP: that is THE question',
    summary:
      'Connecting Copilot Studio agents to real systems with the Model Context Protocol.',
    abstract:
      'The Model Context Protocol is everywhere these days, and since Copilot ' +
      'Studio joined in March 2025 the obvious question is what the fuss is ' +
      'about, and what happens to all those connectors you have been using. This ' +
      'session answers both. What an MCP server actually is, how to start using ' +
      'one in Copilot Studio, and why you might want them in your other AI tools ' +
      'too. Fair warning: it is demo heavy, across a range of scenarios, with ' +
      "Microsoft's own servers like the Dataverse one and third party servers " +
      'alongside them.',
    track: 'd',
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
    active: true,
    title: 'Building Maintainable Power Automate Flows: From Chaos to Clarity',
    summary:
      'Guidelines for building Power Automate flows that are a breeze to maintain.',
    abstract:
      'Power Automate lets anyone automate a process. The trouble with "anyone" ' +
      'is that flows grow fast and become unmanageable faster. The fix is to ' +
      'borrow the software engineering habits that low-code tends to skip, and ' +
      'design flows that stay quick and stay readable. Most flows get ' +
      'built without much thought for what happens at flow number two hundred, ' +
      'which is how you end up with duplicated logic and automations nobody dares ' +
      'touch. Built with a bit more care, Power Automate handles serious ' +
      'workloads without complaining. We walk through real examples and refactor ' +
      'what you already have.',
    track: 'e',
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
    active: false,
    title: 'Beyond Shipping: How to Keep Your Low-Code Solutions Healthy',
    summary:
      'What "maintainable code" means once the code is a canvas app and a handful of flows.',
    abstract:
      'Low-code is wonderfully fast to build in. The question is what happens ' +
      'after launch. Solutions grow, modules multiply, connectors pile up, and at ' +
      'some point a small change starts to feel risky.\n\n' +
      'So what does "maintainable code" mean when the code is a canvas app and a ' +
      'handful of flows? The software engineering ideas behind it are old and ' +
      'boring and they still work: keep apps short, keep logic ' +
      'simple, reuse components, draw clear lines between the parts, automate the ' +
      'bits worth automating.\n\n' +
      'Quick demos throughout, aimed at solutions you will still enjoy improving ' +
      'a year from now.',
    track: 'c',
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
    active: false,
    title: 'Prompt Builder Playbook',
    summary:
      'Writing prompts once so they behave the same in apps, flows and agents.',
    abstract:
      'With Prompt Builder in AI Builder you can write a prompt once and have it ' +
      'behave the same way in an app, a flow and an agent. This session covers ' +
      'what has actually worked in practice: output formatting for text, JSON and ' +
      'Word, grounding knowledge, the code interpreter, multi-modal inputs and ' +
      'Copilot-assisted authoring. It also covers bringing your own model through ' +
      'Azure AI Foundry, for when you want more say over how a prompt runs. The ' +
      'patterns are ones you can use the same week.',
    track: 'e',
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
    active: false,
    title: 'The art of building reusable prompts with AI Builder',
    summary:
      'Write the prompt once as a function, then let everyone else just fill in the inputs.',
    abstract:
      'Miguel and Daniel show you how to add AI to your low code solutions with ' +
      'the AI Builder Prompt Builder. Nobody really wants to write long prompts ' +
      'themselves, so why annoy people with that? Prompt Builder lets you write ' +
      'prompt functions, so end users fill in the inputs and nothing else. Write ' +
      'it once, use it everywhere.\n\n' +
      'You will learn how to prompt well and how to make prompts reusable, what ' +
      'the Prompt Builder does for you, and how to use prompts across Power Apps, ' +
      'Power Automate and Copilot Studio.',
    track: 'd',
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
    active: true,
    title: '🤯 OMG MCP WTF: Three Ways MCP Servers Can Change Your Life',
    summary:
      'Three practical, day-to-day scenarios where an MCP server beats the process it replaces.',
    abstract:
      'Microsoft picking up the Model Context Protocol changed what agents can ' +
      'reach, and what they can say to each other. Dataverse, Dynamics 365 ' +
      'Customer Service and a growing list of others are all in range now. ' +
      'Point an agent at one MCP server, or several, and ' +
      'multi-turn work that used to take a morning takes a couple of minutes. So ' +
      'the claim goes, anyway. Is it as real and as easy as advertised, and how ' +
      'does a functional user get this into their actual workday?\n\n' +
      'Joe and Daniel put it to the test. Three everyday scenarios, each one held ' +
      'up against the process it replaces, so you can see where MCP servers save ' +
      'real time and where they do not. You will leave knowing how to get ' +
      'started and with a few ideas worth stealing. Aimed at people who are ' +
      'curious about MCP but would not call themselves developers.',
    track: 'c',
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
    active: true,
    title:
      '🧠 Model Context Protocol vs. Connectors: Rethinking Integration in the Power Platform 💡',
    summary: 'Where MCP fits, where connectors still win, and how they work together.',
    abstract:
      'Model Context Protocol went from unknown to unavoidable in about a year, ' +
      'and providers across the industry picked it up fast. Microsoft did too, ' +
      'and paired it with an old friend of ours: (custom) connectors. We break ' +
      'down the differences between the two in the Power Platform: how each one ' +
      'works, where each one fits, and how they compare, with demos ' +
      'showing how to get started with MCP and how it sits next to connectors ' +
      'rather than replacing them. Aimed at solution architects, developers and ' +
      'IT leaders who build integrations.',
    track: 'a',
    tags: ['MCP', 'Custom Connectors', 'Power Platform'],
    resourceSlug: 'mcp-vs-connectors',
    /* Same ground as "MCP or not to MCP", so it hands out the same links. */
    resourcesFrom: 'mcp',
    defaultCoSpeakers: ['mnecker'],
    deliveries: [
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
    active: true,
    title:
      '🧠 MCP in Power Platform: One Year Later, Building Custom MCP Servers with Low Code',
    summary:
      'What changed in a year of MCP, and how to build your own server with low code.',
    abstract:
      'A year ago we introduced Model Context Protocol and compared it to ' +
      'connectors in the Power Platform. Plenty has changed. MCP went from a word ' +
      'people repeated to something you can build on, and Microsoft has shipped ' +
      'real updates to how MCP and connectors work together.\n\n' +
      "Mats and Daniel cover what is new in 2026: deeper platform support for " +
      'MCP, how MCP servers and custom connectors now relate to each other, and ' +
      'the one everybody asks about, which is building your own MCP server with ' +
      'low code directly in the Power Platform. You do not need an SDK and you do ' +
      'not need a deployment pipeline. We also get into governance, where Agent ' +
      '365 fits, and why Work IQ is worth your attention.\n\n' +
      "You do not need last year's session to follow this one. Expect demos, a " +
      'straight answer on where MCP fits and where connectors still win, and ' +
      'enough guidance to start building.',
    track: 'd',
    tags: ['MCP', 'Custom Connectors', 'Power Platform', 'Low Code', 'Governance'],
    defaultCoSpeakers: ['mnecker'],
    deliveries: [
      { eventSlug: 'espc-2026', coSpeakers: ['mnecker'] },
      { eventSlug: 'nordic-summit-2026', coSpeakers: ['mnecker'] }
    ]
  },
  {
    slug: 'agent-academy-live',
    active: true,
    title: 'Agent Academy Live!',
    summary:
      'A hands-on day building agents in Copilot Studio, from first topic to production.',
    abstract:
      'A day of building agents in Microsoft Copilot Studio. The content follows ' +
      'the Microsoft Agent Academy loosely: fundamentals first, then the harder ' +
      'parts, including multi-agent orchestration, content moderation and hooking ' +
      'agents up to the systems your organisation runs on.\n\n' +
      'You do not need prior experience with agents, and you do need a laptop, ' +
      'because most of the day is labs. Short explanations, a live demo, then you ' +
      'build it yourself. By the end you will have gone the whole way from a ' +
      'first conversation to something you would be comfortable putting in front ' +
      'of colleagues.',
    track: 'b',
    format: 'workshop',
    tags: ['Copilot Studio', 'Agents'],
    deliveries: [
      { eventSlug: 'scottish-summit-2026', coSpeakers: ['aprildunnam', 'mnecker'] }
    ]
  },
  {
    slug: 'agentic-solutions-copilot-studio',
    active: false,
    title: 'Building Agentic Solutions with Copilot Studio',
    summary:
      'A 75-minute hands-on build of an agent, from first topic to Agent Flows and MCP.',
    abstract:
      'Seventy-five minutes, hands on keyboard, one agent built from nothing in ' +
      'Microsoft Copilot Studio. You will bring in Agent Flows where automation ' +
      'is the right answer, connect an MCP server so the agent can reach real ' +
      'systems, and deploy the result.\n\n' +
      'By the end you will have created an agent from scratch, know when Agent ' +
      'Flows earn their place, understand what MCP is and how to connect a server ' +
      'to your agent, and have tested and shipped the thing.',
    track: 'a',
    format: 'workshop',
    tags: ['Copilot Studio', 'Agents', 'MCP'],
    resourceSlug: 'agentic-solutions-copilot-studio',
    resources: [
      {
        title: 'Product',
        links: [
          { label: 'Sign up for a trial', href: 'https://aka.ms/trycopilotstudio' },
          { label: 'Copilot Studio documentation', href: 'https://aka.ms/copilotstudiodocs' },
          {
            label: 'Implementation guide',
            href: 'https://aka.ms/CopilotStudioImplementationGuide'
          },
          { label: 'Estimate agent usage', href: 'https://aka.ms/mcs-estimator' },
          {
            label: 'Copilot Studio Kit',
            href: 'https://appsource.microsoft.com/en-us/product/saas/microsoftpowercatarch.copilotstudiokit2'
          }
        ]
      },
      {
        title: 'Keep learning',
        links: [
          { label: 'Complete the Agent Academy', href: 'https://aka.ms/agent-academy' },
          { label: 'Copilot Studio Labs', href: 'https://aka.ms/mcslabs' },
          { label: 'MCP labs for Copilot Studio', href: 'https://aka.ms/mcsmcp/samples' },
          {
            label: 'Copilot Studio tutorials',
            href: 'https://aka.ms/ai-in-action/building-with-mcs'
          },
          { label: 'See Copilot Studio in action', href: 'https://aka.ms/copilotstudiodemo' },
          {
            label: 'AI Tour resource centre',
            href: 'https://adoption.microsoft.com/en-us/microsoft-ai-tour-resources/copilot-studio/'
          }
        ]
      },
      {
        title: 'Community',
        links: [
          { label: 'Stay up to date', href: 'https://aka.ms/copilotstudioblog' },
          { label: 'Join the community', href: 'https://aka.ms/copilotstudiocommunity' }
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
    active: true,
    title:
      '🚀 Copilot Cowork in Action: What It Is, How to Get It & What You Can Do With It',
    summary:
      'Getting access to Cowork, and the everyday scenarios worth trying first.',
    abstract:
      'Plenty of people have heard of Cowork. Far fewer know how to get access, ' +
      'what it looks like once they are in, or what it can realistically do for ' +
      'them on a Tuesday afternoon.\n\n' +
      'This session closes that gap with demos rather than slides. Managing your ' +
      'inbox, staying on top of meetings, working with your team, getting things ' +
      'done inside Microsoft 365. Where it works well you will see it work well, ' +
      'and where it does not we will say so.\n\n' +
      'You also get two points of view, because one of us works at Microsoft and ' +
      'the other has been putting Cowork in front of customers. The direction of ' +
      'the product from one side, the experience of actually adopting it from the ' +
      'other.\n\n' +
      'You will leave knowing how to get access, what to expect the first time ' +
      'you open it, and which handful of scenarios are worth trying straight ' +
      'away.\n\n' +
      'If you spend your working day in Microsoft 365, this is for you, whether ' +
      'that is from IT, as a power user, or as somebody who suspects they are ' +
      'getting less out of these tools than they could. You do not need a ' +
      'technical background.',
    track: 'e',
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
    active: true,
    title:
      'Coding Agents Meet Work IQ: Grounding Copilot in Your Dataverse Business Data',
    summary:
      'A full day putting coding agents to work across admin, pro dev, analytics and agents.',
    abstract:
      'Dataverse and Work IQ together give an AI agent a working picture of how ' +
      'your business runs, based on the data and processes already sitting in ' +
      'Dataverse. This lab puts coding agents to work on four jobs.\n\n' +
      'On the admin side you will provision environments, security roles and a ' +
      'Dataverse data model. On the pro dev side you will write codeful plug-ins ' +
      'and use the developer tooling to extend business logic and manage solution ' +
      'assets. For analytics you will query and analyse your business data. And ' +
      'you will build agents in Copilot Studio that use Work IQ across your ' +
      'business applications.\n\n' +
      'The last part is the interesting one: tuning search, semantic models and ' +
      'business skills, then watching the answers get better in M365 Copilot, ' +
      'Copilot Cowork and whatever agents your users build for themselves.',
    track: 'c',
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
    active: false,
    title: 'Power Platform CLI Exposed',
    summary: 'Managing and automating the Power Platform from the command line.',
    abstract:
      'If you build on the Power Platform you end up living in the CLI sooner or ' +
      'later. This session shows what it does: creating and deploying solutions, ' +
      'managing environments, handling users and permissions. We start with ' +
      'installing and setting it up, walk the command groups so you know what ' +
      'exists, and get into using it sensibly in an organisation, both in your ' +
      'inner loop and in the pipelines that come after.',
    track: 'b',
    tags: ['Power Platform CLI', 'ALM', 'Power Platform'],
    deliveries: [
      { eventSlug: 'festive-tech-calendar-2023' },
      { eventSlug: 'nordic-summit-2023' },
      { eventSlug: 'scottish-summit-tour-2023' }
    ]
  },
  {
    slug: 'canvas-apps-optimization',
    active: false,
    title: 'Optimizing Canvas Apps for maintainability, reusability, and performance',
    summary: 'Development standards for Canvas Apps that scale and stay fast.',
    abstract:
      'Canvas Apps get slow for predictable reasons, and they get hard to ' +
      'maintain for predictable reasons too. Both are avoidable if you set your ' +
      'development standards early, and we go through the ones that matter: ' +
      'YAML, canvas and code components, HTML and ' +
      'custom connectors, and how each one earns its place in an app that has to ' +
      'stay quick.\n\n' +
      'Cathrine and Daniel bring examples from their own apps, the ones that went ' +
      'well and the ones that did not, so you can spot the pitfalls and the long ' +
      'loading times before you build them in.',
    track: 'c',
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
    active: false,
    title: 'Build your own copilot with Copilot Studio',
    summary: 'Getting started fast, from extending Microsoft 365 Copilot to building your own.',
    abstract:
      'Copilot Studio is a low-code way to extend a copilot you already have, ' +
      'like Microsoft 365 Copilot, or to build your own from nothing. This ' +
      'session builds one so you can see how quickly it goes: what Copilot Studio ' +
      'is and how you can use it, which generative AI features let you add ' +
      'knowledge in minutes, how to connect a copilot to external systems, and ' +
      'where low code genuinely saves you time rather than moving the work around.',
    track: 'd',
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
    slug: 'apis-in-the-hands-of-millions',
    active: false,
    title: '🚀 Put your APIs in the hands of millions of developers',
    summary: 'Reaching every low-code maker by shipping your API as a connector.',
    abstract:
      'The Power Platform already ships more than 1200 connectors, and every one ' +
      'of them puts an API in front of millions of makers building apps and ' +
      'automations. This session looks at what a connector actually is, why you ' +
      'would build one for your own service, and how to get from an OpenAPI ' +
      'definition to something people can pick from a list. We walk the build ' +
      'step by step, cover the difference between custom, certified and ' +
      'independent publisher connectors, and finish by building a first one ' +
      'live.',
    track: 'b',
    tags: ['Custom Connectors', 'APIs', 'Power Platform'],
    slides: '/slides/20240301-DevWorld.pdf',
    resourceSlug: 'apis-in-the-hands-of-millions',
    resources: [
      {
        title: 'Get started',
        links: [
          { label: 'Developer environment', href: 'https://aka.ms/pp/get-started' },
          { label: 'Custom connectors documentation', href: 'https://aka.ms/cc/learn' }
        ]
      },
      {
        title: 'Build and publish',
        links: [
          { label: 'Get your connector certified', href: 'https://aka.ms/cc/certification' },
          { label: 'Connectors GitHub repository', href: 'https://aka.ms/cc/github' },
          { label: 'Extend an OpenAPI definition', href: 'https://aka.ms/cc/extend-openAPI' },
          { label: 'Connector coding standards', href: 'https://aka.ms/cc/coding-standards' },
          { label: 'Power Platform CLI', href: 'https://aka.ms/powerplatformcli' }
        ]
      }
    ],
    deliveries: [{ eventSlug: 'devworld-2024' }]
  },
  {
    slug: 'custom-connectors',
    active: false,
    title: 'Extend the Power Platform with Custom Connectors',
    summary: 'Building, designing and publishing your own connectors.',
    abstract:
      'A custom connector puts your own API into the Power Platform, where makers ' +
      'can pick it out of a list and use it in an app or a flow without knowing ' +
      'or caring that it is yours. We cover what custom connectors are ' +
      'and how they work, then build one step by step, along with designing ' +
      'and publishing them well, and the practical difference between shipping a ' +
      'custom connector, a certified one, or going through the independent ' +
      'publisher programme.',
    track: 'e',
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
    active: false,
    title: 'Build your custom agent with Microsoft Copilot Studio',
    summary: 'Taking an agent from idea to something people actually use.',
    abstract:
      'Copilot Studio lets you build an agent without writing much code at all. ' +
      'This session builds a custom one end to end: giving it the knowledge it ' +
      'needs, wiring it up to the systems your organisation already runs on, ' +
      'adding actions so it can do real work rather than only answer questions, ' +
      'and then getting it in front of the people who will use it. Expect demos ' +
      'rather than slides.',
    track: 'a',
    tags: ['Copilot Studio', 'Agents', 'Low Code'],
    deliveries: [
      { eventSlug: 'devworld-2025' },
      { eventSlug: 'nordic-summit-2024' }
    ]
  },
  {
    slug: 'admin-essentials',
    active: true,
    title: 'Power Platform Admin Essentials: CLI, Tools & Tips',
    summary: 'Running the Power Platform properly, with the tooling that makes it possible.',
    abstract:
      'Administering the Power Platform is a lot more than clicking through the ' +
      'admin centre. The essentials are the Power Platform CLI, ' +
      'the admin connectors, the Centre of Excellence toolkit, and the tips that ' +
      'make day-to-day environment, DLP and capacity management manageable rather ' +
      'than painful. Aimed at admins and makers who have inherited a tenant and ' +
      'want to get it under control.',
    track: 'b',
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
 * The talks still on offer. Retired ones keep their page and their place in the
 * events they were given at, but the index only advertises what can be booked.
 */
export const activeTalks: Talk[] = talks.filter((t) => t.active)

/**
 * Tags carry two different jobs: naming the thing being demoed, and naming the
 * subject being discussed. The index filters on those separately, so the split
 * lives here rather than being guessed from the tag string at render time. A
 * tag absent from this map simply never appears as a filter.
 */
export type TagKind = 'product' | 'topic'

const tagKinds: Record<string, TagKind> = {
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

/**
 * Every tag of one kind that is actually in use, alphabetically.
 *
 * A filter menu is scanned for a word somebody already has in mind, so the
 * order that helps is the one they can predict. Talk counts shift with every
 * booking and would reshuffle the menu under them.
 */
export function tagsOfKind(kind: TagKind): string[] {
  const used = new Set<string>()
  for (const talk of activeTalks) {
    for (const tag of talk.tags) {
      if (tagKinds[tag] === kind) used.add(tag)
    }
  }
  return [...used].sort((a, b) => a.localeCompare(b))
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
  return activeTalks.length
}

/**
 * The rotation split by format. A session and a workshop are different asks of
 * an organiser — an hour on a stage against a day in a room — so the sign at
 * the entrance counts them separately rather than hiding both behind one total.
 */
export function sessionCount(): number {
  return activeTalks.filter((t) => t.format !== 'workshop').length
}

export function workshopCount(): number {
  return activeTalks.filter((t) => t.format === 'workshop').length
}

/**
 * The word on the plate. A talk without an explicit format is a session, which
 * is the common case, so the data stays quiet and the label is still printed.
 */
export function formatLabel(talk: Talk): string {
  return talk.format === 'workshop' ? 'Workshop' : 'Session'
}

/** Every talk given at a particular event, for the track directory. */
export function talksAtEvent(eventSlug: string): Talk[] {
  return talks.filter((t) => t.deliveries.some((d) => d.eventSlug === eventSlug))
}

/**
 * Everyone who shared a stage at a particular event, across every talk given
 * there. The boards bill co-speakers the same way the placard does, so a
 * shared session is visible from the entrance rather than only from the talk.
 */
export function coSpeakersAtEvent(eventSlug: string): string[] {
  const slugs = new Set<string>()
  for (const talk of talks) {
    for (const delivery of talk.deliveries) {
      if (delivery.eventSlug !== eventSlug) continue
      for (const speaker of delivery.coSpeakers ?? []) slugs.add(speaker)
    }
  }
  return [...slugs]
}
