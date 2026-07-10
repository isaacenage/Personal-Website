'use client'

import { Building2, Sun, Landmark, RadioTower } from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import { AnimatedContainer } from '@/components/ui/animated-container'

const engagements = [
  {
    title: 'Real Estate',
    icon: Building2,
    meta: 'Ayala Land Premier · 2024 – Present',
    description:
      'Sole-source GIS support for AKL Properties — the joint venture between Ayala Land and Royal Asia Land, a subsidiary of Shangri-La Properties.',
  },
  {
    title: 'Renewable Energy',
    icon: Sun,
    meta: 'Solar Philippines · 2020 – 2024',
    description:
      'Led a team of GIS professionals delivering cartographic and real-time mapping solutions for land acquisition and right-of-way projects nationwide.',
  },
  {
    title: 'Land Development',
    icon: Landmark,
    meta: 'Solar Philippines · 2019 – 2020',
    description:
      'Property development support across the Philippines — financial planning, subcontractor supervision, mapping, and land database management.',
  },
  {
    title: 'Telecommunications',
    icon: RadioTower,
    meta: 'Globe Telecom · 2018 – 2019',
    description:
      'Commercial demand mapping across the Philippines, assessing facility penetration through competitor presence and socio-economic evaluation.',
  },
]

const TrackRecord = () => (
  <section className="cosmic-section" id="track-record">
    <div className="cosmic-section-inner space-y-14">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">Track Record</span>
        <h2 className="cosmic-title">
          Field-Proven
          <br />
          Experience
        </h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          byZenterra grows out of years delivering GIS, data analytics, and web solutions for
          leaders in Philippine real estate, energy, and telecommunications.
        </p>
      </AnimatedContainer>

      <AnimatedContainer
        delay={0.3}
        className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2"
      >
        {engagements.map((engagement) => (
          <FeatureCard key={engagement.title} feature={engagement} />
        ))}
      </AnimatedContainer>
    </div>
  </section>
)

export default TrackRecord
