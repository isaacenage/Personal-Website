import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import Services from '../components/Services'
import HowWeWork from '../components/HowWeWork'
import Pricing from '../components/Pricing'
import PageCta from '../components/PageCta'

export const metadata = {
  title: 'What We Do — byZenterra',
  description:
    'byZenterra builds interactive web maps, geospatial analyses, data dashboards, and modern web applications — scoped transparently and supported after launch.',
}

export default function WhatWeDoPage() {
  return (
    <>
      <Header />
      <div className="cosmic-backdrop" aria-hidden="true" />
      <main className="cosmic-main">
        <PageHero
          eyebrow="What We Do"
          title="From Spatial Data to Working Software"
          description="byZenterra takes organizations from raw coordinates and scattered spreadsheets to maps, dashboards, and applications their teams rely on every day. Six service lines, one standard of craft."
        />
        <Services />
        <HowWeWork />
        <Pricing />
        <PageCta
          title="Have a Project in Mind?"
          description="Whether it starts as a shapefile, a spreadsheet, or a sketch on a whiteboard — tell us what you need and we will map the way there."
        />
        <Footer />
      </main>
    </>
  )
}
