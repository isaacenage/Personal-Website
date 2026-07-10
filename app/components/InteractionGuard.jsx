'use client'

import { useEffect } from 'react'

// Form fields keep native selection/caret behavior — everything else is locked.
const isEditable = (target) =>
  target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable]'))

// Site-wide interaction locks, paired with the CSS in globals.css:
// no context menu (desktop right-click, Android long-press), no pinch zoom
// (iOS Safari ignores user-scalable=no since iOS 10, so the gesture* events
// must be cancelled in JS), and no text selection outside form fields.
const InteractionGuard = () => {
  useEffect(() => {
    const onContextMenu = (e) => e.preventDefault()

    const onGesture = (e) => e.preventDefault()

    // Pinch fallback for browsers without gesture events: cancel any
    // multi-touch move so two fingers can never zoom, while one-finger
    // scrolling stays native.
    const onTouchMove = (e) => {
      if (e.touches.length > 1) e.preventDefault()
    }

    const onSelectStart = (e) => {
      if (!isEditable(e.target)) e.preventDefault()
    }

    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('gesturestart', onGesture)
    document.addEventListener('gesturechange', onGesture)
    document.addEventListener('gestureend', onGesture)
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('selectstart', onSelectStart)

    return () => {
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('gesturestart', onGesture)
      document.removeEventListener('gesturechange', onGesture)
      document.removeEventListener('gestureend', onGesture)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('selectstart', onSelectStart)
    }
  }, [])

  return null
}

export default InteractionGuard
