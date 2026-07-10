'use client'

import { Layers, Landmark, Rocket, Globe } from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import { AnimatedContainer } from '@/components/ui/animated-container'

const pillars = [
  {
    title: 'Spatial Data Infrastructure',
    icon: Layers,
    description:
      'Authoritative basemaps, clean cadastral and administrative layers, and dependable data pipelines — the quiet foundations every reliable map stands on.',
  },
  {
    title: 'Modern Governance',
    icon: Landmark,
    description:
      'Local governments and public institutions equipped with maps and dashboards for planning, disaster risk reduction, and service delivery their constituents can feel.',
  },
  {
    title: 'Private-Sector Innovation',
    icon: Rocket,
    description:
      'Real estate, energy, and telecom teams moving faster because their land, network, and market data finally live in tools built for decisions.',
  },
  {
    title: 'Open Geospatial Data',
    icon: Globe,
    description:
      'Through gis.byzenterra.org we publish open geospatial data for everyone — because spatial data is infrastructure, and infrastructure should be shared.',
  },
]

/* The four commitments the mission is measured against. */
const MissionPillars = () => (
  <section className="cosmic-section pt-0" id="pillars">
    <div className="cosmic-section-inner space-y-14">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">What We Advance</span>
        <h2 className="cosmic-title">
          Four Fronts,
          <br />
          One Mission
        </h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          Everything byZenterra takes on serves at least one of these fronts — and every
          engagement is weighed against them before we say yes.
        </p>
      </AnimatedContainer>

      <AnimatedContainer
        delay={0.3}
        className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2"
      >
        {pillars.map((pillar) => (
          <FeatureCard key={pillar.title} feature={pillar} />
        ))}
      </AnimatedContainer>
    </div>
  </section>
)

export default MissionPillars
