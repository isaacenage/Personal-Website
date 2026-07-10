import PageShell from '../../components/PageShell'
import PageHero from '../../components/PageHero'
import ValuesGrid from '../../components/ValuesGrid'
import PageCta from '../../components/PageCta'
import { AnimatedContainer } from '@/components/ui/animated-container'

export const metadata = {
  title: 'Our Values — byZenterra',
  description:
    'Precision, clarity, craft, partnership, openness, and stewardship — the six commitments every byZenterra engagement is held to.',
}

export default function OurValuesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Our Values"
        title="What We Refuse to Compromise"
        description="Values are easy to declare and hard to keep. Ours were not written for this page — they were learned in the field, one hard project at a time, and they decide how byZenterra maps, builds, and treats the people we work with."
      />

      <ValuesGrid />

      <section className="cosmic-section">
        <div className="cosmic-section-inner max-w-3xl">
          <AnimatedContainer className="cosmic-article">
            <blockquote>
              A value that only appears on a slide is a slogan. Ours get checked against every
              map, dashboard, and line of code we hand over — and you should hold us to them.
            </blockquote>
          </AnimatedContainer>
        </div>
      </section>

      <PageCta
        eyebrow="Put Us to the Test"
        title="See the Values at Work"
        description="The fastest way to judge a firm's values is to work with it. Bring us a project and watch how we scope, build, and hand over."
      />
    </PageShell>
  )
}
