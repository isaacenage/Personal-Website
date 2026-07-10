'use client'

import { Crosshair, Eye, Hammer, Handshake } from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import { AnimatedContainer } from '@/components/ui/animated-container'

const values = [
  {
    title: 'Precision',
    icon: Crosshair,
    description:
      'Spatial data is only useful when it is right. We obsess over coordinate systems, sources, and validation so the decisions built on our work stand up.',
  },
  {
    title: 'Clarity',
    icon: Eye,
    description:
      'A map or dashboard succeeds when someone who is not a specialist can act on it. We design for the decision, not for the demo.',
  },
  {
    title: 'Craft',
    icon: Hammer,
    description:
      'We build with the same care we map: clean code, fast pages, and interfaces that hold up long after handover.',
  },
  {
    title: 'Partnership',
    icon: Handshake,
    description:
      'We work as an extension of your team — plain-language updates, honest scoping, and tools your people can actually maintain.',
  },
]

const MissionValues = () => (
  <section className="cosmic-section" id="mission">
    <div className="cosmic-section-inner space-y-14">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">Our Mission</span>
        <h2 className="cosmic-title">
          Spatial Data,
          <br />
          Put to Work
        </h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          byZenterra exists to close the gap between the data organizations collect and the
          decisions they need to make. These are the principles every engagement is held to.
        </p>
      </AnimatedContainer>

      <AnimatedContainer
        delay={0.3}
        className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2"
      >
        {values.map((value) => (
          <FeatureCard key={value.title} feature={value} />
        ))}
      </AnimatedContainer>
    </div>
  </section>
)

export default MissionValues
