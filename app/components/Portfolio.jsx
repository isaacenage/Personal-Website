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

const portfolioData = {
  maps: [
    {
      id: 1,
      title: 'Landslide Susceptibility Mapping',
      category: 'Undergraduate Thesis',
      image: '/assets/images/latest-portfolio/LandslideSusceptibilityMap.webp',
      link: '/Portfolio/UndergraduateThesis',
    },
    {
      id: 2,
      title: 'UPD Cartography',
      category: 'Public Webmap',
      image: '/assets/images/latest-portfolio/UPDCr.webp',
      link: '/Portfolio/UPDCRtography',
    },
    {
      id: 3,
      title: 'EleksyonPH',
      category: 'Election Map',
      image: '/assets/images/latest-portfolio/eleksyon.webp',
      link: '/Portfolio/EleksyonPH',
    },
    {
      id: 4,
      title: 'BDDRRMIS Demo',
      category: 'Demo WebGIS Application',
      image: '/assets/images/latest-portfolio/bddrrmis.webp',
      link: '/Portfolio/bddrmis',
    },
    {
      id: 5,
      title: 'Anu Na, Meralco?',
      category: 'Live Brownout Map',
      image: '/assets/images/latest-portfolio/anunameralco.jpg',
      link: 'https://anunameralco.byzenterra.org',
    },
    {
      id: 6,
      title: 'Impeach Sara Duterte',
      category: 'Provincial Signature Map',
      image: '/assets/images/latest-portfolio/impeachsara.jpg',
      link: 'https://impeachsara.byzenterra.org',
    },
    {
      id: 7,
      title: 'War on Drugs',
      category: 'EJK Dashboard',
      image: '/assets/images/latest-portfolio/ejkmap.jpg',
      link: 'https://warondrugs.byzenterra.org',
    },
  ],
  websites: [
    {
      id: 1,
      title: "Joe's Commercial Cleaning",
      category: 'Web Development',
      image: '/assets/images/latest-portfolio/joes.webp',
      link: '/Portfolio/JoesCommercialCleaning',
    },
    {
      id: 2,
      title: 'JJ Spotless',
      category: 'Web Development',
      image: '/assets/images/latest-portfolio/jj.webp',
      link: '/Portfolio/JJSpotless',
    },
    {
      id: 3,
      title: 'Wedding Planner',
      category: 'Web Development',
      image: '/assets/images/latest-portfolio/wed.webp',
      link: 'https://weddingdashboard.isaacenage.xyz/',
    },
    {
      id: 4,
      title: 'OSP Map Demo',
      category: 'Demo Web Application',
      image: '/assets/images/latest-portfolio/OSPMapDemo.webp',
      link: '/Portfolio/OSPMapDemo',
    },
    {
      id: 5,
      title: 'Aera',
      category: 'Web Application',
      image: '/assets/images/latest-portfolio/Aera.webp',
      link: '/Portfolio/Aera',
    },
    {
      id: 6,
      title: 'AeraLink',
      category: 'Web Application',
      image: '/assets/images/latest-portfolio/AeraLink.webp',
      link: '/Portfolio/AeraLink',
    },
    {
      id: 7,
      title: 'The Arcade Gazette',
      category: 'Browser Games',
      image: '/assets/images/latest-portfolio/arcadegazette.jpg',
      link: 'https://games.byzenterra.org',
    },
    {
      id: 8,
      title: 'Andrea & Isaac',
      category: 'Wedding Invitation',
      image: '/assets/images/latest-portfolio/invitation.jpg',
      link: 'https://invitation.byzenterra.org',
    },
    {
      id: 9,
      title: 'byZenterra Portfolio',
      category: 'GIS Portfolio',
      image: '/assets/images/latest-portfolio/zenterraportfolio.jpg',
      link: 'https://portfolio.byzenterra.org',
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
  analytics: [
    {
      id: 1,
      title: 'Aera Dashboard',
      category: 'Corporate Project',
      image: '/assets/images/latest-portfolio/Dash.jpg',
      link: '/Portfolio/AeraDashboard',
    },
    {
      id: 2,
      title: 'Ayala Dashboard',
      category: 'Corporate Project',
      image: '/assets/images/latest-portfolio/Dash1.jpg',
      link: '/Portfolio/AyalaDashboard',
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
