'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Rail from './Rail'
import { PHOTOS, ROUTE_PHOTO } from '@/lib/site'

export const routeOf = (pathname) => pathname.replace(/\/+$/, '') || '/'
export const photoFor = (pathname) => PHOTOS[ROUTE_PHOTO[routeOf(pathname)]]

/* The persistent window. On desktop it is fixed to the viewport and only its
   contents change between routes (the View Transitions API morphs the shared
   parts); on phones it is ordinary page flow. */
export default function Shell({ children }) {
  const pathname = usePathname()
  const photo = photoFor(pathname)

  return (
    <div className="frame">
      <div className="frame-clip" aria-hidden="true">
        {photo ? (
          <img
            key={photo.src}
            className="frame-photo"
            src={photo.src}
            alt=""
            width="2400"
            height="1800"
            fetchPriority="high"
          />
        ) : (
          <div className="frame-photo frame-field" />
        )}
      </div>
      <Header />
      <Rail />
      <main id="main" className="frame-body">
        {children}
      </main>
      <p className="frame-foot">
        {photo && (
          <span>
            Photo:{' '}
            <a href={photo.href} rel="noopener noreferrer">
              {photo.credit}
            </a>
            , CC BY-SA 4.0
          </span>
        )}
        <span>&copy; {new Date().getFullYear()} Zenterra Systems Solutions</span>
      </p>
    </div>
  )
}
