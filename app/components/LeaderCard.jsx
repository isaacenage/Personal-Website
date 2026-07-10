import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'

/* Profile card for the Our Leaders index — photo beside a short bio, with
   a route through to the leader's full profile page. */
const LeaderCard = ({ name, role, caption, photo, blurb, href }) => (
  <AnimatedContainer
    delay={0.25}
    className="cosmic-grid-frame grid grid-cols-1 gap-10 p-8 md:grid-cols-[280px_1fr] md:p-12"
  >
    <div className="cosmic-founder-img self-start">
      <img src={photo} alt={name} />
    </div>

    <div className="cosmic-founder-block !p-0">
      <span className="role">{role}</span>
      <h3 className="name">{name}</h3>
      <p className="caption">{caption}</p>
      <p className="blurb">{blurb}</p>
      <div className="mt-8">
        <HudButton variant="secondary" href={href}>
          Read Profile
        </HudButton>
      </div>
    </div>
  </AnimatedContainer>
)

export default LeaderCard
