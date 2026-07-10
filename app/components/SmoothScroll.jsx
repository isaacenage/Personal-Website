'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
// Lenis's stylesheet is inlined at the bottom of app/globals.css instead of
// imported here: a component-level CSS import lands BEFORE globals.css in
// the compiled bundle, which invalidates globals' @import url(...) rules
// (they must precede all other rules) and silently drops the entire
// template stylesheet chain.

// Sitewide Lenis smooth scrolling. Uses native window scroll under the
// hood, so scroll listeners, IntersectionObservers, and position: sticky
// (the hero stage) all keep working unchanged.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: true,
      // Smooth-scroll in-page anchor links (header nav, pricing CTAs).
      anchors: true,
    })

    // Programmatic scrolls elsewhere (ScrollToTop) go through this instance
    // so they don't fight Lenis for control of the scroll position.
    window.lenis = lenis

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return null
}

export default SmoothScroll
