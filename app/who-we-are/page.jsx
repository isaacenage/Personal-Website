import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import MissionValues from '../components/MissionValues'
import TrackRecord from '../components/TrackRecord'
import Leadership from '../components/Leadership'
import PageCta from '../components/PageCta'

export const metadata = {
  title: 'Who We Are — byZenterra',
  description:
    'byZenterra is a geospatial, analytics, and web studio built on years of GIS work for Philippine real estate, energy, and telecom leaders.',
}

export default function WhoWeArePage() {
  return (
    <>
      <Header />
      <div className="cosmic-backdrop" aria-hidden="true" />
      <main className="cosmic-main">
        <PageHero
          eyebrow="Who We Are"
          title="A Studio Built Where Geography Meets Engineering"
          description="byZenterra is a creative technology studio for organizations that run on location — land, networks, assets, and the decisions that move them. We pair fieldwork-grade GIS discipline with modern software craft."
        />
        <MissionValues />
        <TrackRecord />
        <Leadership />
        <PageCta
          title="Work With the Studio"
          description="If your organization runs on location data, we speak your language. Reach out and tell us what you are trying to decide."
        />
        <Footer />
      </main>
    </>
  )
}
