'use client'

import { useEffect, useRef } from 'react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { ArrowUpRight01Icon } from '@/app/components/icons/arrow-up-right-01'
import { Menu01Icon } from '@/app/components/icons/menu-01'
import { Cancel01Icon } from '@/app/components/icons/cancel-01'
import { SECTIONS, sectionOf, routeOf } from '@/lib/site'

/* The frame's top edge: logo pill, the notch holding the current section's
   pages (the rail switches sections), and the action pill. The mobile menu
   is a native <details>, so it works without JS; the effect only closes it
   after navigation. */
export default function Header() {
  const pathname = usePathname()
  const menuRef = useRef(null)

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  const route = routeOf(pathname)
  const section = sectionOf(route)
  const pages = section?.pages.length > 1 ? section.pages : []

  return (
    <header className="frame-top">
      <Link href="/" className="corner-pill brand" aria-label="Zenterra home">
        <img src="/assets/images/logo/zenterra-lockup-dark.png" alt="Zenterra" width="774" height="200" />
      </Link>

      {pages.length > 0 && (
        <nav className="notch" aria-label={`${section.label} pages`}>
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={route === p.href ? 'page' : undefined}
              style={route === p.href ? { viewTransitionName: 'nav-active' } : undefined}
            >
              {p.label}
            </Link>
          ))}
        </nav>
      )}

      <Link href="/contact" className="corner-pill corner-pill--cta top-cta">
        Start a project
        <span className="dot" aria-hidden="true">
          <ArrowUpRight01Icon size={18} />
        </span>
      </Link>

      <details className="mobile-nav" ref={menuRef}>
        <summary aria-label="Menu">
          <Menu01Icon className="icon-open" size={22} aria-hidden />
          <Cancel01Icon className="icon-close" size={22} aria-hidden />
        </summary>
        <nav className="mobile-panel" aria-label="Mobile">
          {SECTIONS.map((s) => (
            <div key={s.href} className="mobile-section">
              <Link href={s.href} aria-current={s === section && route === s.href ? 'page' : undefined}>
                {s.label}
              </Link>
              {s === section && pages.length > 0 && (
                <div className="mobile-sub">
                  {pages.map((p) => (
                    <Link key={p.href} href={p.href} aria-current={route === p.href ? 'page' : undefined}>
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn btn-primary">
            Start a project
            <span className="dot" aria-hidden="true">
              <ArrowUpRight01Icon size={18} />
            </span>
          </Link>
        </nav>
      </details>
    </header>
  )
}
