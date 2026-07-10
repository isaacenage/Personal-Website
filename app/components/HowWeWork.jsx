'use client'

import { Search, DraftingCompass, Rocket } from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import { AnimatedContainer } from '@/components/ui/animated-container'

const steps = [
  {
    title: '01 · Discover',
    icon: Search,
    description:
      'We start with your data and your decisions — what exists, what is missing, and what the finished tool must answer. You get a scoped plan and a fixed quote before any work begins.',
  },
  {
    title: '02 · Build',
    icon: DraftingCompass,
    description:
      'Maps, dashboards, and applications take shape in short, reviewable increments. You see working software early and steer while changes are still cheap.',
  },
  {
    title: '03 · Deliver',
    icon: Rocket,
    description:
      'Launch is the midpoint, not the finish line. Every project ships with documentation, handover sessions, and post-launch support so your team owns what we built.',
  },
]

const HowWeWork = () => (
  <section className="cosmic-section" id="process">
    <div className="cosmic-section-inner space-y-14">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">How We Work</span>
        <h2 className="cosmic-title">
          Scoped, Built,
          <br />
          Supported
        </h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          Every engagement follows the same disciplined arc — so you always know where the
          project stands and what comes next.
        </p>
      </AnimatedContainer>

      <AnimatedContainer
        delay={0.3}
        className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame md:grid-cols-3"
      >
        {steps.map((step) => (
          <FeatureCard key={step.title} feature={step} />
        ))}
      </AnimatedContainer>
    </div>
  </section>
)

export default HowWeWork
