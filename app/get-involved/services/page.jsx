import PageShell from '../../components/PageShell'
import PageHero from '../../components/PageHero'
import Services from '../../components/Services'
import HowWeWork from '../../components/HowWeWork'
import Pricing from '../../components/Pricing'
import Contact from '../../components/Contact'

export const metadata = {
  title: 'Get Our Service — byZenterra',
  description:
    'End-to-end digital mapping solutions — interactive web maps, geospatial analysis, dashboards, web development, and workflow automation — scoped transparently and supported after launch.',
}

export default function GetOurServicePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Get Involved · Get Our Service"
        title="End-to-End Digital Mapping"
        description="From raw coordinates and scattered spreadsheets to maps, dashboards, and applications your team relies on every day. Six service lines, one standard of craft — every engagement scoped transparently, built in reviewable increments, and supported long after launch."
      />
      <Services />
      <HowWeWork />
      <Pricing />
      <Contact />
    </PageShell>
  )
}
