import PageShell from '../components/PageShell'
import PageHero from '../components/PageHero'
import Portfolio from '../components/Portfolio'
import PageCta from '../components/PageCta'

export const metadata = {
  title: 'Our Work — byZenterra',
  description:
    'Maps, web applications, tools, and analytics dashboards shipped by byZenterra — from landslide susceptibility mapping to enterprise GIS dashboards.',
}

export default function OurWorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Work"
        title="Ideas Made Exceptional"
        description="Products and platforms shaped by thoughtful design, intuitive development, and meaningful data storytelling — browse the maps, websites, tools, and analytics work the firm has shipped."
      />
      <Portfolio />
      <PageCta
        eyebrow="Your Project Next"
        title="Add Yours to the Gallery"
        description="Every project here started as a conversation about a decision someone needed to make. Tell us yours — the byZenterra team will map the way there."
      />
    </PageShell>
  )
}
