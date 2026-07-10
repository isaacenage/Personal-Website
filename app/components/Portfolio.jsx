'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'

/* three/R3F only load when the homepage chunk needs them; the placeholder
   matches the gallery height so the section doesn't shift when it mounts */
const StellarWorkGallery = dynamic(
  () => import('@/components/ui/3d-image-gallery').then((m) => m.StellarWorkGallery),
  {
    ssr: false,
    loading: () => (
      <div className="cosmic-grid-frame" style={{ height: 'clamp(480px, 72vh, 660px)' }} />
    ),
  }
)

const TABS = [
  { key: 'maps', label: 'Maps' },
  { key: 'websites', label: 'Websites' },
  { key: 'tools', label: 'Tools' },
  { key: 'analytics', label: 'Analytics' },
]

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
  ],
  tools: [
    {
      id: 1,
      title: 'Title Plotter PH',
      category: 'Tools',
      image: '/assets/images/latest-portfolio/tpph.webp',
      link: '/Tools/titleplotterph',
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

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('maps')

  return (
    <section className="cosmic-section" id="portfolio">
      <div className="cosmic-section-inner space-y-12">
        <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
          <span className="cosmic-eyebrow">Our Work</span>
          <h2 className="cosmic-title">
            Ideas Made
            <br />
            Exceptional
          </h2>
          <div className="cosmic-line" />
          <p className="cosmic-desc">
            Products and platforms shaped by thoughtful design, intuitive development, and
            meaningful data storytelling.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.25}>
          <div
            className="flex flex-wrap justify-center gap-4"
            role="tablist"
            aria-label="Portfolio categories"
          >
            {TABS.map((tab) => (
              <HudButton
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                hudStyle="style2"
                size="small"
                variant={activeTab === tab.key ? 'primary' : 'secondary'}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </HudButton>
            ))}
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.4}>
          <StellarWorkGallery
            key={activeTab}
            items={portfolioData[activeTab]}
            className="cosmic-grid-frame"
          />
        </AnimatedContainer>
      </div>
    </section>
  )
}

export default Portfolio
