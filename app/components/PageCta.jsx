import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'

/* Closing call-to-action band for sub-pages. The contact form lives on the
   home page, so this routes back to /#contacts. */
const PageCta = ({
  eyebrow = 'Start a Project',
  title = 'Ready When You Are',
  description = 'Tell us what you are mapping, measuring, or building — the byZenterra team will come back with a plan and a quote.',
}) => (
  <section className="cosmic-section">
    <div className="cosmic-section-inner">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">{eyebrow}</span>
        <h2 className="cosmic-title">{title}</h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">{description}</p>
        <div className="mt-10">
          <HudButton href="/#contacts">Get in Touch</HudButton>
        </div>
      </AnimatedContainer>
    </div>
  </section>
)

export default PageCta
