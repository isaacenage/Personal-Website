const Skills = () => {
  const gisSkills = [
    { name: 'Quantum GIS', level: 100 },
    { name: 'ArcGIS Pro and AGOL', level: 95 },
    { name: 'PostGIS', level: 60 },
    { name: 'Google Earth Engine', level: 70 }
  ]

  const devSkills = [
    { name: 'VB for Microsoft App Tools', level: 90 },
    { name: 'Frontend Development (HTML5 & Tailwind CSS)', level: 95 },
    { name: 'Backend Dev (JS, Python, SQL)', level: 60 },
    { name: 'Fullstack Dev', level: 30 }
  ]

  return (
    <div className="tmp-skill-area tmp-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                <div className="progress-wrapper">
                  <div className="content">
                    <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                      GIS Skills{' '}
                      <span>
                        <img src="/assets/images/custom-line/custom-line.png" alt="custom-line" />
                      </span>
                    </h2>
                    {gisSkills.map((skill, index) => (
                      <div key={index} className="progress-charts">
                        <h6 className="heading heading-h6">{skill.name}</h6>
                        <div className="progress">
                          <div
                            className="progress-bar wow fadeInLeft"
                            style={{ width: `${skill.level}%` }}
                            role="progressbar"
                            aria-valuenow={skill.level}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="percent-label">{skill.level}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="progress-wrapper">
                  <div className="content">
                    <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                      Development Skills{' '}
                      <span>
                        <img src="/assets/images/custom-line/custom-line.png" alt="custom-line" />
                      </span>
                    </h2>
                    {devSkills.map((skill, index) => (
                      <div key={index} className="progress-charts">
                        <h6 className="heading heading-h6">{skill.name}</h6>
                        <div className="progress">
                          <div
                            className="progress-bar wow fadeInLeft"
                            style={{ width: `${skill.level}%` }}
                            role="progressbar"
                            aria-valuenow={skill.level}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="percent-label">{skill.level}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
