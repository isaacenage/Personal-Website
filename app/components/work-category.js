'use client'

import { useSyncExternalStore } from 'react'

/* The Our Work category filter lives in the header (inside PageShell) while
   the gallery is a page child — siblings, so the active category sits in a
   tiny external store instead of a context threaded through PageShell. */

export const WORK_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'maps', label: 'Maps' },
  { key: 'websites', label: 'Websites' },
  { key: 'tools', label: 'Tools' },
]

const DEFAULT_CATEGORY = 'all'

let category = DEFAULT_CATEGORY
const listeners = new Set()

export function setWorkCategory(next) {
  if (next === category) return
  category = next
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useWorkCategory() {
  return useSyncExternalStore(
    subscribe,
    () => category,
    () => DEFAULT_CATEGORY
  )
}
