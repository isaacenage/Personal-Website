'use client'

import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import {
  ACCENT,
  IMG_COLOR_FILTER,
  IMG_MONO_FILTER,
  WorkModal,
  chamferClip,
  type WorkItem,
} from './work-modal'

/* Stellar card galaxy from https://21st.dev/@shadway/components/3d-image-gallery
   (StellarCardGallerySingle), reworked for this site: cards come in as props,
   the starfield renders inside the same R3F canvas instead of a second WebGL
   context, the frameloop pauses while the section is offscreen, DPR is capped
   at 1.5, zoom/pan stay disabled so Lenis keeps the wheel, and the teal
   accents are remapped onto the cosmic tokens. The cards and the detail
   modal wear the same chamfered HUD plate as components/ui/hud-button.tsx.
   The work item type, monotone image treatment, and detail modal live in
   work-modal.tsx, shared with the flat showcase view. */

export type { WorkItem }

const SHELL_BLUE = '#3a6bff'

/* HUD plate geometry, mirroring Style2Svg in components/ui/hud-button.tsx:
   a chamfered frame inset 4px on the left so the small edge dots sit outside
   the outline, with the 2×2 dot cluster tucked into the top-right corner. */
const CARD_W = 200
const CARD_H = 170
const CARD_FRAME_PATH =
  'M12.5 0.5H191.5L199.5 8.5V161.5L191.5 169.5H12.5L4.5 161.5V8.5Z'
const CARD_DOTS = [
  { cx: 187.2, cy: 4, r: 1.2 },
  { cx: 187.2, cy: 8.2, r: 1.2 },
  { cx: 191.7, cy: 4, r: 1.2 },
  { cx: 191.7, cy: 8.2, r: 1.2 },
  { cx: 0.7, cy: 82.4, r: 0.65 },
  { cx: 0.7, cy: 87.7, r: 0.65 },
]

/* STYLE2_FILL_STOPS from hud-button.tsx — with the same overshot gradient
   span the plate lands at ~45% ink up top fading to ~15% at the bottom,
   which is what makes the Category button read as translucent glass. */
const CARD_FILL_STOPS: Array<[number, number]> = [
  [0, 0.95], [0.005, 0.92], [0.085, 0.85], [0.17, 0.75], [0.258, 0.65], [0.351, 0.55],
  [0.449, 0.45], [0.554, 0.35], [0.669, 0.25], [0.804, 0.15], [1, 0],
]

/* Chamfered HUD plate — the card-sized cousin of the button's Style2Svg:
   translucent ink fill (the starfield shows through, like the Category
   button), accent tint falling from the top edge, 1px outline, and the
   signature corner dots. Hover brightens the tint, outline, and dots. */
function HudCardFrame({ hovered }: { hovered: boolean }) {
  /* useId can emit colons, which break url(#…) gradient references */
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const fillId = `hud-card-f-${uid}`
  const tintId = `hud-card-t-${uid}`
  return (
    <svg
      viewBox={`0 0 ${CARD_W} ${CARD_H}`}
      width={CARD_W}
      height={CARD_H}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, display: 'block' }}
    >
      <defs>
        {/* gradient overshoots the shape by the same ±1.2/1.56 height ratio
           as the button, so only its translucent middle lands on the plate */}
        <linearGradient
          id={fillId}
          x1={CARD_W / 2}
          y1={-CARD_H * 1.19}
          x2={CARD_W / 2}
          y2={CARD_H * 1.56}
          gradientUnits="userSpaceOnUse"
        >
          {CARD_FILL_STOPS.map(([offset, opacity]) => (
            <stop key={offset} offset={offset} stopColor="#10141f" stopOpacity={opacity} />
          ))}
        </linearGradient>
        <linearGradient
          id={tintId}
          x1={CARD_W / 2}
          y1="0"
          x2={CARD_W / 2}
          y2={CARD_H}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={ACCENT} stopOpacity={0.22} />
          <stop offset="0.45" stopColor={ACCENT} stopOpacity={0.05} />
          <stop offset="1" stopColor={ACCENT} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={CARD_FRAME_PATH} fill={`url(#${fillId})`} />
      <path
        d={CARD_FRAME_PATH}
        fill={`url(#${tintId})`}
        style={{ opacity: hovered ? 1 : 0.55, transition: 'opacity 0.3s ease' }}
      />
      <path
        d={CARD_FRAME_PATH}
        fill="none"
        strokeWidth={1}
        style={{
          stroke: hovered ? ACCENT : 'rgba(111, 227, 255, 0.4)',
          transition: 'stroke 0.3s ease',
        }}
      />
      {CARD_DOTS.map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={ACCENT}
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            transform: hovered ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      ))}
    </svg>
  )
}

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
          /* a rotate-drag that ends on a card is not a click */
          if (e.delta > 5) return
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
        <planeGeometry args={[5.6, 4.8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        /* the prop (not just style) matters: drei's transform-mode wrapper div
           defaults to pointer-events auto and would eat clicks over the card
           body, leaving only the hit plane's edges clickable */
        pointerEvents="none"
        style={{
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ position: 'relative', width: CARD_W, height: CARD_H, userSelect: 'none' }}>
          {/* radial glow behind the plate, same trick as .hud-btn-glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -18,
              background: 'radial-gradient(circle, rgba(111, 227, 255, 0.35) 0%, transparent 70%)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1.08)' : 'scale(0.85)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              pointerEvents: 'none',
            }}
          />
          <HudCardFrame hovered={hovered} />
          {/* content is offset 4px left (edge dots) and 12px top (dot cluster) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 4,
              padding: '12px 10px 0',
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
                clipPath: chamferClip(6),
                display: 'block',
                background: '#000',
                filter: hovered ? IMG_COLOR_FILTER : IMG_MONO_FILTER,
                transition: 'filter 0.3s ease',
              }}
            />
            <div style={{ marginTop: 8 }}>
              <div
                style={{
                  fontSize: 8,
                  lineHeight: '10px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: hovered ? 'rgba(111, 227, 255, 0.9)' : 'rgba(244, 246, 255, 0.55)',
                  transition: 'color 0.3s ease',
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
                  fontSize: 11,
                  lineHeight: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#dcf5ff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.title}
              </p>
            </div>
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
      /* sizing belongs to the parent — the Our Work stage stretches this to
         the full viewport */
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
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
