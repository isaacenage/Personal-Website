'use client'

import React from 'react'
import { ACCENT, chamferClip } from './work-modal'

/* Segmented Galaxy/Grid switch pinned to the Our Work stage, bottom-right —
   the counterpart of the "Drag to explore" hint at bottom-left. Chamfered
   plate in the HUD language: translucent ink fill, 1px accent outline via
   the layered-clip trick, accent-filled active segment. */

export type WorkView = 'galaxy' | 'grid'

const VIEWS: Array<{ key: WorkView; label: string }> = [
  { key: 'galaxy', label: 'Galaxy' },
  { key: 'grid', label: 'Grid' },
]

export function WorkViewToggle({
  view,
  onChange,
}: {
  view: WorkView
  onChange: (view: WorkView) => void
}) {
  return (
    <div
      role="group"
      aria-label="Gallery view"
      style={{
        position: 'absolute',
        right: 16,
        /* the stage bottom hugs the mobile browser chrome — keep clear */
        bottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
        clipPath: chamferClip(8),
        background: 'rgba(111, 227, 255, 0.35)',
        padding: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          clipPath: chamferClip(7),
          background: 'rgba(11, 14, 24, 0.92)',
        }}
      >
        {VIEWS.map(({ key, label }) => {
          const active = view === key
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(key)}
              style={{
                /* explicit reset: the template CSS stretches bare buttons */
                width: 'auto',
                padding: '9px 16px',
                border: 'none',
                background: active ? ACCENT : 'transparent',
                color: active ? '#05070f' : 'rgba(244, 246, 255, 0.6)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                cursor: active ? 'default' : 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
