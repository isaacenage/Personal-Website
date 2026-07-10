'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

type TextHoverEffectProps = {
  text: string
  className?: string
}

/* Giant outline text whose stroke ignites with the cosmic gradient around
   the cursor — the signature moment of the 21st.dev @nurui hover-footer,
   rebuilt without the motion dependency. Mouse movement writes the reveal
   position straight to the SVG through a small lerp loop (no setState per
   frame — same no-rerender rule the hero follows), and the loop parks
   itself once the reveal catches up with the cursor. */
export function TextHoverEffect({ text, className }: TextHoverEffectProps) {
  /* useId can emit colons, which break url(#…) references */
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const gradientId = `thv-gradient-${uid}`
  const revealId = `thv-reveal-${uid}`
  const maskId = `thv-mask-${uid}`

  const svgRef = useRef<SVGSVGElement>(null)
  const revealRef = useRef<SVGRadialGradientElement>(null)
  const rafRef = useRef<number | null>(null)
  const shown = useRef({ x: 50, y: 50 })
  const target = useRef({ x: 50, y: 50 })

  const [hovered, setHovered] = useState(false)
  /* Touch screens and reduced-motion users get the fully lit text instead
     of a cursor chase they can't perform. */
  const [staticReveal, setStaticReveal] = useState(false)

  useEffect(() => {
    if (
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setStaticReveal(true)
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const step = () => {
    const { current: pos } = shown
    pos.x += (target.current.x - pos.x) * 0.16
    pos.y += (target.current.y - pos.y) * 0.16

    revealRef.current?.setAttribute('cx', `${pos.x}%`)
    revealRef.current?.setAttribute('cy', `${pos.y}%`)

    const settled =
      Math.abs(target.current.x - pos.x) < 0.05 && Math.abs(target.current.y - pos.y) < 0.05
    rafRef.current = settled ? null : requestAnimationFrame(step)
  }

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0 || rect.height === 0) return

    target.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    }
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(step)
  }

  const lit = hovered || staticReveal

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 660 120"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b7efff" />
          <stop offset="35%" stopColor="#6fe3ff" />
          <stop offset="65%" stopColor="#3a6bff" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>

        <radialGradient ref={revealRef} id={revealId} r="24%" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>

        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${revealId})`} />
        </mask>
      </defs>

      {/* Resting outline — always there, so the word never disappears. */}
      <text
        className="thv-text thv-text--base"
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="600"
        lengthAdjust="spacingAndGlyphs"
      >
        {text}
      </text>

      {/* Gradient stroke, unmasked on touch / reduced motion, otherwise
          revealed through the cursor-following radial mask. */}
      <text
        className={`thv-text thv-text--gradient ${lit ? 'is-lit' : ''}`}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="600"
        lengthAdjust="spacingAndGlyphs"
        stroke={`url(#${gradientId})`}
        mask={staticReveal ? undefined : `url(#${maskId})`}
      >
        {text}
      </text>
    </svg>
  )
}
