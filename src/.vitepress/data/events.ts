import type { EventRecord } from './types'

/**
 * The speaking record.
 *
 * Ordered newest first. Upcoming versus past is derived from the date at render
 * time, never maintained by hand — an event moves to the past on its own.
 */
export const events: EventRecord[] = [
  // ── 2026 ────────────────────────────────────────────────────────────────────
  {
    slug: 'espc-2026',
    name: 'ESPC',
    start: '2026-11-30',
    end: '2026-12-03',
    city: 'Amsterdam',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://espc.tech/conference/espc-2026/',
    tickets: 'https://espc.tech/conference/espc-2026/tickets/'
  },
  {
    slug: 'ignite-2026',
    name: 'Microsoft Ignite',
    start: '2026-11-17',
    end: '2026-11-20',
    city: 'San Francisco',
    country: 'US',
    countryName: 'United States',
    website: 'https://ignite.microsoft.com/en-US/home',
    tickets:
      'https://register.ignite.microsoft.com/flow/microsoft/ignite27/welcome/page/welcome'
  },
  {
    slug: 'ppcc-2026',
    name: 'Power Platform Community Conference',
    start: '2026-10-27',
    end: '2026-10-29',
    city: 'Las Vegas',
    country: 'US',
    countryName: 'United States',
    website: 'https://powerplatformconf.com/',
    tickets: 'https://powerplatformconf.com/register'
  },
  {
    slug: 'scottish-summit-2026',
    name: 'Scottish Summit',
    start: '2026-10-02',
    end: '2026-10-03',
    city: 'Edinburgh',
    country: 'GB-SCT',
    countryName: 'Scotland',
    website: 'https://scottishsummit.com/',
    tickets: 'https://fienta.com/scottish-summit-2026'
  },
  {
    slug: 'nordic-summit-2026',
    name: 'Nordic Summit',
    start: '2026-09-21',
    end: '2026-09-22',
    city: 'Billund',
    country: 'DK',
    countryName: 'Denmark',
    website: 'https://nordicsummit.info/',
    tickets: 'https://nordicsummit.info/'
  },
  {
    slug: 'helish-summit-2026',
    name: 'HELish Summit',
    start: '2026-09-17',
    city: 'Helsinki',
    country: 'FI',
    countryName: 'Finland',
    website: 'https://helishsummit.fi',
    tickets: 'https://www.lyyti.fi/reg/HELish_Summit_2026'
  },
  {
    slug: 'shift-enter-summit-2026',
    name: 'Shift+Enter Summit',
    start: '2026-09-04',
    city: 'Budapest',
    country: 'HU',
    countryName: 'Hungary',
    website: 'https://shiftenter.io/',
    tickets: 'https://www.shiftenter.io/tickets'
  },
  {
    slug: 'eppc-2026',
    name: 'European Power Platform Conference',
    start: '2026-06-29',
    end: '2026-07-02',
    city: 'Copenhagen',
    country: 'DK',
    countryName: 'Denmark',
    website: 'https://www.sharepointeurope.com/european-power-platform-conference/',
    tickets: 'https://www.sharepointeurope.com/european-power-platform-conference-pricing/'
  },
  {
    slug: 'agentcon-utrecht-2026',
    name: 'AgentCon Utrecht',
    start: '2026-06-25',
    city: 'Driebergen',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://agentcon.city/utrecht',
    tickets: 'https://globalai.community/e/l9bfp20y/register'
  },
  {
    slug: 'collabdays-nl-2026',
    name: 'CollabDays Netherlands',
    start: '2026-06-13',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://www.collabdays.org/2026-nl/'
  },
  {
    slug: 'dynamicsminds-2026',
    name: 'DynamicsMinds',
    start: '2026-05-25',
    end: '2026-05-27',
    city: 'Portorož',
    country: 'SI',
    countryName: 'Slovenia',
    website: 'https://www.dynamicsminds.com/'
  },
  {
    slug: 'poweraddicts-nl-2026-05',
    name: 'PowerAddictsNL',
    start: '2026-05-21',
    city: 'Utrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://www.poweraddicts.nl'
  },
  {
    slug: 'directions-asia-2026',
    name: 'Directions Asia',
    start: '2026-05-13',
    end: '2026-05-15',
    city: 'Ho Chi Minh City',
    country: 'VN',
    countryName: 'Vietnam',
    website: 'https://www.directionsforpartners.com/asia2026'
  },
  {
    slug: 'european-bizapps-summit-2026',
    name: 'European BizApps Summit',
    start: '2026-05-05',
    end: '2026-05-07',
    city: 'Cologne',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://bizappssummit.eu/'
  },
  {
    slug: 'ai-tour-zurich-2026',
    name: 'AI Tour Zurich',
    start: '2026-04-29',
    city: 'Zurich',
    country: 'CH',
    countryName: 'Switzerland',
    website: 'https://aitour.microsoft.com/'
  },
  {
    slug: 'm365-conference-2026',
    name: 'Microsoft 365 Conference',
    start: '2026-04-21',
    end: '2026-04-23',
    city: 'Orlando',
    country: 'US',
    countryName: 'United States',
    website: 'https://m365conf.com/'
  },
  {
    slug: 'colorcloud-2026',
    name: 'ColorCloud',
    start: '2026-04-15',
    end: '2026-04-17',
    city: 'Hamburg',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://colorcloud.rocks/'
  },
  {
    slug: 'dotnetfriday-2026',
    name: 'DotnetFriday',
    start: '2026-04-10',
    city: 'Nieuwegein',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://dotnetfriday.nl/'
  },
  {
    slug: 'ai-tour-utrecht-2026',
    name: 'AI Tour Utrecht',
    start: '2026-04-08',
    city: 'Utrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://aitour.microsoft.com/'
  },
  {
    slug: 'adriatics-tech-summit-2026',
    name: 'Adriatics Tech Summit',
    start: '2026-03-30',
    end: '2026-04-01',
    city: 'Sarajevo',
    country: 'BA',
    countryName: 'Bosnia and Herzegovina',
    website: 'https://adriaticstechsummit.com/'
  },
  {
    slug: 'mvp-summit-2026',
    name: 'MVP Summit',
    start: '2026-03-24',
    end: '2026-03-26',
    city: 'Redmond',
    country: 'US',
    countryName: 'United States',
    website: 'https://summit.microsoft.com/en-us/'
  },
  {
    slug: 'ai-tour-paris-2026',
    name: 'AI Tour Paris',
    start: '2026-03-11',
    city: 'Paris',
    country: 'FR',
    countryName: 'France',
    website: 'https://aitour.microsoft.com/'
  },
  {
    slug: 'ai-tour-london-2026',
    name: 'AI Tour London',
    start: '2026-02-24',
    city: 'London',
    country: 'GB',
    countryName: 'United Kingdom',
    website: 'https://aitour.microsoft.com/'
  },
  {
    slug: 'cttt-2026',
    name: 'Cloud Technology Townhall Tallinn',
    start: '2026-01-29',
    end: '2026-01-30',
    city: 'Tallinn',
    country: 'EE',
    countryName: 'Estonia',
    website: 'https://cloudtechtallinn.com/'
  },

  // ── 2025 ────────────────────────────────────────────────────────────────────
  {
    slug: 'collabdays-oslo-2025',
    name: 'CollabDays Oslo',
    start: '2025-12-05',
    end: '2025-12-06',
    city: 'Oslo',
    country: 'NO',
    countryName: 'Norway',
    website: 'https://www.collabdays.org/2025-oslo/'
  },
  {
    slug: 'espc-2025',
    name: 'ESPC',
    start: '2025-12-01',
    end: '2025-12-04',
    city: 'Dublin',
    country: 'IE',
    countryName: 'Ireland',
    website: 'https://www.sharepointeurope.com/'
  },
  {
    slug: 'ignite-2025',
    name: 'Microsoft Ignite',
    start: '2025-11-17',
    end: '2025-11-21',
    city: 'San Francisco',
    country: 'US',
    countryName: 'United States',
    website: 'https://ignite.microsoft.com/en-US/home'
  },
  {
    slug: 'ai-tour-frankfurt-2025',
    name: 'AI Tour Frankfurt',
    start: '2025-11-06',
    city: 'Frankfurt',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://aka.ms/ai-tour/frankfurt-25'
  },
  {
    slug: 'ai-day-2025',
    name: 'AI DAY',
    start: '2025-11-04',
    city: 'Aarhus',
    country: 'DK',
    countryName: 'Denmark',
    website: 'https://aiday.dk/'
  },
  {
    slug: 'south-coast-summit-2025',
    name: 'South Coast Summit',
    start: '2025-10-17',
    end: '2025-10-18',
    city: 'Farnborough',
    country: 'GB',
    countryName: 'United Kingdom',
    website: 'https://www.southcoastsummit.com/'
  },
  {
    slug: 'bizz-summit-es-2025',
    name: 'Bizz Summit ES',
    start: '2025-10-03',
    end: '2025-10-04',
    city: 'Madrid',
    country: 'ES',
    countryName: 'Spain',
    website: 'https://bizzsummit.es/en/'
  },
  {
    slug: 'basta-2025',
    name: 'BASTA!',
    start: '2025-09-22',
    end: '2025-09-26',
    city: 'Mainz',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://basta.net/mainz/'
  },
  {
    slug: 'd365pp-manchester-2025',
    name: 'Dynamics 365 & Power Platform User Group Manchester',
    start: '2025-09-10',
    city: 'Manchester',
    country: 'GB-ENG',
    countryName: 'United Kingdom',
    website: 'https://www.d365ppug.com/manchester/'
  },
  {
    slug: 'nordic-summit-2025',
    name: 'Nordic Summit',
    start: '2025-09-19',
    end: '2025-09-20',
    city: 'Gothenburg',
    country: 'SE',
    countryName: 'Sweden',
    website: 'https://nordicsummit.info/'
  },
  {
    slug: 'baltic-summit-2025',
    name: 'Baltic Summit',
    start: '2025-09-12',
    end: '2025-09-13',
    city: 'Gdynia',
    country: 'PL',
    countryName: 'Poland',
    website: 'https://balticsummit.pl/'
  },
  {
    slug: 'collabdays-hamburg-2025',
    name: 'CollabDays Hamburg',
    start: '2025-06-28',
    city: 'Hamburg',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://www.collabdays.org/2025-hamburg/'
  },
  {
    slug: 'eppc-2025',
    name: 'European Power Platform Conference',
    start: '2025-06-16',
    end: '2025-06-19',
    city: 'Vienna',
    country: 'AT',
    countryName: 'Austria',
    website: 'https://www.sharepointeurope.com/european-power-platform-conference/'
  },
  {
    slug: 'european-bizapps-summit-2025',
    name: 'European BizApps Summit',
    start: '2025-05-26',
    end: '2025-05-28',
    city: 'Düsseldorf',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://bizappssummit.eu/'
  },
  {
    slug: 'power-summit-2025',
    name: 'Power Summit — Power Platform & AI Agents',
    start: '2025-05-24',
    city: 'London',
    country: 'GB',
    countryName: 'United Kingdom',
    website: 'https://powersummit.powercommunity.com/'
  },
  {
    slug: 'resco-next-2025',
    name: 'Resco Next',
    start: '2025-05-20',
    end: '2025-05-21',
    city: 'Valencia',
    country: 'ES',
    countryName: 'Spain',
    website: 'https://resconext.com/'
  },
  {
    slug: 'agentcon-utrecht-2025',
    name: 'AgentCon Utrecht',
    start: '2025-04-22',
    city: 'Utrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://agentcon.city/utrecht'
  },
  {
    slug: 'colorcloud-2025',
    name: 'ColorCloud',
    start: '2025-04-24',
    end: '2025-04-25',
    city: 'Hamburg',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://colorcloud.rocks/'
  },
  {
    slug: 'ai-agents-hack-2025',
    name: 'AI Agents Hackathon',
    start: '2025-04-16',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online',
    website: 'https://aka.ms/agentshack',
    slides: '/slides/20250416-AIAgentsHack-BuildingDeclarativeAgents.pdf'
  },
  {
    slug: 'ai-tour-utrecht-2025',
    name: 'AI Tour Utrecht',
    start: '2025-03-20',
    city: 'Utrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://msaitour.microsoft.com/en-us/utrecht'
  },
  {
    slug: 'future-tech-2025',
    name: 'Future Tech',
    start: '2025-03-13',
    city: 'Utrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://futuretech.nl/',
    slides: 'https://aka.ms/DL-FT25-Slides'
  },
  {
    slug: 'ai-tour-london-2025',
    name: 'AI Tour London',
    start: '2025-03-05',
    city: 'London',
    country: 'GB',
    countryName: 'United Kingdom',
    website: 'https://aitour.microsoft.com/en-us/london'
  },
  {
    slug: 'devworld-2025',
    name: 'DEVWorld',
    start: '2025-02-27',
    end: '2025-02-28',
    city: 'Amsterdam',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://devworldconference.com/'
  },
  {
    slug: 'gppb-be-2025',
    name: 'Global Power Platform Bootcamp — Belgium Edition',
    start: '2025-02-22',
    city: 'Edegem',
    country: 'BE',
    countryName: 'Belgium',
    website: 'https://bootcamp.poweraddicts.be/'
  },
  {
    slug: 'cttt-2025',
    name: 'Cloud Technology Townhall Tallinn',
    start: '2025-01-30',
    end: '2025-01-31',
    city: 'Tallinn',
    country: 'EE',
    countryName: 'Estonia',
    website: 'https://cloudtechtallinn.com/'
  },
  {
    slug: 'ai-tour-johannesburg-2025',
    name: 'AI Tour Johannesburg',
    start: '2025-01-23',
    city: 'Johannesburg',
    country: 'ZA',
    countryName: 'South Africa',
    website: 'https://aitour.microsoft.com/en-US/johannesburg'
  },

  // ── 2024 ────────────────────────────────────────────────────────────────────
  {
    slug: 'ppc-sweden-2024',
    name: 'Power Platform Community Sweden',
    start: '2024-12-03',
    city: 'Stockholm',
    country: 'SE',
    countryName: 'Sweden',
    website: 'https://powerplatformsweden.se/'
  },
  {
    slug: 'espc-2024',
    name: 'ESPC',
    start: '2024-12-02',
    end: '2024-12-05',
    city: 'Stockholm',
    country: 'SE',
    countryName: 'Sweden',
    website: 'https://www.sharepointeurope.com/'
  },
  {
    slug: 'collabdays-oslo-2024',
    name: 'CollabDays Oslo',
    start: '2024-11-30',
    city: 'Oslo',
    country: 'NO',
    countryName: 'Norway',
    website: 'https://www.collabdays.org/2024-oslo/',
    slides: '/slides/20241130-CollabDaysOslo.pdf'
  },
  {
    slug: 'ignite-2024',
    name: 'Microsoft Ignite',
    start: '2024-11-19',
    end: '2024-11-22',
    city: 'Chicago',
    country: 'US',
    countryName: 'United States',
    website: 'https://ignite.microsoft.com/en-US/home'
  },
  {
    slug: 'lcnc-ppc-2024',
    name: 'Low Code/No Code Power Platform Conference',
    start: '2024-11-09',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online',
    website:
      'https://www.communitydays.org/event/2024-11-09/low-code-no-code-microsoft-power-platform-conference-2024'
  },
  {
    slug: 'ai-tour-berlin-2024-10',
    name: 'Microsoft AI Tour Berlin',
    start: '2024-10-24',
    city: 'Berlin',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://aitour.microsoft.com/en-US/home'
  },
  {
    slug: 'ai-community-day-berlin-2024',
    name: 'AI Community Day Berlin',
    start: '2024-10-23',
    city: 'Berlin',
    country: 'DE',
    countryName: 'Germany'
  },
  {
    slug: 'ai-tour-paris-2024-10',
    name: 'Microsoft AI Tour Paris',
    start: '2024-10-22',
    city: 'Paris',
    country: 'FR',
    countryName: 'France',
    website: 'https://aitour.microsoft.com/en-US/home'
  },
  {
    slug: 'collabdays-belgium-2024',
    name: 'CollabDays Belgium',
    start: '2024-10-19',
    city: 'Brussels',
    country: 'BE',
    countryName: 'Belgium',
    website: 'https://www.collabdays.org/2024-belgium/'
  },
  {
    slug: 'scottish-summit-2024',
    name: 'Scottish Summit',
    start: '2024-10-17',
    end: '2024-10-19',
    city: 'Aberdeen',
    country: 'GB-SCT',
    countryName: 'Scotland',
    website: 'https://www.scottishsummit.com/'
  },
  {
    slug: 'nordic-summit-2024',
    name: 'Nordic Summit',
    start: '2024-09-27',
    end: '2024-09-28',
    city: 'Oslo',
    country: 'NO',
    countryName: 'Norway',
    website: 'https://www.nordicsummit.info/',
    slides: 'https://aka.ms/DL-NS24-Slides'
  },
  {
    slug: 'collabdays-hamburg-2024',
    name: 'CollabDays Hamburg',
    start: '2024-08-31',
    city: 'Hamburg',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://www.collabdays.org/2024-hamburg/',
    slides: '/slides/20240831-CollabDaysHam24.pdf'
  },
  {
    slug: 'azure-ai-lowlands-2024',
    name: 'Azure & AI Lowlands',
    start: '2024-06-26',
    city: 'Utrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://www.azurelowlands.com/',
    slides: 'https://aka.ms/DL-AzureAILowlands24-Slides'
  },
  {
    slug: 'eppc-2024',
    name: 'European Power Platform Conference',
    start: '2024-06-11',
    end: '2024-06-13',
    city: 'Brussels',
    country: 'BE',
    countryName: 'Belgium',
    website: 'https://www.sharepointeurope.com/european-power-platform-conference/'
  },
  {
    slug: 'resco-next-2024',
    name: 'Resco Next',
    start: '2024-06-04',
    end: '2024-06-06',
    city: 'Vienna',
    country: 'AT',
    countryName: 'Austria',
    website: 'https://resconext.com/'
  },
  {
    slug: 'dynamicsminds-2024',
    name: 'DynamicsMinds',
    start: '2024-05-26',
    end: '2024-05-29',
    city: 'Portorož',
    country: 'SI',
    countryName: 'Slovenia',
    website: 'https://www.dynamicsminds.com/'
  },
  {
    slug: 'build-2024',
    name: 'Microsoft Build',
    start: '2024-05-21',
    end: '2024-05-23',
    city: 'Seattle',
    country: 'US',
    countryName: 'United States',
    website: 'https://build.microsoft.com/'
  },
  {
    slug: 'ecs-2024',
    name: 'European Collaboration Summit',
    start: '2024-05-14',
    end: '2024-05-16',
    city: 'Wiesbaden',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://collabsummit.eu/'
  },
  {
    slug: 'diwug-2024',
    name: 'DIWUG',
    start: '2024-04-02',
    city: 'Barendrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website:
      'https://www.meetup.com/dutch-information-workers-user-group-diwug/events/299810236/',
    slides: 'https://aka.ms/DL-DIWUG24-Slides'
  },
  {
    slug: 'ai-tour-berlin-2024-03',
    name: 'Microsoft AI Tour Berlin',
    start: '2024-03-19',
    city: 'Berlin',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://msevents.microsoft.com/event?id=3085871691'
  },
  {
    slug: 'ai-tour-paris-2024-03',
    name: 'Microsoft AI Tour Paris',
    start: '2024-03-13',
    city: 'Paris',
    country: 'FR',
    countryName: 'France',
    website: 'https://msevents.microsoft.com/event?id=4006187193'
  },
  {
    slug: 'devworld-2024',
    name: 'DevWorld Conference',
    start: '2024-02-29',
    end: '2024-03-01',
    city: 'Amsterdam',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://devworldconference.com/',
    slides: 'https://aka.ms/DL-DevWorld-Slides'
  },
  {
    slug: 'gppb-2024',
    name: 'Global Power Platform Bootcamp',
    start: '2024-02-24',
    city: 'Waregem',
    country: 'BE',
    countryName: 'Belgium',
    website: 'https://ppbc.poweraddicts.be/',
    slides: 'https://aka.ms/DL-GPPB24-Slides'
  },
  {
    slug: 'm365-cd-miami-2024',
    name: 'Microsoft 365 Community Day Miami',
    start: '2024-02-02',
    city: 'Miami',
    country: 'US',
    countryName: 'United States',
    website: 'https://m365miami.com/'
  },

  // ── 2023 ────────────────────────────────────────────────────────────────────
  {
    slug: 'festive-tech-calendar-2023',
    name: 'Festive Tech Calendar',
    start: '2023-12-31',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online',
    website: 'https://festivetechcalendar.com/'
  },
  {
    slug: 'ignite-nl-2023',
    name: 'Ignite NL',
    start: '2023-12-19',
    city: 'Den Haag',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://pulse.microsoft.com/nl-nl/microsoft-ignite/'
  },
  {
    slug: 'collabdays-lisbon-2023',
    name: 'CollabDays Lisbon',
    start: '2023-11-25',
    city: 'Lisbon',
    country: 'PT',
    countryName: 'Portugal',
    website: 'https://www.collabdays.org/2023-lisbon/'
  },
  {
    slug: 'ignite-2023',
    name: 'Microsoft Ignite',
    start: '2023-11-14',
    end: '2023-11-17',
    city: 'Seattle',
    country: 'US',
    countryName: 'United States',
    website: 'https://ignite.microsoft.com/'
  },
  {
    slug: 'resco-next-2023',
    name: 'Resco.NEXT',
    start: '2023-10-24',
    end: '2023-10-25',
    city: 'Marbella',
    country: 'ES',
    countryName: 'Spain',
    website: 'https://resconext.com/'
  },
  {
    slug: 'collabdays-belgium-2023',
    name: 'CollabDays Belgium',
    start: '2023-10-21',
    city: 'Brussels',
    country: 'BE',
    countryName: 'Belgium',
    website: 'https://www.collabdays.org/2023-belgium/'
  },
  {
    slug: 'south-coast-summit-2023',
    name: 'South Coast Summit',
    start: '2023-10-13',
    end: '2023-10-14',
    city: 'Farnborough',
    country: 'GB',
    countryName: 'United Kingdom',
    website: 'https://www.southcoastsummit.com/'
  },
  {
    slug: 'mppc-2023',
    name: 'Microsoft Power Platform Conference',
    start: '2023-10-01',
    end: '2023-10-06',
    city: 'Las Vegas',
    country: 'US',
    countryName: 'United States',
    website: 'https://powerplatformconf.com/'
  },
  {
    slug: 'build-nl-2023',
    name: 'Microsoft Build Netherlands',
    start: '2023-09-27',
    city: 'Utrecht',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://msevents.microsoft.com/event?id=53725391'
  },
  {
    slug: 'nordic-summit-2023',
    name: 'Nordic Summit',
    start: '2023-09-23',
    city: 'Copenhagen',
    country: 'DK',
    countryName: 'Denmark',
    website: 'https://nordicsummit.info/'
  },
  {
    slug: 'scottish-summit-tour-2023',
    name: 'Scottish Summit on Tour',
    start: '2023-08-05',
    city: 'Manchester',
    country: 'GB',
    countryName: 'United Kingdom',
    website: 'https://www.scottishsummit.com/'
  },
  {
    slug: 'd365-cx-summit-2023',
    name: 'Dynamics 365 CX Summit',
    start: '2023-06-24',
    city: 'Brussels',
    country: 'BE',
    countryName: 'Belgium',
    website: 'https://d365cxsummit.powercommunity.com/'
  },
  {
    slug: 'eppc-2023',
    name: 'European Power Platform Conference',
    start: '2023-06-20',
    end: '2023-06-22',
    city: 'Dublin',
    country: 'IE',
    countryName: 'Ireland',
    website: 'https://www.sharepointeurope.com/european-power-platform-conference/'
  },
  {
    slug: 'ecs-2023',
    name: 'European Collaboration Summit',
    start: '2023-05-22',
    end: '2023-05-24',
    city: 'Düsseldorf',
    country: 'DE',
    countryName: 'Germany',
    website: 'https://www.collabsummit.eu/'
  },
  {
    slug: 'automation-summit-2023',
    name: 'Automation Summit',
    start: '2023-05-20',
    city: 'London',
    country: 'GB',
    countryName: 'United Kingdom',
    website: 'https://automationsummit.powercommunity.com/'
  },
  {
    slug: 'iberian-tech-summit-2023',
    name: 'Iberian Tech Summit',
    start: '2023-04-29',
    city: 'Olhão',
    country: 'PT',
    countryName: 'Portugal',
    website: 'https://iberiantechsummit.com/en/'
  },

  // ── 2022 ────────────────────────────────────────────────────────────────────
  {
    slug: 'espc-2022',
    name: 'European SharePoint Conference',
    start: '2022-11-28',
    end: '2022-12-01',
    city: 'Copenhagen',
    country: 'DK',
    countryName: 'Denmark',
    website: 'https://www.sharepointeurope.com/'
  },
  {
    slug: 'ignite-2022',
    name: 'Microsoft Ignite',
    start: '2022-10-14',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online',
    website:
      'https://ignite.microsoft.com/en-US/sessions/1d0792dd-3f20-4aa2-94d8-537d7d77d86d'
  },
  {
    slug: 'nordic-summit-2022',
    name: 'Nordic Summit',
    start: '2022-09-24',
    city: 'Stockholm',
    country: 'SE',
    countryName: 'Sweden',
    website: 'https://nordicsummit.info/'
  },
  {
    slug: 'collabdays-nl-2022',
    name: 'CollabDays Netherlands',
    start: '2022-09-10',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands',
    website: 'https://www.collabdays.org/2022-nl/'
  },
  {
    slug: 'scottish-summit-2022',
    name: 'Scottish Summit',
    start: '2022-06-10',
    city: 'Glasgow',
    country: 'GB-SCT',
    countryName: 'Scotland',
    website: 'https://scottishsummit.com/'
  },
  {
    slug: 'oslo-power-platform-2022',
    name: 'Oslo Power Platform and beyond',
    start: '2022-05-21',
    city: 'Oslo',
    country: 'NO',
    countryName: 'Norway',
    website: 'https://oslo-power-platform-and-beyond.sessionize.com/'
  },
  {
    slug: 'teams-nation-2022',
    name: 'Teams Nation',
    start: '2022-03-23',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online'
  },

  // ── 2021 ────────────────────────────────────────────────────────────────────
  {
    slug: 'collabdays-benl-2021',
    name: 'CollabDays Belgium & Netherlands',
    start: '2021-10-23',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online',
    website: 'https://www.collabdays.org/2021-benl'
  },

  // ── 2019 ────────────────────────────────────────────────────────────────────
  {
    slug: 'ignite-the-tour-paris-2019',
    name: 'Microsoft Ignite The Tour',
    start: '2019-11-13',
    city: 'Paris',
    country: 'FR',
    countryName: 'France'
  },
  {
    slug: 'sogeti-gouvieux-2019',
    name: 'Sogeti Gouvieux',
    start: '2019-11-02',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'power-saturday-2019',
    name: 'Power Saturday',
    start: '2019-06-15',
    city: 'Paris',
    country: 'FR',
    countryName: 'France'
  },
  {
    slug: 'd365-saturday-dubai-2019',
    name: 'D365 Saturday Dubai',
    start: '2019-04-13',
    city: 'Dubai',
    country: 'AE',
    countryName: 'United Arab Emirates'
  },
  {
    slug: 'sharepoint-saturday-warsaw-2019',
    name: 'SharePoint Saturday Warsaw',
    start: '2019-04-06',
    city: 'Warsaw',
    country: 'PL',
    countryName: 'Poland'
  },
  {
    slug: 'dutch-power-apps-flow-user-group-2019',
    name: 'Dutch Power Apps & Flow User Group',
    start: '2019-04-02',
    city: 'Amsterdam',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'd365-saturday-munich-2019',
    name: 'D365 Saturday Munich',
    start: '2019-03-09',
    city: 'Munich',
    country: 'DE',
    countryName: 'Germany'
  },
  {
    slug: 'd365-saturday-london-2019',
    name: 'Dynamics 365 Saturday London',
    start: '2019-01-19',
    city: 'London',
    country: 'GB-ENG',
    countryName: 'United Kingdom'
  },

  // ── 2018 ────────────────────────────────────────────────────────────────────
  {
    slug: 'd365-saturday-belgium-2018',
    name: 'D365 Saturday Belgium',
    start: '2018-11-17',
    city: 'Brussels',
    country: 'BE',
    countryName: 'Belgium'
  },
  {
    slug: 'sharepoint-saturday-lisbon-2018',
    name: 'SharePoint Saturday Lisbon',
    start: '2018-10-13',
    city: 'Lisbon',
    country: 'PT',
    countryName: 'Portugal'
  },
  {
    slug: 'sharepoint-saturday-cambridge-2018',
    name: 'SharePoint Saturday Cambridge',
    start: '2018-09-09',
    city: 'Cambridge',
    country: 'GB-ENG',
    countryName: 'United Kingdom'
  },
  {
    slug: 'sharepoint-saturday-stockholm-2018',
    name: 'SharePoint Saturday Stockholm',
    start: '2018-09-01',
    city: 'Stockholm',
    country: 'SE',
    countryName: 'Sweden'
  },
  {
    slug: 'dynamic-communities-webinar-2018',
    name: 'Dynamic Communities Webinar',
    start: '2018-07-17',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online'
  },
  {
    slug: 'sharepoint-saturday-netherlands-2018',
    name: 'SharePoint Saturday Netherlands',
    start: '2018-06-30',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'd365-saturday-amsterdam-2018',
    name: 'D365 Saturday Amsterdam',
    start: '2018-02-03',
    city: 'Amsterdam',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'sogeti-gouvieux-2018',
    name: 'Sogeti Gouvieux',
    start: '2018-01-27',
    city: 'Noordwijk',
    country: 'NL',
    countryName: 'The Netherlands'
  },

  // ── 2017 ────────────────────────────────────────────────────────────────────
  {
    slug: 'collab365-2017',
    name: 'Collab365',
    start: '2017-11-03',
    online: true,
    city: 'Online',
    country: 'ZZ',
    countryName: 'Online'
  },
  {
    slug: 'techdays-nl-2017',
    name: 'TechDays NL',
    start: '2017-10-11',
    city: 'The Hague',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'sharepoint-saturday-cambridge-2017',
    name: 'SharePoint Saturday Cambridge',
    start: '2017-09-09',
    city: 'Cambridge',
    country: 'GB-ENG',
    countryName: 'United Kingdom'
  },
  {
    slug: 'power-bi-world-tour-2017',
    name: 'Power BI World Tour',
    start: '2017-08-28',
    city: 'Copenhagen',
    country: 'DK',
    countryName: 'Denmark'
  },
  {
    slug: 'sharepoint-saturday-london-2017',
    name: 'SharePoint Saturday London',
    start: '2017-06-24',
    city: 'London',
    country: 'GB-ENG',
    countryName: 'United Kingdom'
  },
  {
    slug: 'sogeti-pizzasessie-2017-03',
    name: 'Sogeti Office 365 Pizzasessie',
    start: '2017-03-30',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  },

  // ── 2016 ────────────────────────────────────────────────────────────────────
  {
    slug: 'techdays-nl-2016',
    name: 'TechDays NL',
    start: '2016-10-04',
    city: 'Amsterdam',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'sogeti-pizzasessie-2016-09',
    name: 'Sogeti Office 365 Pizzasessie',
    start: '2016-09-14',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'sogeti-pizzasessie-2016-06',
    name: 'Sogeti Office 365 Pizzasessie',
    start: '2016-06-21',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'sogeti-pizzasessie-2016-04',
    name: 'Sogeti Office 365 Pizzasessie',
    start: '2016-04-12',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  },
  {
    slug: 'sogeti-pizzasessie-2016-03',
    name: 'Sogeti Office 365 Pizzasessie',
    start: '2016-03-09',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  },

  // ── 2015 ────────────────────────────────────────────────────────────────────
  {
    slug: 'sogeti-pizzasessie-2015-11',
    name: 'Sogeti Office 365 Pizzasessie',
    start: '2015-11-24',
    city: 'Vianen',
    country: 'NL',
    countryName: 'The Netherlands'
  }
]

const eventBySlug = new Map(events.map((e) => [e.slug, e]))

export function getEvent(slug: string): EventRecord | undefined {
  return eventBySlug.get(slug)
}

/**
 * An event counts as past only once its final day has ended, so a multi-day
 * conference stays "upcoming" while you are standing in it.
 */
export function isUpcoming(event: EventRecord, now: Date = new Date()): boolean {
  const last = new Date(`${event.end ?? event.start}T23:59:59`)
  return last.getTime() >= now.getTime()
}

/**
 * True once the event's first day has begun. Handouts are for people in the
 * room, so nothing should link to them weeks before the doors open.
 */
export function hasStarted(event: EventRecord, now: Date = new Date()): boolean {
  return new Date(`${event.start}T00:00:00`).getTime() <= now.getTime()
}

export function upcomingEvents(now: Date = new Date()): EventRecord[] {
  return events
    .filter((e) => isUpcoming(e, now))
    .sort((a, b) => a.start.localeCompare(b.start))
}

export function pastEvents(now: Date = new Date()): EventRecord[] {
  return events
    .filter((e) => !isUpcoming(e, now))
    .sort((a, b) => b.start.localeCompare(a.start))
}

/** Distinct physical countries. Online outings have no country and are excluded. */
export function countryCount(): number {
  return new Set(events.filter((e) => !e.online).map((e) => e.country)).size
}

export function eventCount(): number {
  return events.length
}

/** The first year on the list, which is also the year he started speaking. */
export function firstYear(): number {
  return events.reduce(
    (min, e) => Math.min(min, Number(e.start.slice(0, 4))),
    Number.POSITIVE_INFINITY
  )
}
