import Link from 'next/link'

const AboutServices = () => {
  const services = [
    {
      icon: 'fa-solid fa-map-location-dot',
      title: 'Geospatial Work',
      description: 'ArcGIS, QGIS, PostGIS'
    },
    {
      icon: 'fa-regular fa-file-chart-pie',
      title: 'Data Analytics',
      description: 'PowerBI, Tableau, Excel'
    },
    {
      icon: 'fa-solid fa-laptop',
      title: 'Web Development',
      description: 'Frontend'
    },
    {
      icon: 'fa-solid fa-toolbox',
      title: 'Tools',
      description: 'Python and VBA'
    }
  ]

  return (
    <section className="service-area tmp-section-gap">
      <div className="container">
        <div className="row justify-content-center">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <div className={`service-card-v1 tmp-scroll-trigger tmp-fade-in animation-order-${index + 1} tmp-link-animation`}>
                <div className="service-card-icon">
                  <i className={service.icon}></i>
                </div>
                <h4 className="service-title">
                  <Link href="/#portfolio">{service.title}</Link>
                </h4>
                <p className="service-para">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutServices
