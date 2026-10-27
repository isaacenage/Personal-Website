import { Screen, Lead, Close } from '../components/blocks'
import { SERVICES } from '@/lib/site'

export const metadata = {
  title: 'Services',
  description:
    'Web mapping, geospatial analysis, dashboards, web development, workflow automation and visual assets from byZenterra.',
}

export default function ServicesPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/services"
          title="From raw coordinates to tools people use"
          lead="Six service lines, each scoped in writing and supported after launch."
        />

        <section className="panel vt-panel" aria-label="Services">
          <ol className="service-grid">
            {SERVICES.map((s) => (
              <li key={s.slug} id={s.slug}>
                <h2>{s.title}</h2>
                <p>{s.short}</p>
                <p className="small">{s.deliverables.join(', ')}</p>
              </li>
            ))}
          </ol>
        </section>
      </Screen>
      <Close />
    </>
  )
}
