import { AnimatedContainer } from '@/components/ui/animated-container'

/* Opening block for sub-pages (which skip the WebGL horizon hero):
   extra top padding clears the fixed header, everything else reuses the
   cosmic section scaffolding. */
const PageHero = ({ eyebrow, title, description }) => (
  <section className="cosmic-section cosmic-page-hero">
    <div className="cosmic-section-inner">
      <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
        <span className="cosmic-eyebrow">{eyebrow}</span>
        <h1 className="cosmic-title">{title}</h1>
        <div className="cosmic-line" />
        {description && <p className="cosmic-desc">{description}</p>}
      </AnimatedContainer>
    </div>
  </section>
)

export default PageHero
