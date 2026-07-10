/**
 * byZenterra Blogs — post registry.
 *
 * To publish a new post, add an object to the POSTS array below.
 * The site is statically exported, so every post listed here gets its
 * own page at /blogs/<slug>/ at build time — no other wiring needed.
 *
 * Post shape:
 *   slug      URL-safe identifier, e.g. 'field-notes-on-parcel-mapping'
 *   title     Display title
 *   category  Short label shown on the card, e.g. 'GIS', 'Open Data', 'Web'
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

const POSTS = [
  {
    slug: 'opening-philippine-geodata',
    title: 'Why We Opened Our Geospatial Data to Everyone',
    category: 'Open Data',
    date: '2026-07-11',
    author: 'Isaac Enage',
    readTime: '3 min read',
    excerpt:
      'gis.byzenterra.org is our answer to a question we kept hearing on every project: why is Philippine geospatial data so hard to get?',
    body: [
      {
        type: 'p',
        text: 'Every mapping project in the Philippines begins the same way: hunting for data. Administrative boundaries live in one agency, hazard layers in another, and half of what you find is outdated, undocumented, or locked in a format nobody can open. Teams spend their first weeks not analyzing — just gathering.',
      },
      {
        type: 'p',
        text: 'gis.byzenterra.org is our standing answer to that problem. It is an open portal where we publish geospatial datasets — cleaned, documented, and free for anyone to use. Students, LGU planners, researchers, startups: if spatial data can help you decide something, it should not be behind a gate.',
      },
      { type: 'h2', text: 'What openness means to us' },
      {
        type: 'ul',
        items: [
          'Data ships with documentation — sources, coordinate systems, and known limitations stated up front.',
          'Formats stay open: GeoJSON, GeoPackage, and other standards any modern tool can read.',
          'Credit flows to the original producers of the data, always.',
        ],
      },
      {
        type: 'quote',
        text: 'Spatial data is infrastructure. Nobody should have to negotiate access to a road.',
      },
      {
        type: 'p',
        text: 'The portal grows as we do — every commercial engagement byZenterra takes on helps sustain the time we spend curating and publishing open layers. If you have a dataset that deserves a public home, or want to partner on coverage, reach out. This is a long project, and it is better done together.',
      },
    ],
  },
  {
    slug: 'welcome-to-byzenterra-insights',
    title: 'Welcome to the byZenterra Blog',
    category: 'Studio Notes',
    date: '2026-07-10',
    author: 'Isaac Enage',
    readTime: '2 min read',
    excerpt:
      'Why we are opening a public notebook — and what you can expect to find here as the firm maps, measures, and builds.',
    body: [
      {
        type: 'p',
        text: 'Most of what a firm learns never leaves the project folder. Workflows get refined, datasets get wrangled, and hard-won lessons stay buried in delivery decks. This blog is our attempt to change that — a public notebook where byZenterra writes down what we learn while working with spatial data, analytics, and the web.',
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
        text: 'Posts here are written by the people doing the work — no ghostwriting, no filler. If a topic here matters to your team, or you want us to dig into something specific, reach out through the contact form. We read everything.',
      },
    ],
  },
]

/** All posts, newest first. Returns a new array — POSTS stays untouched. */
export function getAllPosts() {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** The n most recent posts (for teasers). */
export function getLatestPosts(n = 3) {
  return getAllPosts().slice(0, n)
}

/** A single post by slug, or null. */
export function getPost(slug) {
  return POSTS.find((post) => post.slug === slug) ?? null
}

/** '2026-07-10' → 'July 10, 2026' (fixed locale so SSG output is stable). */
export function formatPostDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
