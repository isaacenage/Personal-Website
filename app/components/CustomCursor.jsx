'use client'

import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    let currentX = 0, currentY = 0
    let smokeInterval
    let isHoveringLink = false

    const handleMouseMove = (e) => {
      currentX = e.clientX
      currentY = e.clientY
      if (cursor) {
        cursor.style.left = `${currentX - 16}px`
        cursor.style.top = `${currentY - 16}px`
      }

      const newHoverState = checkParentForHref(document.elementFromPoint(currentX, currentY))
      if (newHoverState !== isHoveringLink) {
        isHoveringLink = newHoverState
        cursor?.classList.toggle('fast-rotate', isHoveringLink)

        if (isHoveringLink) {
          smokeInterval = setInterval(() => createSmokeParticles(currentX, currentY), 30)
        } else {
          clearInterval(smokeInterval)
        }
      }

      createStandardParticles(currentX, currentY, isHoveringLink)
    }

    const createStandardParticles = (x, y, isLink) => {
      const particle = document.createElement('div')
      particle.className = 'cursor-particle'
      particle.style.cssText = `
        width: ${isLink ? '6px' : '8px'};
        height: ${isLink ? '6px' : '8px'};
        left: ${x - (isLink ? 3 : 4)}px;
        top: ${y - (isLink ? 3 : 4)}px;
        background: ${isLink
          ? 'radial-gradient(circle, rgba(255,255,255,0.6) 20%, rgba(0,255,255,0.3) 100%)'
          : 'radial-gradient(circle, rgba(255,100,200,0.4) 20%, rgba(255,50,150,0.2) 100%)'};
      `
      document.body.appendChild(particle)
      setTimeout(() => particle.remove(), 800)
    }

    const createSmokeParticles = (currentX, currentY) => {
      for (let i = 0; i < 2; i++) {
        const particle = document.createElement('div')
        particle.className = 'cursor-particle smoke-particle'

        const angle = Date.now() * 0.02 + (i * Math.PI)
        const radius = 15
        particle.style.cssText = `
          left: ${currentX - 6}px;
          top: ${currentY - 6}px;
          --tx: ${Math.cos(angle) * radius}px;
          --ty: ${Math.sin(angle) * radius}px;
        `

        document.body.appendChild(particle)
        setTimeout(() => particle.remove(), 600)
      }
    }

    const checkParentForHref = (element) => {
      let currentElement = element
      while (currentElement) {
        if (currentElement.hasAttribute('href')) return true
        currentElement = currentElement.parentElement
      }
      return false
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearInterval(smokeInterval)
    }
  }, [])

  return (
    <>
      <div className="custom-cursor" ref={cursorRef}></div>
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
