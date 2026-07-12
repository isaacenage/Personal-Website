'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import {
  ACCENT,
  IMG_COLOR_FILTER,
  IMG_MONO_FILTER,
  WorkModal,
  chamferClip,
  type WorkItem,
} from './work-modal'

/* Flat "magazine" alternative to the 3D card galaxy, after
   https://21st.dev/@makviesainte/components/team-showcase: a staggered
   photo grid paired with an interactive project list. Photos wear the same
   ice-blue monotone as the galaxy cards; hovering a photo or its list row
   colorizes that photo, highlights the row, and slides in the link arrow.
   Clicking either opens the shared WorkModal. Layout/media-query classes
   live in cosmic-theme.css (.work-showcase*); stateful styling is inline. */

const NARROW_QUERY = '(max-width: 899px)'

/* 3 staggered columns on desktop, 2 below 900px — redistributed in JS so
   no item disappears when a column folds away */
function useColumnCount() {
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY)
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return narrow ? 2 : 3
}

function PhotoTile({
  item,
  active,
  onActivate,
  onDeactivate,
  onSelect,
}: {
  item: WorkItem
  active: boolean
  onActivate: () => void
  onDeactivate: () => void
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      aria-label={item.title}
      style={{
        /* explicit reset: the template CSS stretches bare buttons */
        display: 'block',
        width: '100%',
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        transform: active ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* 1px accent outline via the layered-clip trick (clip-path can't
         draw borders); it brightens with the photo */}
      <span
        style={{
          display: 'block',
          clipPath: chamferClip(9),
          background: active ? 'rgba(111, 227, 255, 0.75)' : 'rgba(111, 227, 255, 0.22)',
          padding: 1,
          transition: 'background 0.3s ease',
        }}
      >
        <img
          src={item.image}
          alt=""
          loading="lazy"
          draggable={false}
          style={{
            width: '100%',
            aspectRatio: '16 / 10',
            objectFit: 'cover',
            clipPath: chamferClip(8),
            display: 'block',
            background: '#000',
            filter: active ? IMG_COLOR_FILTER : IMG_MONO_FILTER,
            transition: 'filter 0.3s ease',
          }}
        />
      </span>
    </button>
  )
}

function ListRow({
  item,
  active,
  onActivate,
  onDeactivate,
  onSelect,
}: {
  item: WorkItem
  active: boolean
  onActivate: () => void
  onDeactivate: () => void
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        padding: '14px 4px',
        border: 'none',
        borderBottom: '1px solid rgba(111, 227, 255, 0.14)',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      {/* accent dot marker, echoing the HUD plates' corner dots */}
      <span
        aria-hidden="true"
        style={{
          flex: 'none',
          width: 6,
          height: 6,
          background: active ? ACCENT : 'rgba(111, 227, 255, 0.3)',
          boxShadow: active ? `0 0 8px ${ACCENT}` : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            fontSize: 15,
            lineHeight: '20px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: active ? '#ffffff' : '#dcf5ff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'color 0.3s ease',
          }}
        >
          {item.title}
        </span>
        <span
          style={{
            display: 'block',
            marginTop: 3,
            fontSize: 9,
            lineHeight: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: active ? 'rgba(111, 227, 255, 0.9)' : 'rgba(244, 246, 255, 0.5)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'color 0.3s ease',
          }}
        >
          {item.category}
        </span>
      </span>
      {/* the original's social icons, recast as a single project-link arrow */}
      <ArrowUpRight
        size={18}
        strokeWidth={1.75}
        aria-hidden="true"
        style={{
          flex: 'none',
          color: ACCENT,
          opacity: active ? 1 : 0,
          transform: active ? 'translate(0, 0)' : 'translate(-6px, 6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      />
    </button>
  )
}

export function WorkShowcase({ items }: { items: WorkItem[] }) {
  const [activeId, setActiveId] = useState<WorkItem['id'] | null>(null)
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const columnCount = useColumnCount()

  /* round-robin so neighboring projects land in different columns and the
     stagger reads as a mosaic rather than category bands */
  const columns = Array.from({ length: columnCount }, (_, col) =>
    items.filter((_, i) => i % columnCount === col)
  )

  const rowProps = (item: WorkItem) => ({
    item,
    active: activeId === item.id,
    onActivate: () => setActiveId(item.id),
    onDeactivate: () => setActiveId(null),
    onSelect: () => setSelected(item),
  })

  return (
    <div className="work-showcase" data-lenis-prevent="">
      <div className="work-showcase-inner">
        <div className="work-showcase-grid">
          {columns.map((column, col) => (
            <div className="work-showcase-col" key={col}>
              {column.map((item) => (
                <PhotoTile key={item.id} {...rowProps(item)} />
              ))}
            </div>
          ))}
        </div>

        <div className="work-showcase-list" role="list">
          {items.map((item) => (
            <ListRow key={item.id} {...rowProps(item)} />
          ))}
        </div>
      </div>

      {selected && <WorkModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
