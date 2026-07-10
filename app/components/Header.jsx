'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HudButton } from '@/components/ui/hud-button'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/who-we-are', label: 'Who We Are' },
  { href: '/insights', label: 'Insights' },
]

// trailingSlash is on in next.config.js, so normalize before comparing.
const isActive = (pathname, href) => {
  const current = pathname.replace(/\/+$/, '') || '/'
  if (href === '/') return current === '/'
  return current === href || current.startsWith(`${href}/`)
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header className="cosmic-header">
        <Link href="/" className="cosmic-logo">
          <img src="/assets/images/logo/byzenterra-full.svg" alt="byZenterra" />
        </Link>

        <nav className="cosmic-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <HudButton href="/#contacts" variant="secondary" className="cosmic-header-cta">
          Start a Project
        </HudButton>

        <button
          className="cosmic-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`cosmic-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="cosmic-mobile-close" onClick={closeMobileMenu} aria-label="Close menu">
          <i className="fa-sharp fa-light fa-xmark"></i>
        </button>

        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
            {item.label}
          </Link>
        ))}

        <HudButton
          href="/#contacts"
          variant="secondary"
          className="cosmic-header-cta"
          onClick={closeMobileMenu}
        >
          Start a Project
        </HudButton>
      </div>
    </>
  )
}

export default Header
