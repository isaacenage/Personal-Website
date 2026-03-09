const Pricing = () => {
  const tiers = [
    {
      category: 'Static Website',
      complexity: 'Basic',
      examples: ['Company Profile', 'Landing Page', 'Portfolio', 'Blog'],
      features: ['HTML/CSS', 'Minimal JavaScript', 'No Backend'],
      price: '₱80,000 - ₱100,000',
      highlighted: false
    },
    {
      category: 'Dynamic Website',
      complexity: 'Intermediate',
      examples: ['CMS Website', 'Dashboard', 'Map Viewer', 'Interactive UI'],
      features: ['API Calls', 'Dynamic UI', 'Data Fetching', 'Light Backend'],
      price: '₱100,000 - ₱150,000',
      highlighted: true
    },
    {
      category: 'Web Application',
      complexity: 'Advanced',
      examples: ['SaaS Tools', 'GIS Web Apps', 'Data Dashboards', 'Management Systems'],
      features: ['Authentication', 'Database Integration', 'User Roles', 'Complex Frontend Logic'],
      price: '₱150,000 - ₱500,000',
      highlighted: false
    },
    {
      category: 'Enterprise System',
      complexity: 'Enterprise',
      examples: ['Enterprise Platforms', 'Large SaaS', 'High-Scale Multi-User Systems'],
      features: ['Scalable Architecture', 'Microservices', 'Advanced Security', 'CI/CD Pipelines'],
      price: 'Custom Quote',
      note: 'Depends on scalability of database and cloud — to be discussed with IT team',
      highlighted: false
    }
  ]

  const cardStyle = {
    background: 'var(--color-gray-2)',
    borderRadius: '12px',
    padding: '36px 32px',
    border: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'border-color 0.3s ease'
  }

  const highlightedCardStyle = {
    ...cardStyle,
    border: '1px solid var(--color-primary)'
  }

  return (
    <section className="pricing-area tmp-section-gapTop" id="pricing">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Freelance Rates</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Pricing &amp; Packages
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Transparent pricing tiers based on project complexity. All projects include responsive design, clean code, and post-launch support.
          </p>
        </div>

        <div className="row g-5">
          {tiers.map((tier, index) => (
            <div
              key={tier.category}
              className={`col-lg-3 col-md-6 col-sm-6 col-12 tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
            >
              <div style={tier.highlighted ? highlightedCardStyle : cardStyle}>
                {/* Header */}
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--color-heading)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {tier.category}
                  {tier.highlighted && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#fff',
                      background: 'var(--color-primary)',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}>
                      Popular
                    </span>
                  )}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--color-body)',
                  marginBottom: '24px'
                }}>
                  {tier.complexity} Complexity
                </p>

                {/* Price */}
                <h4 style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1.3
                }}>
                  {tier.price}
                </h4>

                {/* Examples */}
                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-heading)',
                    marginBottom: '6px'
                  }}>
                    Examples
                  </h5>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-body)',
                    margin: 0,
                    lineHeight: 1.7
                  }}>
                    {tier.examples.join(', ')}
                  </p>
                </div>

                {/* Features */}
                <div style={{ flex: 1 }}>
                  <h5 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-heading)',
                    marginBottom: '12px'
                  }}>
                    Includes
                  </h5>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {tier.features.map((feature) => (
                      <li key={feature} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '15px',
                        color: 'var(--color-body)',
                        marginBottom: '12px',
                        fontWeight: 500
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="var(--color-primary)">
                          <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Note */}
                {tier.note && (
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--color-body)',
                    fontStyle: 'italic',
                    marginTop: '12px',
                    opacity: 0.75,
                    lineHeight: 1.6
                  }}>
                    *{tier.note}
                  </p>
                )}

                {/* CTA Button */}
                <a
                  href="#contacts"
                  className="smoth-animation"
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '24px',
                    padding: '12px 20px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#fff',
                    background: tier.highlighted ? 'var(--color-primary)' : 'transparent',
                    border: tier.highlighted ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: '6px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)'
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                  }}
                  onMouseLeave={(e) => {
                    if (!tier.highlighted) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                    }
                  }}
                >
                  Get a Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
