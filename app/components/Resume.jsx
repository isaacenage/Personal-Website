const Resume = () => {
  const experiences = [
    {
      title: 'Geographic Information Systems Specialist',
      company: 'Ayala Land Premier',
      period: '2024-Present',
      description: 'Independent GIS Support: Acts as the sole GIS specialist for AKL Properties — the joint venture between ALI and Royal Asia Land, a subsidiary of Shangri-La Properties.'
    },
    {
      title: 'Senior GIS Specialist',
      company: 'Solar Philippines',
      period: '2020-2024 (4Y)',
      description: 'Lead a team of GIS professionals in delivering cartographic and real-time mapping solutions tailored to corporate requirements, with a focus on land acquisition and right-of-way projects.'
    },
    {
      title: 'Land Acquisition Officer',
      company: 'Solar Philippines',
      period: '2019-2020 (1Y)',
      description: 'Assist the Land Manager in managing the projects of the corporation in different areas of the Philippines through property development activities, financial planning, supervising of subcontractors, mapping, and database management.'
    },
    {
      title: 'GIS Specialist - Demand Mapper',
      company: 'Globe Telecom',
      period: '2018-2019 (1Y)',
      description: 'Map out the commercial demands for Globe\'s services in the Philippines using various mapping softwares and assess the penetration factor of GTI\'s facilities to the target areas through competitor\'s presence mapping and evaluation of the municipality\'s socio-economic status.'
    }
  ]

  return (
    <section className="education-experience tmp-section-gapTop" id="resume">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Education &amp; Experience</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Fueling Innovation by
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            utilizing GIS, Data Analytics, and Web Development for expert solutions to enhance decision-making, streamline processes, and drive organizational success.
          </p>
        </div>

        <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
          Experiences{' '}
          <span>
            <img src="/assets/images/custom-line/custom-line.png" alt="custom-line" />
          </span>
        </h2>

        <div className="row g-5">
          {experiences.map((exp, index) => (
            <div key={index} className="col-lg-6 col-sm-6">
              <div className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}>
                <h3 className="edu-title">{exp.title}</h3>
                <h4 className="edu-sub-title">{exp.company}</h4>
                <h2 className="edu-title">{exp.period}</h2>
                <p className="edu-para">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="experiences-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div className="experiences-wrap-left-content">
                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Education{' '}
                  <span>
                    <img src="/assets/images/custom-line/custom-line.png" alt="custom-line" />
                  </span>
                </h2>

                <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <p className="ex-subtitle">College</p>
                  <h2 className="ex-name">Bachelor of Science in Geography</h2>
                  <h3 className="ex-title">University of the Philippines - Diliman</h3>
                  <i className="ex-para">Bachelor&apos;s Degree, Cum Laude</i>
                </div>
                <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-2">
                  <p className="ex-subtitle">High School</p>
                  <h2 className="ex-name">High School Diploma</h2>
                  <h3 className="ex-title">Cavite National Science High School</h3>
                  <i className="ex-para">Completed secondary education with pride</i>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="experiences-wrap-right-content">
                <img
                  className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                  src="/assets/images/experiences/header-bg1.jpg"
                  alt="expert-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
