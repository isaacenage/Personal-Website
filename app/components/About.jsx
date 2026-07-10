'use client'

import { Map, Code, BarChart3 } from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'

const capabilities = [
  {
    title: 'Geospatial Support',
    icon: Map,
    description:
      'Extensive corporate project experience — from land acquisition mapping to enterprise GIS operations.',
  },
  {
    title: 'Dev Solutions',
    icon: Code,
    description:
      'From custom web maps to process automation, we build responsive applications that make spatial data accessible across devices.',
  },
  {
    title: 'Data Analytics',
    icon: BarChart3,
    description:
      'Streamlined organizational data processes integrating Excel, SharePoint, Power Apps & Automate, BI, and other analysis tools.',
  },
]

const About = () => {
  return (
    <section className="cosmic-section" id="about">
      <div className="cosmic-section-inner">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimatedContainer>
            <span className="cosmic-eyebrow">The Studio</span>
            <h2 className="cosmic-title">
              Maps, Metrics,
              <br />
              and Code
            </h2>
            <div className="cosmic-line" />
            <p className="cosmic-desc">
              byZenterra is a studio built on the belief that geospatial technology can transform
              how organizations work. We combine custom tool development with deep expertise in
              GIS, data analytics, and web development to streamline processes, enhance
              efficiency, and move spatial data management forward for the teams we serve.
            </p>

            <div className="mt-12 flex flex-wrap items-end gap-10">
              <div>
                <div className="cosmic-stat-number">6+</div>
                <div className="cosmic-stat-label">Years in the Field</div>
              </div>
              <div className="flex flex-wrap gap-4">
                <HudButton variant="secondary" href="/what-we-do">
                  What We Do
                </HudButton>
                <HudButton variant="secondary" href="/who-we-are">
                  Who We Are
                </HudButton>
              </div>
            </div>
          </AnimatedContainer>

          <AnimatedContainer
            delay={0.3}
            className="grid grid-cols-1 divide-y divide-dashed divide-white/10 cosmic-grid-frame"
          >
            {capabilities.map((capability) => (
              <FeatureCard key={capability.title} feature={capability} />
            ))}
          </AnimatedContainer>
        </div>
      </div>
    </section>
  )
}

export default About
