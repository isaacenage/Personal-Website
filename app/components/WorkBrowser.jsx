'use client'

import { useState } from 'react'
import { Arrow, external, kindOf } from './blocks'
import { WORK } from '@/lib/site'

/* Desktop: the project list in the panel, the hovered or focused project
   previewed large in the card. Phones get the list only. `group` narrows
   the list to one work group; the notch links between them. */
export default function WorkBrowser({ group }) {
  const items = group ? WORK.filter((w) => w.group === group) : WORK
  const [active, setActive] = useState(items[0])
  const shown = items.includes(active) ? active : items[0]

  return (
    <>
      <section className="panel vt-panel" aria-label="Projects">
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
        <img key={shown.preview} src={shown.preview} alt={`${shown.title} on desktop and phone`} width="1600" height="1000" />
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
