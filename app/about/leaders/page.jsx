import PageShell from '../../components/PageShell'
import PageHero from '../../components/PageHero'
import LeaderCard from '../../components/LeaderCard'
import PageCta from '../../components/PageCta'
import { AnimatedContainer } from '@/components/ui/animated-container'

export const metadata = {
  title: 'Our Leaders — byZenterra',
  description:
    'byZenterra keeps its leadership close to the work — meet Isaac Enage, Principal, and the wider bench of specialists behind the firm.',
}

export default function OurLeadersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Our Leaders"
        title="Led From the Field"
        description="byZenterra keeps its leadership close to the work. The people who set the firm's direction are the same people mapping parcels, reviewing code, and sitting across the table from the teams we serve."
      />

      <section className="cosmic-section pt-0" id="leaders">
        <div className="cosmic-section-inner">
          <LeaderCard
            name="Isaac Enage"
            role="Principal"
            caption="GIS Developer · Lead AI Developer"
            photo="/assets/images/experiences/owner.webp"
            blurb="A GIS developer and lead AI developer (BS Geography, cum laude — University of the Philippines Diliman) who has spent ten years turning spatial data into decisions for Philippine real estate, energy, and telecommunications leaders — the last two also leading AI development. Isaac stewards byZenterra's direction, its standard of craft, and its open geospatial data initiative."
            href="/about/leaders/isaac-enage"
          />
        </div>
      </section>

      <section className="cosmic-section pt-0" id="wider-bench">
        <div className="cosmic-section-inner max-w-3xl">
          <AnimatedContainer className="cosmic-head--center mx-auto">
            <span className="cosmic-eyebrow">The Wider Bench</span>
            <h2 className="cosmic-title">
              Assembled Per
              <br />
              Engagement
            </h2>
            <div className="cosmic-line" />
            <p className="cosmic-desc">
              Beyond its principal, byZenterra draws on a trusted network of cartographers,
              geodetic professionals, developers, and analysts — assembled to fit each
              engagement, so you get exactly the expertise your project needs and never pay for
              bench weight it doesn&apos;t.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      <PageCta
        eyebrow="Meet the Team"
        title="Talk to the People Doing the Work"
        description="No account managers, no hand-offs — when you write to byZenterra, the people who will build your project are the ones who reply."
      />
    </PageShell>
  )
}
