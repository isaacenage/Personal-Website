'use client'

import { useState } from 'react'

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('nav-all')

  const portfolioData = {
    'nav-all': [
      {
        id: 1,
        title: 'Landslide Susceptibility Mapping',
        category: 'Undergraduate Thesis',
        image: '/assets/images/latest-portfolio/LandslideSusceptibilityMap.png',
        link: '/Portfolio/UndergraduateThesis'
      },
      {
        id: 2,
        title: 'UPD Cartography',
        category: 'Public Webmap',
        image: '/assets/images/latest-portfolio/UPDCr.png',
        link: '/Portfolio/UPDCRtography'
      },
      {
        id: 3,
        title: 'EleksyonPH',
        category: 'Election Map',
        image: '/assets/images/latest-portfolio/eleksyon.png',
        link: '/Portfolio/EleksyonPH'
      }
    ],
    'nav-branding': [
      {
        id: 1,
        title: "Joe's Commercial Cleaning",
        category: 'Web Development',
        image: '/assets/images/latest-portfolio/joes.png',
        link: '/Portfolio/JoesCommercialCleaning'
      },
      {
        id: 2,
        title: 'JJ Spotless',
        category: 'Web Development',
        image: '/assets/images/latest-portfolio/jj.png',
        link: '/Portfolio/JJSpotless'
      },
      {
        id: 3,
        title: 'Wedding Planner',
        category: 'Web Development',
        image: '/assets/images/latest-portfolio/wed.png',
        link: 'https://weddingdashboard.isaacenage.xyz/'
      },
      {
        id: 4,
        title: 'OSP Map Demo',
        category: 'Demo Web Application',
        image: '/assets/images/latest-portfolio/OSPMapDemo.png',
        link: '/Portfolio/OSPMapDemo'
      },
      {
        id: 5,
        title: 'Aera',
        category: 'Web Application',
        image: '/assets/images/latest-portfolio/Aera.png',
        link: '/Portfolio/Aera'
      },
      {
        id: 6,
        title: 'AeraLink',
        category: 'Web Application',
        image: '/assets/images/latest-portfolio/AeraLink.png',
        link: '/Portfolio/AeraLink'
      }
    ],
    'nav-design': [
      {
        id: 1,
        title: 'Title Plotter PH',
        category: 'Tools',
        image: '/assets/images/latest-portfolio/tpph.png',
        link: '/Tools/titleplotterph'
      }
    ],
    'nav-content-writing': [],
    'nav-marketing': [
      {
        id: 1,
        title: 'Aera Dashboard',
        category: 'Corporate Project',
        image: '/assets/images/latest-portfolio/Dash.jpg',
        link: '/Portfolio/AeraDashboard'
      },
      {
        id: 2,
        title: 'Ayala Dashboard',
        category: 'Corporate Project',
        image: '/assets/images/latest-portfolio/Dash1.jpg',
        link: '/Portfolio/AyalaDashboard'
      }
    ]
  }

  return (
    <section className="tmp-portfolio-area tmp-section-gapTop" id="portfolio">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Portfolio</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Transforming Ideas into Exceptional
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            products and platforms through thoughtful design, intuitive development, and meaningful data storytelling.
          </p>
        </div>

        <div className="latest-portfolio-tabs-area">
          <nav style={{ position: 'relative', zIndex: 2 }}>
            <ul className="nav nav-tabs tmp-scroll-trigger tmp-fade-in animation-order-4" id="nav-tab" role="tablist">
              <li>
                <button
                  className={`nav-link ${activeTab === 'nav-all' ? 'active' : ''}`}
                  id="nav-all-tab"
                  onClick={() => setActiveTab('nav-all')}
                  type="button"
                  role="tab"
                  aria-controls="nav-all"
                  aria-selected={activeTab === 'nav-all'}
                >
                  Maps
                </button>
              </li>
              <li>
                <button
                  className={`nav-link ${activeTab === 'nav-branding' ? 'active' : ''}`}
                  id="nav-branding-tab"
                  onClick={() => setActiveTab('nav-branding')}
                  type="button"
                  role="tab"
                  aria-controls="nav-branding"
                  aria-selected={activeTab === 'nav-branding'}
                >
                  Websites
                </button>
              </li>
              <li>
                <button
                  className={`nav-link ${activeTab === 'nav-design' ? 'active' : ''}`}
                  id="nav-design-tab"
                  onClick={() => setActiveTab('nav-design')}
                  type="button"
                  role="tab"
                  aria-controls="nav-design"
                  aria-selected={activeTab === 'nav-design'}
                >
                  Tools
                </button>
              </li>
              <li>
                <button
                  className={`nav-link ${activeTab === 'nav-content-writing' ? 'active' : ''}`}
                  id="nav-content-writing-tab"
                  onClick={() => setActiveTab('nav-content-writing')}
                  type="button"
                  role="tab"
                  aria-controls="nav-content-writing"
                  aria-selected={activeTab === 'nav-content-writing'}
                >
                  Illustrata
                </button>
              </li>
              <li>
                <button
                  className={`nav-link ${activeTab === 'nav-marketing' ? 'active' : ''}`}
                  id="nav-marketing-tab"
                  onClick={() => setActiveTab('nav-marketing')}
                  type="button"
                  role="tab"
                  aria-controls="nav-marketing"
                  aria-selected={activeTab === 'nav-marketing'}
                >
                  Analytics
                </button>
              </li>
            </ul>
          </nav>

          <div className="tab-content bg-blur-style-three" id="nav-tabContent">
            {Object.keys(portfolioData).map((tabKey) => (
              <div
                key={tabKey}
                className={`tab-pane fade ${activeTab === tabKey ? 'show active' : ''}`}
                id={tabKey}
                role="tabpanel"
                aria-labelledby={`${tabKey}-tab`}
                tabIndex="0"
              >
                <div className="row">
                  {portfolioData[tabKey].map((item, index) => (
                    <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                      <div className={`tmp-portfolio tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}>
                        <img src={item.image} alt={item.title} />
                        <div className="portfolio-card-content-wrap">
                          <div className="content-left">
                            <p className="portfoli-card-para">{item.category}</p>
                            <h3 className="portfolio-card-title animated fadeIn">
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.title}
                              </a>
                            </h3>
                          </div>
                          <div className="portfolio-btn">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tmp-arrow-icon-btn"
                            >
                              <div className="btn-inner">
                                <i className="tmp-icon fa-solid fa-arrow-up-right"></i>
                                <i className="tmp-icon-bottom fa-solid fa-arrow-up-right"></i>
                              </div>
                            </a>
                          </div>
                        </div>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="over_link"
                        ></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
