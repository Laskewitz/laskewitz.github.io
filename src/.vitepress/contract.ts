/**
 * The direction contract, emitted into every built page.
 *
 * Vue's production compiler strips comments out of templates, so the contract
 * is injected at the HTML level instead. It ships with the markup so the
 * decision behind the design is readable from the artifact itself.
 */
export const DIRECTION_CONTRACT = `<!--
  DIRECTION CONTRACT — Wayfinding · seed 8b56bdc1 · candidate 3

  THESIS       The site is the venue and every page is a sign. It refuses the
               developer-advocate arrangement (portrait, bio line, three feature
               cards, gradient hero, timeline) and equally refuses the editorial
               broadsheet alternative.

  OWN-WORLD    Conference environmental graphics: matte vinyl colour fields,
               optic-white cut lettering, oversized directional arrows,
               hall-letter tiles, full-bleed hanging-banner photography.
               Recognisable with every word of content removed.

  STORY        The attendee sees one arrow-led row and taps it. The organiser
               reads the directory, sees the record, and knows how to reach him.
               Nobody has to read a paragraph to act.

  FIRST VIEW   Full-bleed near-black. LASKEWITZ cut in optic white at venue
               scale. Beneath it the directory as full-width signage rows, each
               with a hall-colour tab, a real count and a terminal arrow. Along
               the bottom edge an illuminated NEXT strip in the next event's
               hall colour.

  FORM         Staging: converging-pair, used only where literally true — the
               session placard, where two speaker plates on one baseline merge
               into a single billed block.

  RULE         Hall colours are field colours carrying white or black text.
               Never small hall-coloured text on the substrate.
-->`
