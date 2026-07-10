import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'

/* Callout for the open geospatial data portal — shared by the Our Mission
   and Support Us pages. */
const OpenDataInitiative = () => (
  <section className="cosmic-section" id="open-data">
    <div className="cosmic-section-inner max-w-3xl">
      <AnimatedContainer className="cosmic-head--center mx-auto">
        <span className="cosmic-eyebrow">Open Initiative</span>
        <h2 className="cosmic-title">
          gis.byzenterra.org
        </h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          Our open geospatial data portal makes curated Philippine spatial datasets available to
          everyone — students, researchers, local governments, and builders alike. Layers ship
          cleaned and documented, in open formats, at no cost. It is the part of our work we are
          proudest of, and it grows with every project the firm takes on.
        </p>
        <div className="mt-10">
          <HudButton
            href="https://gis.byzenterra.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the Portal
          </HudButton>
        </div>
      </AnimatedContainer>
    </div>
  </section>
)

export default OpenDataInitiative
