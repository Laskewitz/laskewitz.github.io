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
    title: 'Microsoft Copilot Studio',
    summary: 'Building agents in Copilot Studio, from first topic to production.',
    abstract:
      'Copilot Studio lets you build agents without starting from an empty code file, ' +
      'but the gap between a demo agent and one you would actually put in front of ' +
      'colleagues is where the real work sits. This session walks through building an ' +
      'agent end to end — topics, knowledge, actions and the prompts that hold it all ' +
      'together — and covers what tends to break once real people start using it.',
    hall: 'a',
    tags: ['Copilot Studio', 'Agents', 'Power Platform'],
    resourceSlug: 'copilot-studio',
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
    deliveries: [
      { eventSlug: 'nordic-summit-2024' },
      { eventSlug: 'azure-ai-lowlands-2024' }
    ]
  },
  {
    slug: 'cowork',
    title: 'Copilot Cowork',
    summary: 'Extending Copilot Cowork with plugins that do long, multi-step work.',
    abstract:
      'Copilot Cowork is built for the tasks that take more than one prompt — the ' +
      'multi-step, multi-hour jobs that normally get abandoned halfway. This session ' +
      'looks at what Cowork does out of the box and how far you can push it with ' +
      'plugins that connect to MCP servers and add skills of your own.',
    hall: 'b',
    tags: ['Copilot Cowork', 'Microsoft 365', 'MCP'],
    resourceSlug: 'cowork',
    resources: [
      {
        title: 'Cowork',
        links: [
          { label: 'Copilot Cowork resources', href: 'https://aka.ms/cowork-resources' },
          {
            label: 'Manage Cowork plugins',
            href: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-manage-plugins'
          }
        ]
      },
      {
        title: 'Build your own',
        links: [
          {
            label: 'Learn for Copilot Cowork',
            href: 'https://github.com/Laskewitz/learn-for-cowork',
            note: 'My plugin — steal the structure'
          },
          {
            label: 'Microsoft Learn MCP Server',
            href: 'https://learn.microsoft.com/en-us/training/support/mcp'
          }
        ]
      }
    ],
    deliveries: []
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
  }
]

const talkBySlug = new Map(talks.map((t) => [t.slug, t]))
const talkByResource = new Map(
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
