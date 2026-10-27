'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { Home01Icon } from '@/app/components/icons/home-01'
import { EarthIcon } from '@/app/components/icons/earth'
import { Layers01Icon } from '@/app/components/icons/layers-01'
import { Tag01Icon } from '@/app/components/icons/tag-01'
import { InformationCircleIcon } from '@/app/components/icons/information-circle'
import { File01Icon } from '@/app/components/icons/file-01'
import { Mail01Icon } from '@/app/components/icons/mail-01'
import { sectionOf, routeOf } from '@/lib/site'

const ITEMS = [
  { href: '/', label: 'Home', icon: Home01Icon },
  { href: '/work', label: 'Work', icon: EarthIcon },
  { href: '/services', label: 'Services', icon: Layers01Icon },
  { href: '/pricing', label: 'Pricing', icon: Tag01Icon },
  { href: '/about', label: 'About', icon: InformationCircleIcon },
  { href: '/insights', label: 'Insights', icon: File01Icon },
  { href: '/contact', label: 'Contact', icon: Mail01Icon },
]

/* Vertical section rail on the frame's left edge, desktop only. */
export default function Rail() {
  const current = sectionOf(routeOf(usePathname()))?.href
  const at = ITEMS.findIndex((it) => it.href === current)
  return (
    <nav className="rail glass" aria-label="Sections">
      <span className="rail-pill" aria-hidden="true" />
      <div className="rail-links">
        {ITEMS.map(({ href, label, icon: Icon }, i) => (
          <Link
            key={href}
            href={href}
            data-nav={i > at ? 'down' : i < at ? 'up' : undefined}
            aria-current={current === href ? 'page' : undefined}
          >
            <Icon size={20} aria-hidden />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
