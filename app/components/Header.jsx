'use client'

import { useEffect, useRef } from 'react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, List, X } from '@phosphor-icons/react/dist/ssr'
import { NAV } from '@/lib/site'

// trailingSlash is on in next.config.js, so normalize before comparing.
export const isActive = (pathname, href) => {
  const current = pathname.replace(/\/+$/, '') || '/'
  if (href === '/') return current === '/'
  return current === href || current.startsWith(`${href}/`)
}

/* The frame's top edge: logo pill, the notch holding the nav, and the
   action pill. The mobile menu is a native <details>, so it works without JS;
   the effect only closes it after navigation. */
export default function Header() {
  const pathname = usePathname()
  const menuRef = useRef(null)

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  // only the notch copy carries the morph name; a name must be unique per page
  const links = (morph) => NAV.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={isActive(pathname, item.href) ? 'page' : undefined}
      style={morph && isActive(pathname, item.href) ? { viewTransitionName: 'nav-active' } : undefined}
    >
      {item.label}
    </Link>
  ))

  return (
    <header className="frame-top">
      <Link href="/" className="corner-pill brand" aria-label="Zenterra home">
        <img src="/assets/images/logo/zenterra-lockup-dark.png" alt="Zenterra" width="774" height="200" />
      </Link>

      <nav className="notch" aria-label="Main">
        {links(true)}
      </nav>

      <Link href="/contact" className="corner-pill corner-pill--cta top-cta">
        Start a project
        <span className="dot" aria-hidden="true">
          <ArrowUpRight size={18} weight="bold" />
        </span>
      </Link>

      <details className="mobile-nav" ref={menuRef}>
        <summary aria-label="Menu">
          <List className="icon-open" size={22} aria-hidden />
          <X className="icon-close" size={22} aria-hidden />
        </summary>
        <nav className="mobile-panel" aria-label="Mobile">
          {links(false)}
          <Link href="/contact" className="btn btn-primary">
            Start a project
            <span className="dot" aria-hidden="true">
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </Link>
        </nav>
      </details>
    </header>
  )
}
