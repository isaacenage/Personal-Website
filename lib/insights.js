/**
 * byZenterra Insights — article registry.
 *
 * To publish a new article, add an object to the ARTICLES array below.
 * The site is statically exported, so every article listed here gets its
 * own page at /insights/<slug>/ at build time — no other wiring needed.
 *
 * Article shape:
 *   slug      URL-safe identifier, e.g. 'field-notes-on-parcel-mapping'
 *   title     Display title
 *   category  Short label shown on the card, e.g. 'GIS', 'Data', 'Web'
 *   date      ISO date string 'YYYY-MM-DD' (index sorts newest first)
 *   author    Byline
 *   readTime  e.g. '4 min read'
 *   excerpt   One or two sentences for the index card
 *   body      Ordered content blocks:
 *               { type: 'p',     text: '…' }          paragraph
 *               { type: 'h2',    text: '…' }          section heading
 *               { type: 'ul',    items: ['…', '…'] }  bullet list
 *               { type: 'quote', text: '…' }          pull quote
 */

const ARTICLES = [
  {
    slug: 'welcome-to-byzenterra-insights',
    title: 'Welcome to byZenterra Insights',
    category: 'Studio Notes',
    date: '2026-07-10',
    author: 'Isaac Enage',
    readTime: '2 min read',
    excerpt:
      'Why we are opening a public notebook — and what you can expect to find here as the studio maps, measures, and builds.',
    body: [
      {
        type: 'p',
        text: 'Most of what a studio learns never leaves the project folder. Workflows get refined, datasets get wrangled, and hard-won lessons stay buried in delivery decks. Insights is our attempt to change that — a public notebook where byZenterra writes down what we learn while working with spatial data, analytics, and the web.',
      },
      { type: 'h2', text: 'What to expect' },
      {
        type: 'ul',
        items: [
          'Field notes from real GIS work — parcel mapping, land acquisition support, and web mapping in the Philippine context.',
          'Practical walkthroughs of the tools we use, from ArcGIS and QGIS to Power BI, Leaflet, and modern web stacks.',
          'Opinions on where geospatial technology is heading, and what that means for the organizations that depend on it.',
        ],
      },
      {
        type: 'quote',
        text: 'Maps are arguments about the world. We want to show our work.',
      },
      {
        type: 'p',
        text: 'Articles here are written by the people doing the work — no ghostwriting, no filler. If a topic here matters to your team, or you want us to dig into something specific, reach out through the contact form. We read everything.',
      },
    ],
  },
]

/** All articles, newest first. Returns a new array — ARTICLES stays untouched. */
export function getAllInsights() {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** The n most recent articles (for teasers). */
export function getLatestInsights(n = 3) {
  return getAllInsights().slice(0, n)
}

/** A single article by slug, or null. */
export function getInsight(slug) {
  return ARTICLES.find((article) => article.slug === slug) ?? null
}

/** '2026-07-10' → 'July 10, 2026' (fixed locale so SSG output is stable). */
export function formatInsightDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
