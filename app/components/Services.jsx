const Services = () => {
  const services = [
    {
      id: '01',
      title: 'Interactive Web Mapping',
      description: 'I develop rich, browser-based maps using platforms like ArcGIS Online, LeafletJS, and Mapbox GL JS. These interactive tools allow users to explore spatial data with fluid navigation, custom layers, and real-time updates.'
    },
    {
      id: '02',
      title: 'Geospatial Analysis & Location Intelligence',
      description: 'Using advanced GIS workflows, I extract insights from spatial data to support planning, decision-making, and asset management. From parcel mapping to spatial statistics, my work bridges data and geography.'
    },
    {
      id: '03',
      title: 'Data Visualization & Reporting',
      description: 'I create clean, insightful dashboards using Power BI and Tableau to transform raw data into meaningful visuals. These reports help stakeholders track KPIs, uncover trends, and interact with data dynamically.'
    },
    {
      id: '04',
      title: 'Web Design & Front-End Development',
      description: 'I build responsive, fast-loading websites using HTML, Tailwind CSS, and JavaScript tailored to your needs. Whether it\'s for portfolios, internal systems, or project showcases, I prioritize performance and user experience.'
    },
    {
      id: '05',
      title: 'Creative Design & Visual Assets',
      description: 'From digital illustrations to print-ready materials, I use Adobe Illustrator and Photoshop to craft high-impact visuals. I design infographics and custom assets for both web and social platforms.'
    },
    {
      id: '06',
      title: 'Workflow Automation & Data Management',
      description: 'I streamline repetitive tasks and organize complex data using spreadsheets, SharePoint, and automation tools like Power Automate. I also build custom forms and lightweight apps through Power Apps to enhance team collaboration and data collection.'
    }
  ]

  return (
    <section className="latest-service-area tmp-section-gapTop" id="service">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Services I Offer</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Smart Solutions for <br /> a Digital World
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Delivering geospatial insights, intelligent data systems, and custom web tools that drive informed decisions.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={service.id}
                className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
              >
                <h2 className="service-card-num">
                  <span>{service.id}.</span>{service.title}
                </h2>
                <p className="service-para">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-6 col-sm-6">
            {services.slice(3, 6).map((service, index) => (
              <div
                key={service.id}
                className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${index + 4}`}
              >
                <h2 className="service-card-num">
                  <span>{service.id}.</span>{service.title}
                </h2>
                <p className="service-para">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
