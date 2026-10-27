import { Link } from 'next-view-transitions'
import { Compass, MapPin, Printer, Ruler } from '@phosphor-icons/react/dist/ssr'
import { Screen, Lead, Arrow, BtnArrow, ProjectIndex, Close, external } from './components/blocks'
import { SERVICES, WORK, SECTORS, PROCESS, COMPANY, PHOTOS, ORG_TYPES, TIMELINES } from '@/lib/site'

const find = (title) => WORK.find((w) => w.title === title)
const SELECTED = [
  'Anu Na, Meralco?',
  'Pasig Sagip',
  'PH Geospatial Downloader',
  'QGIS Dashboard',
  "Joe's Commercial Cleaning",
  'UPD Cartography',
].map(find)
const meralco = find('Anu Na, Meralco?')
const sagip = find('Pasig Sagip')

export default function Home() {
  return (
    <>
      <Screen layout="home">
        <Lead
          route="/"
          title="Maps and software for the Philippines"
          lead="GIS, analytics and web engineering for teams that run on location."
        >
          <form className="inquiry glass" action="/contact/" method="get">
            <label>
              <span>Service</span>
              <select name="service" defaultValue="">
                <option value="">Not sure yet</option>
                {SERVICES.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Organization</span>
              <select name="org" defaultValue={ORG_TYPES[0]}>
                {ORG_TYPES.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Timeline</span>
              <select name="timeline" defaultValue={TIMELINES[1]}>
                {TIMELINES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-primary">
              Start a project
              <span className="dot">
                <Arrow />
              </span>
            </button>
          </form>
        </Lead>

        <aside className="tuck vt-tuck">
          <div>
            <h2>Open geodata portal</h2>
            <p>Cleaned, documented Philippine datasets, free for anyone to use.</p>
            <div className="row">
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
          </div>
          <img
            src="/assets/images/latest-portfolio/geodata.webp"
            alt=""
            width="132"
            height="160"
            loading="lazy"
          />
        </aside>

        <article className="float-card vt-card glass">
          <h2>Title Plotter PH</h2>
          <p className="sub">Land title plotting tool</p>
          <p>
            Reads the technical description on a TCT and draws the lot, ready to check against the
            map.
          </p>
          <ul className="specs">
            <li>
              <MapPin size={20} aria-hidden />
              Tie point
            </li>
            <li>
              <Ruler size={20} aria-hidden />
              Area, misclosure
            </li>
            <li>
              <Printer size={20} aria-hidden />
              Print report
            </li>
          </ul>
          <div className="foot">
            See our work
            <Link className="circle" href="/work" aria-label="See our work">
              <Arrow />
            </Link>
          </div>
        </article>

        <div className="m-only">
          <section className="section">
            <div className="container bento">
              <a className="tile" href={meralco.link} {...external(meralco.link)}>
                <div className="tile-media">
                  <img
                    src={meralco.image}
                    alt="Anu Na, Meralco? live brownout map of Metro Manila"
                    width="800"
                    height="500"
                    loading="lazy"
                  />
                </div>
                <div className="tile-foot">
                  <div>
                    <h3>{meralco.title}</h3>
                    <p>{meralco.category} for Metro Manila</p>
                  </div>
                  <span className="circle">
                    <Arrow />
                  </span>
                </div>
              </a>

              <div className="tile">
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
                <div className="tile-note">
                  <span>
                    {COMPANY.legalName}, registered with the DTI and working from the Philippines.
                  </span>
                  <Link className="circle" href="/about" aria-label="About the company">
                    <Arrow />
                  </Link>
                </div>
              </div>

              <Link className="photo-tile" href="/about">
                <img
                  src={PHOTOS.batad.src}
                  alt={PHOTOS.batad.alt}
                  width="1800"
                  height="1200"
                  loading="lazy"
                />
                <div className="tile-foot">
                  <div>
                    <h3>Field-grade GIS, nationwide</h3>
                    <p>From terraced uplands to the metro</p>
                  </div>
                  <span className="circle circle--light">
                    <Arrow />
                  </span>
                </div>
              </Link>
            </div>
          </section>

          <section className="section">
            <div className="container with-aside">
              <div className="head">
                <h2>What we do</h2>
                <p className="lead">Six service lines, one standard of craft.</p>
                <div className="actions">
                  <BtnArrow href="/services" variant="quiet">
                    Service details
                  </BtnArrow>
                </div>
              </div>
              <ol className="rows">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="photo-band">
                <img
                  src={PHOTOS.marikina.src}
                  alt={PHOTOS.marikina.alt}
                  width="1800"
                  height="1350"
                  loading="lazy"
                />
                <article className="float-card glass">
                  <h2>{sagip.title}</h2>
                  <p className="sub">{sagip.category} for local planning</p>
                  <p>
                    Hazard layers for Pasig in one browser map, so planners and residents can see
                    the risk where they live.
                  </p>
                  <div className="foot">
                    Open the map
                    <a
                      className="circle"
                      href={sagip.link}
                      {...external(sagip.link)}
                      aria-label={`Open ${sagip.title}`}
                    >
                      <Compass size={20} weight="bold" aria-hidden />
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="head head--row">
                <h2>Selected work</h2>
                <BtnArrow href="/work" variant="quiet">
                  All projects
                </BtnArrow>
              </div>
              <ProjectIndex items={SELECTED} />
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="head">
                <h2>How a project runs</h2>
              </div>
              <ol className="steps">
                {PROCESS.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </Screen>
      <Close />
    </>
  )
}
