'use client'

import { useEffect, useState } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const FRAME_MS = 30

type HyperTextProps = {
  text: string
  className?: string
  duration?: number
  animateOnLoad?: boolean
}

/* Scrambling text reveal used by the 21st.dev HUD button (magicui
   hyper-text), rebuilt on setInterval — same left-to-right decode without
   framer-motion, matching the AnimatedContainer precedent. Re-runs on
   hover and whenever the text changes. */
export function HyperText({ text, className, duration = 800, animateOnLoad = true }: HyperTextProps) {
  const [display, setDisplay] = useState(text)
  const [runs, setRuns] = useState(animateOnLoad ? 1 : 0)

  useEffect(() => {
    setDisplay(text)
    if (runs === 0 || duration <= 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chars = text.split('')
    const steps = Math.max(1, Math.round(duration / FRAME_MS))
    let step = 0
    const id = window.setInterval(() => {
      step += 1
      const revealed = (step / steps) * chars.length
      setDisplay(
        chars
          .map((ch, i) =>
            ch === ' ' || i < revealed ? ch : LETTERS[Math.floor(Math.random() * LETTERS.length)]
          )
          .join('')
      )
      if (step >= steps) window.clearInterval(id)
    }, FRAME_MS)
    return () => window.clearInterval(id)
  }, [text, runs, duration])

  return (
    <span className={className} onMouseEnter={() => setRuns((r) => r + 1)}>
      {display}
    </span>
  )
}
