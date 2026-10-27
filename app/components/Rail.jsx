'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import {
  House,
  MapTrifold,
  StackSimple,
  Tag,
  Article,
  EnvelopeSimple,
} from '@phosphor-icons/react/dist/ssr'
import { isActive } from './Header'

const ITEMS = [
  { href: '/', label: 'Home', icon: House },
  { href: '/work', label: 'Work', icon: MapTrifold },
  { href: '/services', label: 'Services', icon: StackSimple },
  { href: '/pricing', label: 'Pricing', icon: Tag },
  { href: '/insights', label: 'Insights', icon: Article },
  { href: '/contact', label: 'Contact', icon: EnvelopeSimple },
]

/* Vertical shortcut rail on the frame's left edge, desktop only. */
export default function Rail() {
  const pathname = usePathname()
  return (
    <nav className="rail glass" aria-label="Shortcuts">
      {ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(pathname, href) ? 'page' : undefined}
          style={isActive(pathname, href) ? { viewTransitionName: 'rail-active' } : undefined}
        >
          <Icon size={20} aria-hidden />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}
