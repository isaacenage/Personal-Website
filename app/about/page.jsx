import { Screen, Lead, Close, Arrow, external } from '../components/blocks'
import { COMPANY, VALUES, SECTORS } from '@/lib/site'

export const metadata = {
  title: 'About',
  description:
    'byZenterra is the brand of Zenterra Systems Solutions, a DTI-registered Philippine firm in GIS, spatial data infrastructure, analytics and web engineering.',
}

/* CSS-only tabs (radio inputs): the panel switches without script, and on
   phones every tab's content simply stacks. */
const TABS = [
  {
    id: 'who',
    label: 'Who we are',
    body: (
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
          Our mission: spatial data infrastructure for Philippine governments and businesses that
          is accurate, usable and increasingly open.
        </p>
      </div>
    ),
  },
  {
    id: 'values',
    label: 'Values',
    body: (
      <dl className="pairs">
        {VALUES.map((v) => (
          <div key={v.title}>
            <dt>{v.title}</dt>
            <dd>{v.body}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: 'industries',
    label: 'Industries',
    body: (
      <dl className="pairs">
        {SECTORS.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: 'company',
    label: 'Company',
    body: (
      <dl className="facts">
        <div>
          <dt>Brand</dt>
          <dd>{COMPANY.brand}</dd>
        </div>
        <div>
          <dt>Registered name</dt>
          <dd>{COMPANY.legalName}</dd>
        </div>
        <div>
          <dt>Registration</dt>
          <dd>{COMPANY.registration}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </dd>
        </div>
        <div>
          <dt>Website</dt>
          <dd>{COMPANY.domain}</dd>
        </div>
      </dl>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/about"
          title="A Filipino geospatial and software firm"
          lead="We turn location data into maps, dashboards and tools people can act on."
        />

        <section className="panel vt-panel tabs" aria-label="About the company">
          {TABS.map((t, i) => (
            <input
              key={t.id}
              type="radio"
              name="about-tab"
              id={`tab-${t.id}`}
              defaultChecked={i === 0}
              className="tab-input"
            />
          ))}
          <div className="segmented tab-labels">
            {TABS.map((t) => (
              <label key={t.id} htmlFor={`tab-${t.id}`}>
                {t.label}
              </label>
            ))}
          </div>
          {TABS.map((t) => (
            <div key={t.id} className={`tab-body tab-body--${t.id}`}>
              <h2 className="tab-title">{t.label}</h2>
              {t.body}
            </div>
          ))}
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
