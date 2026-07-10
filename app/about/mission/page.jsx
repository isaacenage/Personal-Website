import PageShell from '../../components/PageShell'
import PageHero from '../../components/PageHero'
import MissionPillars from '../../components/MissionPillars'
import OpenDataInitiative from '../../components/OpenDataInitiative'
import PageCta from '../../components/PageCta'

export const metadata = {
  title: 'Our Mission — byZenterra',
  description:
    'byZenterra is a DTI-registered, Filipino-grown firm advancing GIS and spatial data infrastructure — the digital mapping backbone for modern governance and private-sector innovation across the Philippines.',
}

export default function OurMissionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Our Mission"
        title="Mapping the Philippines Forward"
        description="byZenterra exists to give the Philippines the spatial data infrastructure it deserves. We are a DTI-registered, Filipino-grown firm delivering end-to-end digital mapping solutions — the backbone modern governance and private-sector innovation stand on — and we believe the data underneath it all should be accurate, usable, and increasingly open."
      />
      <MissionPillars />
      <OpenDataInitiative />
      <PageCta
        eyebrow="Join the Mission"
        title="Build on Solid Ground"
        description="Whether you govern a city, run a portfolio of assets, or research the terrain in between — the right map changes what you can decide. Tell us what you are working on."
      />
    </PageShell>
  )
}
