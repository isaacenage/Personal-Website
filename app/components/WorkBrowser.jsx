'use client'

import { useState } from 'react'
import { Arrow, external, kindOf } from './blocks'
import { WORK, WORK_FILTERS } from '@/lib/site'

/* Desktop: the project list in the panel, the hovered or focused project
   previewed large in the card. Phones get the list only. */
export default function WorkBrowser() {
  const [filter, setFilter] = useState('all')
  const items = filter === 'all' ? WORK : WORK.filter((w) => w.group === filter)
  const [active, setActive] = useState(WORK[0])
  const shown = items.includes(active) ? active : items[0]

  return (
    <>
      <section className="panel vt-panel" aria-label="Projects">
        <div className="segmented" role="group" aria-label="Filter projects">
          {WORK_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ul className="index index--compact">
          {items.map((item) => (
            <li key={item.title}>
              <a
                href={item.link}
                {...external(item.link)}
                aria-current={item === shown ? 'true' : undefined}
                onMouseEnter={() => setActive(item)}
                onFocus={() => setActive(item)}
              >
                <img src={item.image} alt="" width="160" height="100" loading="lazy" />
                <span className="name">
                  <strong>{item.title}</strong>
                  <span>{item.category}</span>
                </span>
                <span className="kind">{kindOf(item)}</span>
                <span className="circle">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <article className="preview vt-card" aria-live="polite">
        <img key={shown.image} src={shown.image} alt={`${shown.title} screenshot`} width="800" height="500" />
        <div className="preview-foot glass">
          <div>
            <h2>{shown.title}</h2>
            <p>{shown.category}</p>
          </div>
          <a className="circle" href={shown.link} {...external(shown.link)} aria-label={`Open ${shown.title}`}>
            <Arrow />
          </a>
        </div>
      </article>
    </>
  )
}
