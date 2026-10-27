import { Link } from 'next-view-transitions'
import { Screen, Lead, Close, Arrow, ProjectIndex } from '../components/blocks'
import { WORK, FEATURED, SERVICES, SECTORS } from '@/lib/site'

export const metadata = {
  title: 'Highlights',
  description: 'A short tour of byZenterra: selected maps, tools and client sites, and the numbers behind the studio.',
}

export default function HighlightsPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/"
          title="Selected work"
          lead="Six projects that show the range, from live outage maps to client websites."
        />

        <section className="panel vt-panel" aria-label="Selected work">
          <ProjectIndex items={FEATURED} />
        </section>

        <article className="float-card vt-card glass">
          <dl className="figures">
            <div>
              <dt>Live projects</dt>
              <dd>{WORK.length}</dd>
            </div>
            <div>
              <dt>Service lines</dt>
              <dd>{SERVICES.length}</dd>
            </div>
            <div>
              <dt>Industries</dt>
              <dd>{SECTORS.length}</dd>
            </div>
          </dl>
          <div className="foot">
            All projects
            <Link className="circle" href="/work" aria-label="See all projects">
              <Arrow />
            </Link>
          </div>
        </article>
      </Screen>
      <Close />
    </>
  )
}
