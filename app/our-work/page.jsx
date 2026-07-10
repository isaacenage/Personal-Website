import PageShell from '../components/PageShell'
import Portfolio from '../components/Portfolio'

export const metadata = {
  title: 'Our Work — byZenterra',
  description:
    'Maps, websites, and tools shipped by byZenterra — from live brownout tracking and civic data maps to open geodata tools and QGIS plugins.',
}

export default function OurWorkPage() {
  return (
    <PageShell>
      <Portfolio />
    </PageShell>
  )
}
