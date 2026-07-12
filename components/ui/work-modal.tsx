'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'

/* Shared vocabulary for the two Our Work views (3d-image-gallery's card
   galaxy and work-showcase's magazine grid): the work item shape, the cosmic
   accent tokens, the chamfer helper, the monotone image treatment, and the
   detail modal both views open on click. Extracted from 3d-image-gallery.tsx
   when the showcase view was added. */

export type WorkItem = {
  id: string | number
  title: string
  category: string
  image: string
  link: string
}

export const ACCENT = '#6fe3ff'
export const CARD_BG = 'var(--cosmos-ink, #0b0e18)'

/* Uniform ice-blue monotone for thumbnails: grayscale re-tinted toward the
   aurora-cyan accent (sepia lands ~37° of hue, +160° reaches ~197° = #6fe3ff)
   so the screenshots stop competing with the cosmic palette. Hover restores
   true color — both states list the same filter functions so they
   interpolate instead of snapping. The modal image stays unfiltered. */
export const IMG_MONO_FILTER =
  'grayscale(1) sepia(1) hue-rotate(160deg) saturate(1.5) brightness(0.85) contrast(1.05)'
export const IMG_COLOR_FILTER =
  'grayscale(0) sepia(0) hue-rotate(0deg) saturate(1) brightness(1) contrast(1)'

/* clip-path chamfer for elements whose size isn't fixed (modal, images) —
   clip-path can't draw a border, so bordered plates layer two clipped divs */
export const chamferClip = (cut: number) =>
  `polygon(${cut}px 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, ${cut}px 100%, 0 calc(100% - ${cut}px), 0 ${cut}px)`

/* =========================
   Detail modal (portal — sections create stacking contexts)
   ========================= */

export function WorkModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const rotateX = (e.clientY - rect.top - rect.height / 2) / 15
    const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 15
    cardRef.current.style.transition = ''
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'transform 0.5s ease-out'
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* backdrop-filter is banned sitewide — near-opaque solid instead */
        background: 'rgba(0, 0, 0, 0.85)',
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 16px' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            /* explicit dims: the template CSS stretches bare buttons to 100% */
            position: 'absolute',
            top: -44,
            right: 0,
            width: 36,
            height: 36,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <X size={28} />
        </button>

        <div style={{ perspective: '1000px' }}>
          {/* preserve-3d dropped (no 3D children) so drop-shadow can trace
             the chamfered silhouette — box-shadow gets clipped away */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ filter: 'drop-shadow(0 40px 60px rgba(0, 0, 0, 0.55))' }}
          >
            {/* outer gradient layer peeks 1px past the inner fill to draw
               the outline, since clip-path can't render a border */}
            <div
              style={{
                clipPath: chamferClip(14),
                background:
                  'linear-gradient(180deg, rgba(111, 227, 255, 0.85) 0%, rgba(111, 227, 255, 0.25) 60%, rgba(111, 227, 255, 0.45) 100%)',
                padding: 1,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  clipPath: chamferClip(13),
                  background: CARD_BG,
                  padding: '26px 16px 16px',
                }}
              >
                {/* top-right dot cluster, the HUD buttons' signature */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  style={{ position: 'absolute', top: 9, right: 12, display: 'block' }}
                >
                  {[
                    { cx: 3, cy: 3 },
                    { cx: 3, cy: 9 },
                    { cx: 9, cy: 3 },
                    { cx: 9, cy: 9 },
                  ].map((dot) => (
                    <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={1.3} fill={ACCENT} />
                  ))}
                </svg>

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    objectFit: 'cover',
                    clipPath: chamferClip(8),
                    display: 'block',
                    background: '#000',
                    marginBottom: 14,
                  }}
                />

                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(244, 246, 255, 0.55)',
                    textAlign: 'center',
                  }}
                >
                  {item.category}
                </div>
                <h3
                  style={{
                    margin: '6px 0 16px',
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#dcf5ff',
                    textAlign: 'center',
                  }}
                >
                  {item.title}
                </h3>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    clipPath: chamferClip(8),
                    background: ACCENT,
                    color: '#05070f',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  View project
                  <ArrowUpRight size={16} strokeWidth={2.25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
