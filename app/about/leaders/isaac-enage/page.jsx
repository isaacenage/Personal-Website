import PageShell from '../../../components/PageShell'
import TrackRecord from '../../../components/TrackRecord'
import PageCta from '../../../components/PageCta'
import { AnimatedContainer } from '@/components/ui/animated-container'

export const metadata = {
  title: 'Isaac Enage — Principal, byZenterra',
  description:
    'Isaac Enage is a GIS developer and lead AI developer (BS Geography, cum laude — UP Diliman) who stewards byZenterra after ten years of geospatial work for Philippine real estate, energy, and telecom leaders.',
}

export default function IsaacEnagePage() {
  return (
    <PageShell>
      <section className="cosmic-section cosmic-page-hero" id="profile">
        <div className="cosmic-section-inner">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[340px_1fr]">
            <AnimatedContainer>
              <div className="cosmic-founder-img">
                <img src="/assets/images/experiences/owner.webp" alt="Isaac Enage" />
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <span className="cosmic-eyebrow">Our Leaders · Principal</span>
              <h1 className="cosmic-title">Isaac Enage</h1>
              <div className="cosmic-line" />
              <p className="cosmic-desc">
                GIS Developer and Lead AI Developer — BS Geography, cum laude, University of the
                Philippines Diliman.
              </p>
              <p className="cosmic-desc">
                Isaac&apos;s path runs through the field, not around it: commercial demand mapping
                for Globe Telecom, nationwide land acquisition and right-of-way mapping for Solar
                Philippines, and sole-source GIS support for Ayala Land Premier&apos;s AKL
                Properties venture. Ten years of that work taught him a simple lesson —
                organizations don&apos;t lack spatial data, they lack spatial data they can act
                on.
              </p>
              <p className="cosmic-desc">
                byZenterra is his answer: a Filipino-grown, DTI-registered firm advancing GIS and
                spatial data infrastructure, where he stewards the firm&apos;s direction, its
                standard of craft, and its open geospatial data initiative at gis.byzenterra.org.
                He remains hands-on across engagements — mapping, modeling, shipping code, and
                leading the firm&apos;s AI development, now two years deep, alongside the rest of
                the bench.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      <TrackRecord />

      <PageCta
        eyebrow="Start a Conversation"
        title="Put the Experience to Work"
        description="If your organization runs on location — land, networks, assets, and the decisions that move them — Isaac and the byZenterra team speak your language."
      />
    </PageShell>
  )
}
