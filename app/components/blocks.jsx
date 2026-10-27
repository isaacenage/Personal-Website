import { Link } from 'next-view-transitions'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { COMPANY, PHOTOS, ROUTE_PHOTO } from '@/lib/site'

/* Shared building blocks used across pages. Every screen is built from the
   same named parts (lead, panel, card, tuck), so a route change morphs them
   from one layout into the next. */

const KIND = { commissions: 'Commission', opensource: 'Open source', dataviz: 'Data viz', side: 'Side project' }
export const external = (href) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

export const Arrow = ({ size = 18 }) => <ArrowUpRight size={size} weight="bold" aria-hidden />

/* A screen: one per route. `layout` picks the desktop composition. */
export const Screen = ({ layout, children }) => (
  <div className={`screen screen--${layout}`}>{children}</div>
)

/* The lead block: title and line. On phones it is the photo card at the top
   (the route's photograph, or the petrol field). */
export const Lead = ({ route, title, lead, children, as: H = 'h1' }) => {
  const photo = PHOTOS[ROUTE_PHOTO[route]]
  return (
    <div className="lead-block" style={photo ? { '--lead-photo': `url(${photo.src})` } : undefined}>
      <H>{title}</H>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  )
}

export const BtnArrow = ({ href, children, variant = 'primary', ...rest }) => (
  <Link href={href} className={`btn btn-${variant}`} {...rest}>
    {children}
    <span className="dot">
      <Arrow />
    </span>
  </Link>
)

export const ProjectIndex = ({ items }) => (
  <ul className="index">
    {items.map((item) => (
      <li key={item.title}>
        <a href={item.link} {...external(item.link)}>
          <img src={item.image} alt="" width="160" height="100" loading="lazy" />
          <span className="name">
            <strong>{item.title}</strong>
            <span>{item.category}</span>
          </span>
          <span className="kind">{KIND[item.group]}</span>
          <span className="circle">
            <Arrow />
          </span>
        </a>
      </li>
    ))}
  </ul>
)

export const kindOf = (item) => KIND[item.group]

/* Phone-only closing band; desktop has the Contact screen instead. */
export const Close = ({ title = 'Tell us what you are mapping.' }) => (
  <section className="close m-only">
    <div className="container">
      <h2>{title}</h2>
      <a className="close-mail" href={`mailto:${COMPANY.email}`}>
        {COMPANY.email}
      </a>
      <p>We reply with a written scope and a fixed quote.</p>
      <div className="actions">
        <BtnArrow href="/contact" variant="light">
          Start a project
        </BtnArrow>
      </div>
    </div>
  </section>
)
