import Link from 'next/link'
import { Globe, Mail, MapPin } from 'lucide-react'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'

const FOOTER_COLUMNS = [
  {
    heading: 'About Us',
    links: [
      { href: '/about/mission', label: 'Our Mission' },
      { href: '/about/values', label: 'Our Values' },
      { href: '/about/leaders', label: 'Our Leaders' },
    ],
  },
  {
    heading: 'Get Involved',
    links: [
      { href: '/get-involved/support', label: 'Support Us' },
      { href: '/get-involved/services', label: 'Get Our Service' },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { href: '/', label: 'Home' },
      { href: '/our-work', label: 'Our Work' },
      { href: '/blogs', label: 'Blogs' },
    ],
  },
]

/* Sitewide footer — the 21st.dev @nurui hover-footer recomposed on the
   cosmic tokens: link columns and a connect column up top, the giant
   cursor-lit BYZENTERRA wordmark below. Shared by every page. */
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="cosmic-footer">
      <div className="cosmic-footer-glow" aria-hidden="true" />

      <div className="cosmic-footer-inner">
        <div className="cosmic-footer-grid">
          <div className="cosmic-footer-brand">
            <Link href="/" className="logo">
              <img src="/assets/images/logo/byzenterra-full.svg" alt="byZenterra" />
            </Link>
            <p>
              A Filipino-grown firm advancing GIS and spatial data infrastructure — end-to-end
              digital mapping for modern governance and private-sector innovation across the
              Philippines.
            </p>
            <span className="cosmic-footer-badge">
              <span className="dot" aria-hidden="true" />
              DTI-Registered · Philippines
            </span>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} className="cosmic-footer-col" aria-label={column.heading}>
              <h4>{column.heading}</h4>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="cosmic-footer-col cosmic-footer-connect">
            <h4>Connect</h4>
            <ul>
              <li>
                <Globe size={15} strokeWidth={1.5} aria-hidden />
                <a href="https://gis.byzenterra.org" target="_blank" rel="noopener noreferrer">
                  Open Data Portal
                </a>
              </li>
              <li>
                <Mail size={15} strokeWidth={1.5} aria-hidden />
                <Link href="/get-involved/services/#contacts">Start a Project</Link>
              </li>
              <li>
                <MapPin size={15} strokeWidth={1.5} aria-hidden />
                <span>Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="cosmic-footer-divider" aria-hidden="true" />

        <div className="cosmic-footer-bottom">
          <p>
            &copy; {currentYear} byZenterra · All rights reserved
          </p>
          <p>
            <a target="_blank" href="https://www.byzenterra.org" rel="noopener noreferrer">
              byzenterra.org
            </a>
            <span className="sep" aria-hidden="true">
              ·
            </span>
            <a target="_blank" href="https://gis.byzenterra.org" rel="noopener noreferrer">
              gis.byzenterra.org
            </a>
          </p>
        </div>

        <div className="cosmic-footer-hovertext">
          <TextHoverEffect text="BYZENTERRA" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
