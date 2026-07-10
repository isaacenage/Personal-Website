'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { ArrowUpRight, X } from 'lucide-react'

/* Stellar card galaxy from https://21st.dev/@shadway/components/3d-image-gallery
   (StellarCardGallerySingle), reworked for this site: cards come in as props,
   the starfield renders inside the same R3F canvas instead of a second WebGL
   context, the frameloop pauses while the section is offscreen, DPR is capped
   at 1.5, zoom/pan stay disabled so Lenis keeps the wheel, and the teal
   accents are remapped onto the cosmic tokens. */

export type WorkItem = {
  id: string | number
  title: string
  category: string
  image: string
  link: string
}

const ACCENT = '#6fe3ff'
const SHELL_BLUE = '#3a6bff'
const CARD_BG = 'var(--cosmos-ink, #0b0e18)'

/* =========================
   Starfield (in-scene)
   ========================= */

function Starfield({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 1500
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // shell between r=40 and r=130 so stars stay behind the card layers
      const r = 40 + Math.random() * 90
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi)
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return
    ref.current.rotation.y += delta * 0.008
    ref.current.rotation.x += delta * 0.003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.35} sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

/* =========================
   Floating card
   ========================= */

function FloatingCard({
  item,
  position,
  onSelect,
}: {
  item: WorkItem
  position: { x: number; y: number; z: number }
  onSelect: (item: WorkItem) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ camera }) => {
    groupRef.current?.lookAt(camera.position)
  })

  /* a card can unmount (tab switch) while hovered — don't strand the cursor */
  useEffect(() => () => {
    document.body.style.cursor = 'auto'
  }, [])

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* invisible hit plane; the visible card is DOM and ignores the pointer */}
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onSelect(item)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <planeGeometry args={[5.6, 5.3]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 200,
            padding: 10,
            borderRadius: 10,
            background: CARD_BG,
            userSelect: 'none',
            border: hovered
              ? '1px solid rgba(111, 227, 255, 0.55)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: hovered
              ? '0 25px 50px rgba(111, 227, 255, 0.35), 0 0 30px rgba(111, 227, 255, 0.2)'
              : '0 15px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            draggable={false}
            style={{
              width: '100%',
              aspectRatio: '16 / 10',
              objectFit: 'cover',
              borderRadius: 7,
              display: 'block',
              background: '#000',
            }}
          />
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontSize: 8,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(244, 246, 255, 0.55)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.category}
            </div>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
            </p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card galaxy
   ========================= */

function CardGalaxy({
  items,
  onSelect,
}: {
  items: WorkItem[]
  onSelect: (item: WorkItem) => void
}) {
  const positions = useMemo(() => {
    const n = items.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    return items.map((_, i) => {
      if (n === 1) return { x: 0, y: 0, z: 0 }
      // fibonacci sphere, spread across three layered radii
      const y = 1 - (i / (n - 1)) * 2
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = (2 * Math.PI * i) / goldenRatio
      const layerRadius = 8 + (i % 3) * 3
      return {
        x: Math.cos(theta) * radiusAtY * layerRadius,
        y: y * layerRadius,
        z: Math.sin(theta) * radiusAtY * layerRadius,
      }
    })
  }, [items])

  return (
    <>
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color={SHELL_BLUE} transparent opacity={0.12} wireframe />
      </mesh>
      {[8, 11, 14].map((radius, i) => (
        <mesh key={radius}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={SHELL_BLUE}
            transparent
            opacity={[0.05, 0.035, 0.02][i]}
            wireframe
          />
        </mesh>
      ))}

      {items.map((item, i) => (
        <FloatingCard key={item.id} item={item} position={positions[i]} onSelect={onSelect} />
      ))}
    </>
  )
}

/* =========================
   Detail modal (portal — sections create stacking contexts)
   ========================= */

function WorkModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
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
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              borderRadius: 16,
              background: CARD_BG,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: 16,
              transformStyle: 'preserve-3d',
              boxShadow:
                'rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              style={{
                width: '100%',
                aspectRatio: '16 / 10',
                objectFit: 'cover',
                borderRadius: 10,
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
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#fff',
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
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                borderRadius: 10,
                background: ACCENT,
                color: '#05070f',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
              }}
            >
              View project
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* =========================
   Gallery export
   ========================= */

export function StellarWorkGallery({
  items,
  className,
}: {
  items: WorkItem[]
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [selected, setSelected] = useState<WorkItem | null>(null)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const el = wrapRef.current
    if (!el) return
    /* same rule as the hero/globe render loops: draw only while onscreen */
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: 'relative', height: 'clamp(480px, 72vh, 660px)', overflow: 'hidden' }}
    >
      <Canvas
        camera={{ position: [0, 0, 16], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
        /* pan-y: vertical swipes keep scrolling the page on touch screens */
        style={{ touchAction: 'pan-y' }}
      >
        <Starfield reducedMotion={reducedMotion} />
        <CardGalaxy items={items} onSelect={setSelected} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          rotateSpeed={0.5}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.55}
          target={[0, 0, 0]}
        />
      </Canvas>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 16,
          bottom: 12,
          pointerEvents: 'none',
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(244, 246, 255, 0.45)',
        }}
      >
        Drag to explore &bull; Click a card
      </div>

      {selected && <WorkModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
