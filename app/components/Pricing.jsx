'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { HudButton } from '@/components/ui/hud-button'

const tiers = [
  {
    name: 'Static Website',
    price: '₱80,000 – ₱100,000',
    tagline: 'Basic complexity',
    description: 'Company profiles, landing pages, portfolios, and blogs.',
    features: ['HTML/CSS', 'Minimal JavaScript', 'No backend'],
    highlighted: false,
  },
  {
    name: 'Dynamic Website',
    price: '₱100,000 – ₱150,000',
    tagline: 'Intermediate complexity',
    description: 'CMS websites, dashboards, map viewers, and interactive UI.',
    features: ['API calls', 'Dynamic UI', 'Data fetching', 'Light backend'],
    highlighted: true,
  },
  {
    name: 'Web Application',
    price: '₱150,000 – ₱500,000',
    tagline: 'Advanced complexity',
    description: 'SaaS tools, GIS web apps, data dashboards, and management systems.',
    features: ['Authentication', 'Database integration', 'User roles', 'Complex frontend logic'],
    highlighted: false,
  },
  {
    name: 'Enterprise System',
    price: 'Custom Quote',
    tagline: 'Enterprise complexity',
    description: 'Enterprise platforms, large SaaS, and high-scale multi-user systems.',
    features: ['Scalable architecture', 'Microservices', 'Advanced security', 'CI/CD pipelines'],
    note: 'Depends on scalability of database and cloud — to be discussed with your IT team.',
    highlighted: false,
  },
]

const Pricing = () => {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)

  // Draw the accent lines and fade the cards in once the section scrolls
  // into view (the original component fired on mount, which wastes the
  // entrance animation further down the page).
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // threshold 0: a ratio threshold is unreachable when the stacked-card
    // section is much taller than the viewport, leaving the cards at
    // opacity 0 forever.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Rising star particles, ported from the pricing-three-plans component.
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect?.width ?? window.innerWidth))
      canvas.height = Math.max(1, Math.floor(rect?.height ?? window.innerHeight))
    }
    setSize()

    let particles = []
    let raf = 0
    let running = false

    const makeParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * 0.25 + 0.05,
      o: Math.random() * 0.35 + 0.15,
    })

    const init = () => {
      const count = Math.floor((canvas.width * canvas.height) / 12000)
      particles = Array.from({ length: count }, makeParticle)
    }

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y -= p.v
        if (p.y < 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + Math.random() * 40
          p.v = Math.random() * 0.25 + 0.05
          p.o = Math.random() * 0.35 + 0.15
        }
        ctx.fillStyle = `rgba(220,232,255,${p.o})`
        ctx.fillRect(p.x, p.y, 0.7, 2.2)
      })
      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Only animate while the section is on screen — this loop was running
    // for the lifetime of the page, even at the hero or footer.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start()
      } else {
        stop()
      }
    })
    visibilityObserver.observe(canvas)

    const resizeObserver = new ResizeObserver(() => {
      setSize()
      init()
    })
    resizeObserver.observe(canvas.parentElement || document.body)

    init()

    return () => {
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      stop()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`cosmic-section cosmic-pricing ${ready ? 'is-ready' : ''}`}
      id="pricing"
    >
      <div className="vignette" />

      <div aria-hidden="true" className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      <canvas ref={canvasRef} className="pricing-canvas" />

      <div className="cosmic-section-inner relative">
        <div className="cosmic-head--center mx-auto mb-14 max-w-3xl">
          <span className="cosmic-eyebrow">Pricing</span>
          <h2 className="cosmic-title">Pricing &amp; Packages</h2>
          <div className="cosmic-line" />
          <p className="cosmic-desc">
            Transparent tiers based on project complexity. Every project includes responsive
            design, clean code, and post-launch support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`pricing-card ${tier.highlighted ? 'pricing-card--pop' : ''}`}
              style={{ animationDelay: `${0.32 + index * 0.08}s` }}
            >
              {tier.highlighted && (
                <div className="pricing-chip">
                  <span className="dot" />
                  Most Popular
                </div>
              )}

              <h3 className="plan-name">{tier.name}</h3>
              <div className="plan-price">{tier.price}</div>
              <p className="plan-tagline">{tier.tagline}</p>
              <p className="plan-desc">{tier.description}</p>

              <ul className="plan-features">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} strokeWidth={1.5} />
                    {feature}
                  </li>
                ))}
              </ul>

              {tier.note && <p className="plan-note">*{tier.note}</p>}

              <HudButton
                href="#contacts"
                variant={tier.highlighted ? 'primary' : 'secondary'}
              >
                Get a Quote
              </HudButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
