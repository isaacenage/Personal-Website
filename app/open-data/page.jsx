import { Link } from 'next-view-transitions'
import { Screen, Lead, Close, Arrow, external } from '../components/blocks'
import { COMPANY } from '@/lib/site'
import { getPost } from '@/lib/blog'

export const metadata = {
  title: 'Open data',
  description: 'gis.byzenterra.org: cleaned, documented Philippine geospatial datasets, free for anyone to use.',
}

const post = getPost('opening-philippine-geodata')

export default function OpenDataPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/"
          title="Open Philippine geodata"
          lead="Cleaned, documented datasets at gis.byzenterra.org, free for anyone to use."
        />

        <section className="panel vt-panel" aria-label="About the portal">
          <div className="prose">
            {post.body
              .filter((b) => b.type === 'p')
              .slice(0, 2)
              .map((b) => (
                <p key={b.text}>{b.text}</p>
              ))}
            <p>
              <Link href={`/insights/${post.slug}`}>Read why we opened our data</Link>
            </p>
          </div>
        </section>

        <article className="float-card vt-card glass">
          <h2>Browse the datasets</h2>
          <p>Documented sources and coordinate systems, in open formats like GeoJSON and GeoPackage.</p>
          <div className="foot">
            Open the portal
            <a
              className="circle"
              href={COMPANY.portal}
              {...external(COMPANY.portal)}
              aria-label="Open the geodata portal"
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
