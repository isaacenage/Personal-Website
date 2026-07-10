import PageShell from '../../components/PageShell'
import PageHero from '../../components/PageHero'
import SupportWays from '../../components/SupportWays'
import OpenDataInitiative from '../../components/OpenDataInitiative'
import PageCta from '../../components/PageCta'

export const metadata = {
  title: 'Support Us — byZenterra',
  description:
    'Help keep Philippine geospatial data open — partner with byZenterra, contribute datasets, champion open mapping, or commission the work that funds the portal.',
}

export default function SupportUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Get Involved · Support Us"
        title="Keep Philippine Geodata Open"
        description="Through gis.byzenterra.org, byZenterra publishes open geospatial data for everyone — no paywalls, no gatekeeping. That work is sustained by the firm and the people who believe in it. If open spatial data matters to you, here is how to get behind it."
      />
      <SupportWays />
      <OpenDataInitiative />
      <PageCta
        eyebrow="Get Involved"
        title="Start With a Message"
        description="Partnerships, data contributions, workshops, or ideas we haven't thought of — tell us how you want to be involved and we will find the shape that fits."
      />
    </PageShell>
  )
}
