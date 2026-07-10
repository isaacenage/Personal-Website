'use client'

import { useEffect, useRef } from 'react'

// Scroll progress is written straight to the DOM (no React state) so the
// component never re-renders while the user scrolls — on low-end machines
// a per-frame setState here was measurable jank.
const ScrollToTop = () => {
  const boxRef = useRef(null)
  const waterRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const box = boxRef.current
        const water = waterRef.current
        if (!box || !water) return

        const scrollTop = window.pageYOffset
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

        box.style.display = scrollTop > 300 ? 'block' : 'none'
        water.style.transform = `translate(0px, ${100 - progress}%)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToTop = () => {
    // Route through Lenis when it's active so the two scroll systems don't
    // fight; fall back to the native API (reduced-motion sessions).
    if (window.lenis) {
      window.lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={boxRef}
      className="scrollToTop"
      style={{ display: 'none' }}
      onClick={scrollToTop}
    >
      <div className="arrowUp">
        <i className="fa-light fa-arrow-up"></i>
      </div>
      <div ref={waterRef} className="water" style={{ transform: 'translate(0px, 100%)' }}>
        <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
          <use xlinkHref="#wave"></use>
        </svg>
        <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
          <use xlinkHref="#wave"></use>
        </svg>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 560 20"
          style={{ display: 'none' }}
        >
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z" fill="#"></path>
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z" fill="#"></path>
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z" fill="#"></path>
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z" fill="#"></path>
          </symbol>
        </svg>
      </div>
    </div>
  )
}

export default ScrollToTop
