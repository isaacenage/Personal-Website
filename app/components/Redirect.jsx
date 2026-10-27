'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/* Old URLs from the previous site layout. Static export has no server
   redirects, so these client stubs forward bookmarks and search results. */
export default function Redirect({ to }) {
  const router = useRouter()
  useEffect(() => router.replace(to), [router, to])
  return (
    <section className="section">
      <div className="container">
        <p className="lead">
          This page has moved to <a href={to}>{to}</a>.
        </p>
      </div>
    </section>
  )
}
