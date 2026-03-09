const Counter = () => {
  const counters = [
    {
      count: '500',
      suffix: '+',
      description: 'maps cartographed for corporate use'
    },
    {
      count: '100',
      suffix: '+',
      description: 'spreadsheet monitorings'
    },
    {
      count: '100',
      suffix: '+',
      description: 'tools made using python and vb'
    },
    {
      count: '10',
      suffix: '+',
      description: 'websites for estate project dev progress'
    }
  ]

  return (
    <section className="counter-area tmp-section-gapBottom">
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
            <div className="year-of-expariance-wrapper bg-blur-style-one tmp-scroll-trigger tmp-fade-in animation-order-1">
              <div className="year-expariance-wrap">
                <h2 className="counter year-number">
                  <span className="odometer" data-count="6">6</span>+
                </h2>
                <h3 className="year-title">
                  Years Of <br /> experience
                </h3>
              </div>
              <p className="year-para">
                specialized in geospatial analysis and location-based analytics&mdash;helping corporations optimize operations, visualize spatial data, and make informed decisions through GIS solutions.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
            <div className="counter-area-right-content">
              <div className="row g-5">
                {counters.map((counter, index) => (
                  <div key={index} className="col-lg-6 col-sm-6 col-12">
                    <div className={`counter-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}>
                      <h3 className="counter counter-title">
                        <span className="odometer" data-count={counter.count}>
                          {counter.count}
                        </span>
                        {counter.suffix}
                      </h3>
                      <p className="counter-para">{counter.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Counter
