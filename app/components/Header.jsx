'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { HudButton } from '@/components/ui/hud-button'
import { WORK_CATEGORIES, setWorkCategory, useWorkCategory } from './work-category'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  {
    label: 'About Us',
    children: [
      { href: '/about/mission', label: 'Our Mission' },
      { href: '/about/values', label: 'Our Values' },
      { href: '/about/leaders', label: 'Our Leaders' },
    ],
  },
  {
    label: 'Get Involved',
    children: [
      { href: '/get-involved/support', label: 'Support Us' },
      { href: '/get-involved/services', label: 'Get Our Service' },
    ],
  },
  { href: '/our-work', label: 'Our Work' },
  { href: '/blogs', label: 'Blogs' },
]

const CTA_HREF = '/get-involved/services/#contacts'

// trailingSlash is on in next.config.js, so normalize before comparing.
const isActive = (pathname, href) => {
  const current = pathname.replace(/\/+$/, '') || '/'
  if (href === '/') return current === '/'
  return current === href || current.startsWith(`${href}/`)
}

const isGroupActive = (pathname, item) =>
  item.children.some((child) => isActive(pathname, child.href))

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const pathname = usePathname()

  /* On Our Work the header CTA slot holds the gallery category filter. */
  const onWorkPage = isActive(pathname, '/our-work')
  const activeCategory = useWorkCategory()

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Route change closes whatever is open; Escape closes the dropdown.
  useEffect(() => {
    setOpenGroup(null)
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpenGroup(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="cosmic-header">
        <Link href="/" className="cosmic-logo">
          <img src="/assets/images/logo/byzenterra-full.svg" alt="byZenterra" />
        </Link>

        <nav className="cosmic-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className={`cosmic-nav-group ${openGroup === item.label ? 'open' : ''}`}
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() =>
                  setOpenGroup((group) => (group === item.label ? null : group))
                }
              >
                <button
                  type="button"
                  className={`cosmic-nav-trigger ${
                    isGroupActive(pathname, item) ? 'active' : ''
                  }`}
                  aria-expanded={openGroup === item.label}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenGroup((group) => (group === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <ChevronDown size={12} strokeWidth={1.5} aria-hidden />
                </button>

                <div className="cosmic-dropdown">
                  <div className="cosmic-dropdown-panel">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={isActive(pathname, child.href) ? 'active' : ''}
                        onClick={() => setOpenGroup(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? 'active' : ''}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {onWorkPage ? (
          <div
            className={`cosmic-nav-group cosmic-filter-group ${
              openGroup === 'Category' ? 'open' : ''
            }`}
            onMouseEnter={() => setOpenGroup('Category')}
            onMouseLeave={() =>
              setOpenGroup((group) => (group === 'Category' ? null : group))
            }
          >
            <HudButton
              variant="secondary"
              className="cosmic-header-cta"
              aria-expanded={openGroup === 'Category'}
              aria-haspopup="true"
              onClick={() =>
                setOpenGroup((group) => (group === 'Category' ? null : 'Category'))
              }
            >
              Category
            </HudButton>

            <div className="cosmic-dropdown cosmic-dropdown--right">
              <div className="cosmic-dropdown-panel">
                {WORK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className={activeCategory === cat.key ? 'active' : ''}
                    aria-pressed={activeCategory === cat.key}
                    onClick={() => {
                      setWorkCategory(cat.key)
                      setOpenGroup(null)
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <HudButton href={CTA_HREF} variant="secondary" className="cosmic-header-cta">
            Start a Project
          </HudButton>
        )}

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

        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div key={item.label} className="cosmic-mobile-group">
              <span className="cosmic-mobile-group-label">{item.label}</span>
              {item.children.map((child) => (
                <Link key={child.href} href={child.href} onClick={closeMobileMenu}>
                  {child.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
              {item.label}
            </Link>
          )
        )}

        {onWorkPage && (
          <div className="cosmic-mobile-group">
            <span className="cosmic-mobile-group-label">Category</span>
            {WORK_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={activeCategory === cat.key ? 'active' : ''}
                aria-pressed={activeCategory === cat.key}
                onClick={() => {
                  setWorkCategory(cat.key)
                  closeMobileMenu()
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        <HudButton
          href={CTA_HREF}
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
