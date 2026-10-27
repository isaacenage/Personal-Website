import { Screen, Lead, Close, Arrow, external } from '../components/blocks'
import { COMPANY } from '@/lib/site'

export const metadata = {
  title: 'About',
  description:
    'byZenterra is the brand of Zenterra Systems Solutions, a DTI-registered Philippine firm in GIS, spatial data infrastructure, analytics and web engineering.',
}

export default function AboutPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/about"
          title="A Filipino geospatial and software firm"
          lead="We turn location data into maps, dashboards and tools people can act on."
        />

        <section className="panel vt-panel" aria-label="Who we are">
          <div className="prose">
            <p>
              byZenterra advances GIS and spatial data infrastructure in the Philippines. We deliver
              end-to-end digital mapping, from fieldwork-grade analysis to the dashboards and web
              applications that put it in front of decision makers.
            </p>
            <p>
              Our work is built on years of field GIS practice in real estate, renewable energy and
              telecommunications. For each engagement we assemble the cartographers, analysts and
              developers it needs.
            </p>
            <p>
              Our mission: spatial data infrastructure for Philippine governments and businesses
              that is accurate, usable and increasingly open.
            </p>
          </div>
        </section>

        <article className="float-card vt-card glass">
          <h2>Our open data initiative</h2>
          <p>
            We publish curated Philippine geospatial datasets at gis.byzenterra.org, cleaned and
            documented, at no cost.
          </p>
          <div className="foot">
            Visit the portal
            <a
              className="circle"
              href={COMPANY.portal}
              {...external(COMPANY.portal)}
              aria-label="Visit the open geodata portal"
            >
              <Arrow />
            </a>
          </div>
        </article>
      </Screen>
      <Close />
    </>
  )
}
