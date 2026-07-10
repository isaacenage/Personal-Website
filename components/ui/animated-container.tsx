'use client'

import React, { useEffect, useRef, useState } from 'react'

type AnimatedContainerProps = {
  delay?: number
  className?: string
  children: React.ReactNode
}

/* IntersectionObserver-based stand-in for the motion/react whileInView
   reveal used by the 21st.dev demos — same blur/rise/fade curve without
   pulling in a new animation dependency. */
export function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduceMotion(true)
      setInView(true)
      return
    }

    const el = ref.current
    if (!el) return

    // threshold 0 + a bottom rootMargin: a ratio threshold can never be
    // reached by containers much taller than the viewport (e.g. stacked
    // card grids on small screens), which would leave them invisible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduceMotion
          ? undefined
          : {
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(-8px)',
              filter: inView ? 'blur(0px)' : 'blur(4px)',
              transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s, filter 0.8s ease ${delay}s`,
            }
      }
    >
      {children}
    </div>
  )
}
