import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'

/* Closing call-to-action band for sub-pages. The contact form lives on the
   Get Our Service page, so this routes to /get-involved/services/#contacts. */
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
          <HudButton href="/get-involved/services/#contacts">Get in Touch</HudButton>
        </div>
      </AnimatedContainer>
    </div>
  </section>
)

export default PageCta
