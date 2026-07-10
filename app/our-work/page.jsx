import PageShell from '../components/PageShell'
import Portfolio from '../components/Portfolio'

export const metadata = {
  title: 'Our Work — byZenterra',
  description:
    'Maps, web applications, tools, and analytics dashboards shipped by byZenterra — from landslide susceptibility mapping to enterprise GIS dashboards.',
}

export default function OurWorkPage() {
  return (
    <PageShell>
      <Portfolio />
    </PageShell>
  )
}
