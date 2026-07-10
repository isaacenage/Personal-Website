'use client'

import { Handshake, Database, Megaphone, Briefcase } from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import { AnimatedContainer } from '@/components/ui/animated-container'

const ways = [
  {
    title: 'Partner With Us',
    icon: Handshake,
    description:
      'Local governments, universities, and civic organizations: co-publish datasets, run joint mapping initiatives, and widen open coverage for the communities you serve.',
  },
  {
    title: 'Contribute Data',
    icon: Database,
    description:
      'Have a dataset that deserves a public home? We clean, document, and publish contributed layers on the open portal — with credit always flowing to the original producers.',
  },
  {
    title: 'Champion Open Mapping',
    icon: Megaphone,
    description:
      'Cite the portal in your research, share it with your planning office, teach with it in your classroom. Every person who uses open geodata strengthens the case for more of it.',
  },
  {
    title: 'Commission a Project',
    icon: Briefcase,
    description:
      'Commercial engagements keep the lights on — and fund the hours we spend curating and publishing open data. Hiring byZenterra is the most direct way to sustain the initiative.',
  },
]

/* The concrete ways to get behind the open-data work. */
const SupportWays = () => (
  <section className="cosmic-section pt-0" id="ways-to-support">
    <div className="cosmic-section-inner space-y-14">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">Ways to Support</span>
        <h2 className="cosmic-title">
          Every Layer
          <br />
          Helps
        </h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          Open geospatial data takes sustained, unglamorous work — gathering, cleaning,
          documenting, hosting. Here is how organizations and individuals keep it going.
        </p>
      </AnimatedContainer>

      <AnimatedContainer
        delay={0.3}
        className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2"
      >
        {ways.map((way) => (
          <FeatureCard key={way.title} feature={way} />
        ))}
      </AnimatedContainer>
    </div>
  </section>
)

export default SupportWays
