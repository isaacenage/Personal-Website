import { Link } from 'next-view-transitions'
import { COMPANY, NAV, PHOTOS } from '@/lib/site'

const LINKS = [
  ...NAV,
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <Link href="/" className="footer-logo" aria-label="Zenterra home">
          <img src="/assets/images/logo/zenterra-logo-dark.png" alt="Zenterra" width="619" height="600" loading="lazy" />
        </Link>

        <nav className="footer-links" aria-label="Footer">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a href={COMPANY.portal} rel="noopener noreferrer">
            Open data portal
          </a>
        </nav>

        <p className="footer-about">
          byZenterra is a brand of {COMPANY.legalName}, a business registered with the Department of
          Trade and Industry in the Philippines. Write to us at{' '}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. &copy; {year}{' '}
          {COMPANY.legalName}.
        </p>

        <p className="credits" data-credits>
          Photographs from Wikimedia Commons, CC BY-SA 4.0:{' '}
          {Object.values(PHOTOS).map((p, i, all) => (
            <span key={p.src}>
              <a href={p.href} rel="noopener noreferrer">
                {p.credit}
              </a>
              {i < all.length - 1 ? ', ' : '.'}
            </span>
          ))}{' '}
          Work mockups use the{' '}
          <a href="https://sketchfab.com/3d-models/iphone-17-pro-4541aa8a28324b33a2baaf81d263aaec" rel="noopener noreferrer">
            iPhone 17 Pro model by Ranguel
          </a>{' '}
          (CC BY 4.0) via Phone Mockup Studio, and devices.css.
        </p>
      </div>
    </footer>
  )
}
