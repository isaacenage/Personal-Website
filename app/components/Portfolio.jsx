'use client'

import dynamic from 'next/dynamic'
import { useWorkCategory } from './work-category'

/* three/R3F only load when this page's chunk needs them; the placeholder
   fills the fullscreen stage so nothing shifts when the canvas mounts */
const StellarWorkGallery = dynamic(
  () => import('@/components/ui/3d-image-gallery').then((m) => m.StellarWorkGallery),
  {
    ssr: false,
    loading: () => <div style={{ height: '100%' }} />,
  }
)

/* Every work links to a live URL — the old public/Portfolio HTML pages are
   gone, so nothing here may point at a local /Portfolio/ route. */
const portfolioData = {
  maps: [
    {
      id: 1,
      title: 'UPD Cartography',
      category: 'Public Webmap',
      image: '/assets/images/latest-portfolio/UPDCr.webp',
      link: 'https://hanapbidet-upd.vercel.app/',
    },
    {
      id: 2,
      title: 'Anu Na, Meralco?',
      category: 'Live Brownout Map',
      image: '/assets/images/latest-portfolio/anunameralco.jpg',
      link: 'https://anunameralco.byzenterra.org',
    },
    {
      id: 3,
      title: 'Impeach Sara Duterte',
      category: 'Provincial Signature Map',
      image: '/assets/images/latest-portfolio/impeachsara.byzenterra.org_.png',
      link: 'https://impeachsara.byzenterra.org',
    },
    {
      id: 4,
      title: 'War on Drugs',
      category: 'EJK Dashboard',
      image: '/assets/images/latest-portfolio/warondrugs.byzenterra.org_.png',
      link: 'https://warondrugs.byzenterra.org',
    },
    {
      id: 5,
      title: 'Pasig Sagip',
      category: 'Multi-Hazard Map',
      image: '/assets/images/latest-portfolio/pasigsagip.jpg',
      link: 'https://portfolio.byzenterra.org/works/pasig-sagip',
    },
    {
      id: 6,
      title: 'Landslide Risk Assessment',
      category: 'Undergraduate Thesis',
      image: '/assets/images/latest-portfolio/landsliderisk.jpg',
      link: 'https://portfolio.byzenterra.org/works/undergraduate-thesis',
    },
  ],
  websites: [
    {
      id: 1,
      title: 'The Arcade Gazette',
      category: 'Browser Games',
      image: '/assets/images/latest-portfolio/arcadegazette.jpg',
      link: 'https://games.byzenterra.org',
    },
    {
      id: 2,
      title: 'byZenterra Portfolio',
      category: 'GIS Portfolio',
      image: '/assets/images/latest-portfolio/portfolio.byzenterra.org_.png',
      link: 'https://portfolio.byzenterra.org',
    },
    {
      id: 3,
      title: "Joe's Commercial Cleaning",
      category: 'Client Website',
      image: '/assets/images/latest-portfolio/joescleaning.jpg',
      link: 'https://joescommercialcleaningservices.ca/',
    },
    {
      id: 4,
      title: 'J&J Spotless Cleaning',
      category: 'Client Website',
      image: '/assets/images/latest-portfolio/jjspotless.jpg',
      link: 'https://jjspotless.vercel.app/',
    },
  ],
  tools: [
    {
      id: 1,
      title: 'Title Plotter PH',
      category: 'Tools',
      image: '/assets/images/latest-portfolio/tpph.webp',
      link: '/Tools/titleplotterph',
    },
    {
      id: 2,
      title: 'PH Geospatial Downloader',
      category: 'Open Geodata Tool',
      image: '/assets/images/latest-portfolio/geodata.jpg',
      link: 'https://gis.byzenterra.org',
    },
    {
      id: 3,
      title: 'QGIS Plugins',
      category: 'Open-Source Plugins',
      image: '/assets/images/latest-portfolio/qgisplugins.jpg',
      link: 'https://qgis.byzenterra.org',
    },
    {
      id: 4,
      title: 'Text2Logo',
      category: 'Logo Design Tool',
      image: '/assets/images/latest-portfolio/text2logo.jpg',
      link: 'https://textlogo.byzenterra.org',
    },
  ],
}

/* "All" merges every group; ids are namespaced because the gallery uses them
   as React keys and each group numbers its items from 1 */
const allItems = Object.entries(portfolioData).flatMap(([group, items]) =>
  items.map((item) => ({ ...item, id: `${group}-${item.id}` }))
)

const Portfolio = () => {
  /* driven by the Category dropdown in the header (see work-category.js) */
  const activeCategory = useWorkCategory()
  const items = activeCategory === 'all' ? allItems : portfolioData[activeCategory]

  return (
    /* fullscreen stage: the gallery fills the viewport and the fixed header
       (z 100) floats above it */
    <section className="cosmic-work-stage" id="portfolio">
      <StellarWorkGallery key={activeCategory} items={items} />
    </section>
  )
}

export default Portfolio
