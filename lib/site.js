/* Single source for company facts and page content. Edit here, every page
   reads from it. */

import { getTopics } from './blog'

export const COMPANY = {
  brand: 'byZenterra',
  legalName: 'Zenterra Systems Solutions',
  registration: 'Registered with the Department of Trade and Industry (DTI), Philippines',
  email: 'zenterrasystemssolutions@gmail.com',
  domain: 'byzenterra.org',
  url: 'https://byzenterra.org',
  portal: 'https://gis.byzenterra.org',
  location: 'Philippines',
  summary:
    'GIS, data analytics and web engineering for organizations that run on location data.',
}

const PH = '/assets/images/photos'

/* Wikimedia Commons photographs, all CC BY-SA 4.0: each needs its credit,
   which the footer prints. */
export const PHOTOS = {
  pasig: {
    src: `${PH}/pasig-river-dusk.webp`,
    alt: 'The Pasig River winding through Metro Manila at dusk, with the BGC skyline behind',
    credit: 'Patrickroque01',
    href: 'https://commons.wikimedia.org/wiki/File:Pasig_River,_West_Rembo,_BGC,_Pineda_drone_dusk_(Pasig_City;_12-31-2025).jpg',
  },
  metro: {
    src: `${PH}/metro-manila-from-air.webp`,
    alt: 'Central Metro Manila seen from an airplane, the Pasig River cutting through the city grid',
    credit: 'Patrickroque01',
    href: 'https://commons.wikimedia.org/wiki/File:Central_Metro_Manila,_Pasig_River,_EDSA_from_air_(Manila;_04-22-2024).jpg',
  },
  batad: {
    src: `${PH}/batad-rice-terraces.webp`,
    alt: 'The Batad rice terraces in Ifugao, with the village at their centre',
    credit: 'CEphoto, Uwe Aranas',
    href: 'https://commons.wikimedia.org/wiki/File:Banaue_Philippines_Batad-Rice-Terraces-02.jpg',
  },
  marikina: {
    src: `${PH}/marikina-river.webp`,
    alt: 'The Marikina River and its floodplain in Pasig, seen from above',
    credit: 'Patrickroque01',
    href: 'https://commons.wikimedia.org/wiki/File:Marikina_River_aerial,_Pasig_area_(pasig;_03-01-2022).jpg',
  },
}

/* Which photograph fills the frame on each route; routes not listed get the
   petrol field. */
export const ROUTE_PHOTO = {
  '/': 'pasig',
  '/services': 'metro',
  '/about': 'batad',
  '/contact': 'marikina',
}

export const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
]

/* Work groups; each has its own page at /work/<key>/. */
export const WORK_GROUPS = {
  commissions: { label: 'Commissions', kind: 'Commission', lead: 'Websites and web apps built for paying clients.' },
  'open-source': { label: 'Open source', kind: 'Open source', lead: 'Free QGIS plugins and data tools anyone can use.' },
  'data-viz': { label: 'Data viz', kind: 'Data viz', lead: 'Public records turned into maps and dashboards.' },
  'side-projects': { label: 'Side projects', kind: 'Side project', lead: 'Things we built because we wanted them to exist.' },
}

/* Site map. The rail switches between sections; the notch switches between
   the pages inside the current one. */
export const SECTIONS = [
  {
    href: '/',
    label: 'Home',
    pages: [
      { href: '/', label: 'Overview' },
      { href: '/highlights', label: 'Highlights' },
      { href: '/open-data', label: 'Open data' },
    ],
  },
  {
    href: '/work',
    label: 'Work',
    pages: [
      { href: '/work', label: 'All' },
      ...Object.entries(WORK_GROUPS).map(([key, g]) => ({ href: `/work/${key}`, label: g.label })),
    ],
  },
  {
    href: '/services',
    label: 'Services',
    pages: [
      { href: '/services', label: 'Service lines' },
      { href: '/services/process', label: 'Process' },
      { href: '/services/stack', label: 'Tech stack' },
    ],
  },
  {
    href: '/pricing',
    label: 'Pricing',
    pages: [
      { href: '/pricing', label: 'Packages' },
      { href: '/pricing/faq', label: 'FAQ' },
    ],
  },
  {
    href: '/about',
    label: 'About',
    pages: [
      { href: '/about', label: 'Who we are' },
      { href: '/about/values', label: 'Values' },
      { href: '/about/industries', label: 'Industries' },
      { href: '/about/company', label: 'Company' },
    ],
  },
  {
    href: '/insights',
    label: 'Insights',
    pages: [
      { href: '/insights', label: 'All' },
      ...getTopics().map((t) => ({ href: `/insights/topic/${t.slug}`, label: t.label })),
    ],
  },
  { href: '/contact', label: 'Contact', pages: [{ href: '/contact', label: 'Start a project' }] },
]

// trailingSlash is on in next.config.js, so normalize before comparing.
export const routeOf = (pathname) => pathname.replace(/\/+$/, '') || '/'

/* The section a route belongs to: one listing it as a page, else the one
   whose path it sits under (an article sits under Insights). */
export const sectionOf = (route) =>
  SECTIONS.find((s) => s.pages.some((p) => p.href === route)) ??
  SECTIONS.find((s) => s.href !== '/' && route.startsWith(`${s.href}/`))

export const SERVICES = [
  {
    slug: 'web-mapping',
    title: 'Interactive web mapping',
    short: 'Browser maps with custom layers, search and live data.',
    body: 'Rich, browser-based maps built with ArcGIS Online, Leaflet and Mapbox GL JS: fluid navigation, custom layers and real-time updates your public or internal users can open on any device.',
    deliverables: ['Public and internal web maps', 'Live data feeds', 'Custom basemaps and styling'],
  },
  {
    slug: 'geospatial-analysis',
    title: 'Geospatial analysis',
    short: 'Parcel mapping, spatial statistics and location intelligence.',
    body: 'GIS workflows that turn spatial data into decisions: parcel and cadastral mapping, land acquisition support, hazard and suitability analysis, and location intelligence for planning and asset management.',
    deliverables: ['Parcel and right-of-way mapping', 'Hazard and suitability studies', 'Cartographic outputs'],
  },
  {
    slug: 'dashboards',
    title: 'Dashboards and reporting',
    short: 'Power BI and Tableau dashboards stakeholders actually use.',
    body: 'Clean dashboards in Power BI and Tableau that turn raw records into figures your stakeholders can track, filter and act on, with the data model documented so your team can maintain it.',
    deliverables: ['Executive dashboards', 'Data models and refresh pipelines', 'Report templates'],
  },
  {
    slug: 'web-development',
    title: 'Web design and development',
    short: 'Fast company sites, internal systems and web applications.',
    body: 'Responsive, fast-loading websites and web applications: company sites, internal systems, map viewers and SaaS tools, built on modern stacks and handed over with documentation.',
    deliverables: ['Company websites', 'Web applications', 'Hosting and domain setup'],
  },
  {
    slug: 'automation',
    title: 'Workflow automation',
    short: 'SharePoint, Power Automate and Power Apps for routine work.',
    body: 'Repetitive tasks streamlined with SharePoint, Power Automate and custom Power Apps: cleaner field data collection, fewer spreadsheets passed around by email, better collaboration.',
    deliverables: ['Data collection apps', 'Approval and reporting flows', 'SharePoint structure'],
  },
  {
    slug: 'visual-assets',
    title: 'Creative and visual assets',
    short: 'Infographics, map layouts and print-ready graphics.',
    body: 'Infographics, map layouts, digital illustrations and print-ready assets made in Illustrator and Photoshop, for reports, presentations, web and social.',
    deliverables: ['Map layouts for print', 'Infographics', 'Brand-aligned graphics'],
  },
]

export const ORG_TYPES = ['Company', 'LGU', 'Government agency', 'Nonprofit', 'University']
export const TIMELINES = ['This month', 'In 3 months', 'This year', 'Exploring']

export const PROCESS = [
  {
    title: 'Discover',
    body: 'We start with your data and the decisions it must support. You receive a scoped plan and a fixed quote before any work begins.',
  },
  {
    title: 'Build',
    body: 'Maps, dashboards and applications take shape in short, reviewable increments, so you can steer while changes are still cheap.',
  },
  {
    title: 'Hand over',
    body: 'Every project ships with documentation, a handover session and post-launch support, so your team owns what we built.',
  },
]

export const SECTORS = [
  { title: 'Real estate and land development', body: 'Parcel mapping, land banking support and title plotting.' },
  { title: 'Renewable energy', body: 'Land acquisition and right-of-way mapping for project sites.' },
  { title: 'Telecommunications', body: 'Demand mapping and facility coverage analysis.' },
  { title: 'Local government and civic groups', body: 'Hazard maps, public dashboards and open data.' },
]

export const VALUES = [
  { title: 'Precision', body: 'We check coordinate systems, sources and validation so the decisions built on our work hold up.' },
  { title: 'Clarity', body: 'A map succeeds when a non-specialist can act on it. We design for the decision, not the demo.' },
  { title: 'Craft', body: 'Clean code, fast pages and interfaces that still work long after handover.' },
  { title: 'Partnership', body: 'Plain-language updates, honest scoping and tools your people can maintain.' },
  { title: 'Openness', body: 'We publish open geospatial data and default to open standards and formats.' },
  { title: 'Stewardship', body: 'We treat Philippine spatial data as shared infrastructure and handle it responsibly.' },
]

/* The tools behind the service lines. */
export const STACK = [
  { title: 'GIS and analysis', body: 'ArcGIS, QGIS' },
  { title: 'Web mapping', body: 'ArcGIS Online, Leaflet, Mapbox GL JS' },
  { title: 'Dashboards', body: 'Power BI, Tableau' },
  { title: 'Automation', body: 'SharePoint, Power Automate, Power Apps' },
  { title: 'Web development', body: 'Modern web frameworks, hosting and domain setup' },
  { title: 'Design', body: 'Illustrator, Photoshop' },
]

/* What every engagement comes with, whatever the tier. */
export const INCLUDED = [
  'A written scope and fixed quote before work starts',
  'Reviewable increments while we build',
  'Documentation and a handover session',
  'Post-launch support',
]

const IMG = '/assets/images/latest-portfolio'

export const WORK = [
  { group: 'commissions', title: "Joe's Commercial Cleaning", category: 'Client website', image: `${IMG}/joescleaning.webp`, preview: `${IMG}/mockups/joescleaning.webp`, link: 'https://joescommercialcleaningservices.ca/' },
  { group: 'commissions', title: 'J&J Spotless Cleaning', category: 'Client website', image: `${IMG}/jjspotless.webp`, preview: `${IMG}/mockups/jjspotless.webp`, link: '/jjspotless/' },
  { group: 'commissions', title: 'Parada', category: 'Parking lot booking web app', image: `${IMG}/parada.webp`, preview: `${IMG}/mockups/parada.webp`, link: 'https://parada.byzenterra.org' },
  { group: 'open-source', title: 'Title Plotter PH', category: 'Land title plotting tool', image: `${IMG}/titleplotter.webp`, preview: `${IMG}/mockups/titleplotter.webp`, link: 'https://plugins.qgis.org/plugins/titleplotter/#plugin-about' },
  { group: 'open-source', title: 'QGIS Dashboard', category: 'Interactive dashboard plugin', image: `${IMG}/qgisdashboard.webp`, preview: `${IMG}/mockups/qgisdashboard.webp`, link: 'http://plugins.qgis.org/plugins/qgis_dashboards/' },
  { group: 'open-source', title: 'PH Geospatial Downloader', category: 'Open geodata portal', image: `${IMG}/geodata.webp`, preview: `${IMG}/mockups/geodata.webp`, link: 'https://gis.byzenterra.org' },
  { group: 'data-viz', title: 'War on Drugs', category: 'Incident dashboard', image: `${IMG}/warondrugs.byzenterra.org_.webp`, preview: `${IMG}/mockups/warondrugs.webp`, link: 'https://warondrugs.byzenterra.org' },
  { group: 'data-viz', title: 'Eleksyon', category: 'Election map', image: `${IMG}/eleksyon.webp`, preview: `${IMG}/mockups/eleksyon.webp`, link: '/mapaleksyon/' },
  { group: 'side-projects', title: 'Anu Na, Meralco?', category: 'Live brownout map', image: `${IMG}/anunameralco.webp`, preview: `${IMG}/mockups/anunameralco.webp`, link: 'https://anunameralco.byzenterra.org' },
  { group: 'side-projects', title: 'Pasig Sagip', category: 'Multi-hazard map', image: `${IMG}/pasigsagip.webp`, preview: `${IMG}/mockups/pasigsagip.webp`, link: 'https://portfolio.byzenterra.org/works/pasig-sagip' },
  { group: 'side-projects', title: 'UPD Cartography', category: 'Public web map', image: `${IMG}/UPDCr.webp`, preview: `${IMG}/mockups/updcartography.webp`, link: 'https://hanapbidet-upd.vercel.app/' },
  { group: 'side-projects', title: 'The Arcade Gazette', category: 'Browser games', image: `${IMG}/arcadegazette.webp`, preview: `${IMG}/mockups/arcadegazette.webp`, link: 'https://games.byzenterra.org' },
  { group: 'side-projects', title: 'Text2Logo', category: 'Logo design tool', image: `${IMG}/text2logo.webp`, preview: `${IMG}/mockups/text2logo.webp`, link: 'https://textlogo.byzenterra.org' },
]

/* `preview` is the monitor + phone mockup shown large on the Work page. */

/* Shown on the home page and Highlights. */
export const FEATURED = [
  'Anu Na, Meralco?',
  'Pasig Sagip',
  'PH Geospatial Downloader',
  'QGIS Dashboard',
  "Joe's Commercial Cleaning",
  'UPD Cartography',
].map((title) => WORK.find((w) => w.title === title))

export const TIERS = [
  {
    name: 'Static website',
    price: '₱80,000 to ₱100,000',
    fit: 'Company profiles, landing pages and blogs.',
    features: ['Responsive design', 'Up to a handful of pages', 'No backend to maintain'],
  },
  {
    name: 'Dynamic website',
    price: '₱100,000 to ₱150,000',
    fit: 'CMS sites, map viewers and interactive dashboards.',
    features: ['API and data integration', 'Interactive interface', 'Light backend'],
    featured: true,
  },
  {
    name: 'Web application',
    price: '₱150,000 to ₱500,000',
    fit: 'GIS web apps, SaaS tools and management systems.',
    features: ['User accounts and roles', 'Database integration', 'Complex frontend logic'],
  },
  {
    name: 'Enterprise system',
    price: 'Custom quote',
    fit: 'Multi-user platforms that must scale.',
    features: ['Scalable architecture', 'Security review', 'CI/CD pipelines'],
    note: 'Scoped with your IT team around your database and cloud setup.',
  },
]

export const FAQ = [
  {
    q: 'How is a project priced?',
    a: 'After a discovery call we send a written scope and a fixed quote. The tiers on this page show typical ranges; your quote depends on data, integrations and timeline.',
  },
  {
    q: 'Do you work with government offices?',
    a: 'Yes. We work with local government units, institutions and civic groups on maps, dashboards and open data.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes post-launch support, documentation and a handover session. Ongoing maintenance and hosting can be arranged separately.',
  },
  {
    q: 'What tools do you work with?',
    a: 'ArcGIS, QGIS, Leaflet, Mapbox, Power BI, Tableau, the Microsoft Power Platform and modern web frameworks. We fit the stack your team already uses.',
  },
]
