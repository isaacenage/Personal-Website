import { AnimatedContainer } from '@/components/ui/animated-container'

/* Brief leadership note — the studio is the story, the founder is context. */
const Leadership = () => (
  <section className="cosmic-section" id="leadership">
    <div className="cosmic-section-inner max-w-3xl">
      <AnimatedContainer className="cosmic-head--center mx-auto">
        <span className="cosmic-eyebrow">Leadership</span>
        <h2 className="cosmic-title">Founded in the Field</h2>
        <div className="cosmic-line" />
        <p className="cosmic-desc">
          byZenterra was founded by Isaac Enage, a geographer and GIS specialist (BS Geography,
          cum laude — University of the Philippines Diliman) after six years turning spatial data
          into decisions for real estate, energy, and telecom teams. Today the studio carries
          that fieldwork discipline into every map, dashboard, and application it ships.
        </p>
      </AnimatedContainer>
    </div>
  </section>
)

export default Leadership
