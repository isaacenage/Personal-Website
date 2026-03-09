import Link from 'next/link'

const About = () => {
  return (
    <section className="about-us-area tmp-section-gapTop" id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-us-left-content-wrap bg-vactor-one">
              <div className="years-of-experience-card tmp-scroll-trigger tmp-fade-in animation-order-1">
                <h2 className="counter card-title">
                  <span className="odometer" data-count="6">6</span>+
                </h2>
                <p className="card-para">years of experience</p>
              </div>
              <div className="design-card tmp-scroll-trigger tmp-fade-in animation-order-2">
                <div className="design-card-img">
                  <div className="icon">
                    <i className="fa-sharp fa-thin fa-map"></i>
                  </div>
                </div>
                <div className="card-info">
                  <h3 className="card-title">Geospatial Support</h3>
                  <p className="card-para">Extensive corporate project experience</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-us-right-content-wrap">
              <div className="section-head text-align-left mb--50">
                <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <span className="subtitle">About Me</span>
                </div>
                <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                  Innovating at the Intersection <br /> of Maps, Metrics, and Code
                </h2>
                <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                  As a GIS Specialist in a corporate setting, I&apos;m driven by the potential of geospatial technology to optimize workflows and create automated solutions that make a meaningful impact. By combining my passion for custom tool development with expertise in GIS, data analytics, and web development, I streamline processes, enhance efficiency, and contribute to the evolving future of spatial data management and analysis.
                </p>
              </div>
              <div className="about-us-section-card row g-5">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="about-us-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-4">
                    <div className="card-head">
                      <div className="logo-img">
                        <img src="/assets/images/about/logo-1.svg" alt="logo" />
                      </div>
                      <h3 className="card-title">Dev Solutions</h3>
                    </div>
                    <p className="card-para">
                      From custom web maps to process automation, I build responsive applications that make spatial data accessible across devices.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="about-us-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-5">
                    <div className="card-head">
                      <div className="logo-img">
                        <img src="/assets/images/about/logo-3.svg" alt="logo" />
                      </div>
                      <h3 className="card-title">Data Analytics</h3>
                    </div>
                    <p className="card-para">
                      Streamline organizational data processes by integrating Excel, SharePoint, Power Apps &amp; Automate, BI, and other analysis tools.
                    </p>
                  </div>
                </div>
              </div>
              <div className="about-btn mt--40 tmp-scroll-trigger tmp-fade-in animation-order-6">
                <Link className="tmp-btn hover-icon-reverse radius-round" href="/about">
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Read More About Me</span>
                    <span className="btn-icon">
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
