'use client'

import { useEffect, useRef, useCallback } from 'react'

const MAX_PARTICLES = 15
const PARTICLE_LIFETIME = 600
const SMOKE_INTERVAL = 50

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const particleCountRef = useRef(0)
  const rafIdRef = useRef(null)
  const pendingMouseRef = useRef(null)
  const isHoveringLinkRef = useRef(false)
  const smokeIntervalRef = useRef(null)

  const createParticle = useCallback((x, y, isLink) => {
    if (particleCountRef.current >= MAX_PARTICLES) return

    const particle = document.createElement('div')
    particle.className = 'cursor-particle'
    const size = isLink ? 6 : 8
    const offset = size / 2
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x - offset}px;
      top: ${y - offset}px;
      background: ${isLink
        ? 'radial-gradient(circle, rgba(255,255,255,0.6) 20%, rgba(0,255,255,0.3) 100%)'
        : 'radial-gradient(circle, rgba(255,100,200,0.4) 20%, rgba(255,50,150,0.2) 100%)'};
    `
    document.body.appendChild(particle)
    particleCountRef.current++

    setTimeout(() => {
      particle.remove()
      particleCountRef.current--
    }, PARTICLE_LIFETIME)
  }, [])

  const createSmokeParticles = useCallback((x, y) => {
    if (particleCountRef.current >= MAX_PARTICLES) return

    const particle = document.createElement('div')
    particle.className = 'cursor-particle smoke-particle'
    const angle = Date.now() * 0.02
    const radius = 15
    particle.style.cssText = `
      left: ${x - 6}px;
      top: ${y - 6}px;
      --tx: ${Math.cos(angle) * radius}px;
      --ty: ${Math.sin(angle) * radius}px;
    `
    document.body.appendChild(particle)
    particleCountRef.current++

    setTimeout(() => {
      particle.remove()
      particleCountRef.current--
    }, PARTICLE_LIFETIME)
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current

    const checkParentForHref = (element) => {
      let current = element
      while (current) {
        if (current.hasAttribute?.('href')) return true
        current = current.parentElement
      }
      return false
    }

    const processFrame = () => {
      rafIdRef.current = null
      const pos = pendingMouseRef.current
      if (!pos) return

      const { x, y } = pos

      if (cursor) {
        cursor.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`
      }

      const hoveredEl = document.elementFromPoint(x, y)
      const newHoverState = checkParentForHref(hoveredEl)

      if (newHoverState !== isHoveringLinkRef.current) {
        isHoveringLinkRef.current = newHoverState
        cursor?.classList.toggle('fast-rotate', newHoverState)

        if (newHoverState) {
          smokeIntervalRef.current = setInterval(
            () => createSmokeParticles(pendingMouseRef.current?.x ?? x, pendingMouseRef.current?.y ?? y),
            SMOKE_INTERVAL
          )
        } else {
          clearInterval(smokeIntervalRef.current)
        }
      }

      createParticle(x, y, isHoveringLinkRef.current)
    }

    const handleMouseMove = (e) => {
      pendingMouseRef.current = { x: e.clientX, y: e.clientY }
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(processFrame)
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearInterval(smokeIntervalRef.current)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [createParticle, createSmokeParticles])

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} style={{ willChange: 'transform' }}></div>
      <a
        href="https://www.cursors-4u.com/cursor/2017/03/17/flow-busy.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: 'fixed', top: 0, right: 0, zIndex: 9996 }}
      >
        <img src="https://cur.cursors-4u.net/cursor.png" alt="Cursor Attribution" />
      </a>
    </>
  )
}

export default CustomCursor
