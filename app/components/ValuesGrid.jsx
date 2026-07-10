'use client'

import { Crosshair, Eye, Hammer, Handshake, Globe, Shield } from 'lucide-react'
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
  {
    title: 'Openness',
    icon: Globe,
    description:
      'Good geodata should not live behind a gate. We publish open geospatial data at gis.byzenterra.org and default to open standards in everything we build.',
  },
  {
    title: 'Stewardship',
    icon: Shield,
    description:
      'Filipino-grown and DTI-registered, we treat Philippine spatial data as shared national infrastructure — handled responsibly, built to outlast any single project.',
  },
]

/* The six commitments every engagement is held to. */
const ValuesGrid = () => (
  <section className="cosmic-section pt-0" id="values">
    <div className="cosmic-section-inner space-y-14">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">Our Values</span>
        <h2 className="cosmic-title">
          Held to,
          <br />
          Not Hung Up
        </h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          Six commitments that shape how byZenterra maps, builds, and works with people — checked
          against every deliverable, not framed on a wall.
        </p>
      </AnimatedContainer>

      <AnimatedContainer
        delay={0.3}
        className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2 lg:grid-cols-3"
      >
        {values.map((value) => (
          <FeatureCard key={value.title} feature={value} />
        ))}
      </AnimatedContainer>
    </div>
  </section>
)

export default ValuesGrid
