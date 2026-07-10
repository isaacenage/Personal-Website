'use client'

import { Map, Compass, BarChart3, Code, PenTool, Workflow } from 'lucide-react'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import { AnimatedContainer } from '@/components/ui/animated-container'

const services = [
  {
    title: 'Interactive Web Mapping',
    icon: Map,
    description:
      'Rich, browser-based maps built with ArcGIS Online, LeafletJS, and Mapbox GL JS — fluid navigation, custom layers, and real-time updates.',
  },
  {
    title: 'Geospatial Analysis',
    icon: Compass,
    description:
      'Advanced GIS workflows that extract insight from spatial data — parcel mapping, spatial statistics, and location intelligence for planning and asset management.',
  },
  {
    title: 'Data Visualization & Reporting',
    icon: BarChart3,
    description:
      'Clean, insightful dashboards in Power BI and Tableau that turn raw data into visuals your stakeholders can track, explore, and act on.',
  },
  {
    title: 'Web Design & Development',
    icon: Code,
    description:
      'Responsive, fast-loading websites built with HTML, Tailwind CSS, and JavaScript — company sites, internal systems, and project showcases.',
  },
  {
    title: 'Creative Design & Visual Assets',
    icon: PenTool,
    description:
      'High-impact visuals crafted in Illustrator and Photoshop — infographics, digital illustrations, and print-ready assets for web and social.',
  },
  {
    title: 'Workflow Automation',
    icon: Workflow,
    description:
      'Repetitive tasks streamlined with SharePoint, Power Automate, and custom Power Apps — better collaboration, cleaner data collection.',
  },
]

const Services = () => {
  return (
    <section className="cosmic-section" id="service">
      <div className="cosmic-section-inner space-y-14">
        <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
          <span className="cosmic-eyebrow">Services</span>
          <h2 className="cosmic-title">
            Smart Solutions for
            <br />a Digital World
          </h2>
          <div className="cosmic-line" />
          <p className="cosmic-desc">
            Geospatial insight, intelligent data systems, and custom web tools that drive informed
            decisions.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2 md:grid-cols-3"
        >
          {services.map((service) => (
            <FeatureCard key={service.title} feature={service} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  )
}

export default Services
