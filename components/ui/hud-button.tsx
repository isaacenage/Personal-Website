'use client'

import Link from 'next/link'
import type React from 'react'
import { useId } from 'react'
import { HyperText } from '@/components/ui/hyper-text'

type Variant = 'primary' | 'secondary'
type HudStyle = 'style1' | 'style2'
type Size = 'small' | 'default' | 'large'

type Palette = {
  main: string
  text: string
  glow: string
  fill: string
  tint: string
  contrast: string
}

type HudButtonProps = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'style'> & {
  children: string
  variant?: Variant
  /* `style` in the 21st.dev API — renamed so it can't shadow the DOM style attr */
  hudStyle?: HudStyle
  /* only style2 has size variants; style1 is a fixed 182×44 frame upstream */
  size?: Size
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  delay?: number
}

/* The upstream green/slate palette re-mapped onto the cosmic tokens
   (dark values only — the site has no light mode).
   fill/tint drive the style2 gradients, contrast its dots and stroke. */
const PALETTES: Record<Variant, Palette> = {
  primary: {
    main: '#6fe3ff',
    text: '#dcf5ff',
    glow: 'rgba(111, 227, 255, 0.35)',
    fill: '#6fe3ff',
    tint: '#6fe3ff',
    contrast: '#6fe3ff',
  },
  secondary: {
    main: '#8fa0bd',
    text: 'rgba(244, 246, 255, 0.78)',
    glow: 'rgba(143, 160, 189, 0.22)',
    fill: '#10141f',
    tint: '#1c2333',
    contrast: '#f4f6ff',
  },
}

const STYLE1_DIMS = { width: 182, height: 44 }

const STYLE2_DIMS: Record<Size, { width: number; height: number }> = {
  small: { width: 140, height: 39 },
  default: { width: 187, height: 52 },
  large: { width: 234, height: 65 },
}

/* [offset, stopOpacity] pairs lifted from the upstream SVGs */
const STYLE1_STOPS: Array<[number, number]> = [
  [0, 1], [0.005, 0.986], [0.085, 0.781], [0.17, 0.596], [0.258, 0.436], [0.351, 0.301],
  [0.449, 0.191], [0.554, 0.106], [0.669, 0.046], [0.804, 0.011], [1, 0],
]

const STYLE2_FILL_STOPS: Array<[number, number]> = [
  [0, 0.95], [0.005, 0.92], [0.085, 0.85], [0.17, 0.75], [0.258, 0.65], [0.351, 0.55],
  [0.449, 0.45], [0.554, 0.35], [0.669, 0.25], [0.804, 0.15], [1, 0],
]

const STYLE2_TINT_STOPS: Array<[number, number]> = [
  [0, 0.8], [0.005, 0.75], [0.085, 0.65], [0.17, 0.55], [0.258, 0.45], [0.351, 0.35],
  [0.449, 0.25], [0.554, 0.18], [0.669, 0.12], [0.804, 0.06], [1, 0],
]

const STYLE1_DOTS = [
  { cx: 169.908, cy: 7.326, r: 1.161 },
  { cx: 169.908, cy: 11.908, r: 1.161 },
  { cx: 174.373, cy: 7.326, r: 1.161 },
  { cx: 174.373, cy: 11.908, r: 1.161 },
  { cx: 0.621, cy: 19.214, r: 0.621 },
  { cx: 0.621, cy: 24.506, r: 0.621 },
]

const STYLE2_DOTS = [
  { cx: 174.161, cy: 7.161, r: 1.161 },
  { cx: 174.161, cy: 11.739, r: 1.161 },
  { cx: 178.63, cy: 7.161, r: 1.161 },
  { cx: 178.63, cy: 11.739, r: 1.161 },
  { cx: 0.621, cy: 23.621, r: 0.621 },
  { cx: 0.621, cy: 28.91, r: 0.621 },
]

const dotDelay = (base: number, index: number) => `${base + 0.3 + index * 0.05}s`

function GradientStops({ stops, color }: { stops: Array<[number, number]>; color: string }) {
  return (
    <>
      {stops.map(([offset, opacity]) => (
        <stop key={offset} offset={offset} stopColor={color} stopOpacity={opacity} />
      ))}
    </>
  )
}

function Dots({
  dots,
  fill,
  delay,
}: {
  dots: Array<{ cx: number; cy: number; r: number }>
  fill: string
  delay: number
}) {
  return (
    <>
      {dots.map((dot, i) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          className="hud-dot"
          style={{ animationDelay: dotDelay(delay, i) }}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={fill}
        />
      ))}
    </>
  )
}

/* Diagonal-cut frame with a top-glow gradient fill */
function Style1Svg({ palette, delay, uid }: { palette: Palette; delay: number; uid: string }) {
  const gradientId = `hud-g-${uid}`
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182.288 43.721" className="hud-btn-svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="93.198" y1="-53.343" x2="93.198" y2="68.841" gradientUnits="userSpaceOnUse">
          <GradientStops stops={STYLE1_STOPS} color={palette.main} />
        </linearGradient>
      </defs>
      <path
        className="hud-path"
        style={{ animationDelay: `${delay + 0.2}s` }}
        d="M181.788.5H13.7L4.609,9.593V43.221H170.048l11.74-11.74Z"
        fill={`url(#${gradientId})`}
      />
      <path
        className="hud-path"
        style={{ animationDelay: `${delay + 0.4}s` }}
        d="M170.256,43.721H4.108V9.386L13.494,0H182.288V31.688Zm-165.148-1H169.842l11.446-11.447V1H13.908l-8.8,8.8Z"
        fill={palette.main}
      />
      <Dots dots={STYLE1_DOTS} fill={palette.main} delay={delay} />
    </svg>
  )
}

/* Hexagonal frame with a drawn stroke and layered gradient outline */
function Style2Svg({ palette, delay, uid }: { palette: Palette; delay: number; uid: string }) {
  const fillId = `hud-f-${uid}`
  const tintId = `hud-t-${uid}`
  const outlinePath =
    'M181.07 52H9.9311L4 46.1001V5.8994L9.9311 0H181.07L187 5.8994V46.1001L181.07 52ZM10.1235 51.5332H180.876L186.531 45.9069V6.09266L180.876 0.466799L10 0.5L4.5 6L4.46916 45.9069L10.1235 51.5332Z'
  return (
    <svg viewBox="0 0 187 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="hud-btn-svg" aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="94.9995" y1="-62.017" x2="94.9995" y2="80.9853" gradientUnits="userSpaceOnUse">
          <GradientStops stops={STYLE2_FILL_STOPS} color={palette.fill} />
        </linearGradient>
        <linearGradient id={tintId} x1="95.4995" y1="-65.5377" x2="95.4995" y2="83.1847" gradientUnits="userSpaceOnUse">
          <GradientStops stops={STYLE2_TINT_STOPS} color={palette.tint} />
        </linearGradient>
      </defs>
      <path
        className="hud-path hud-path-draw"
        pathLength={1}
        style={{ animationDelay: `${delay + 0.2}s` }}
        d="M4.5 6L10 0.5H181L186.5 6V46L181 51.5H10L4.5 45.7834V6Z"
        fill={`url(#${fillId})`}
        stroke={palette.contrast}
        strokeWidth="0.5"
      />
      <path
        className="hud-path"
        style={{ animationDelay: `${delay + 0.4}s` }}
        d={outlinePath}
        fill="#f4f6ff"
      />
      <path
        className="hud-path"
        style={{ animationDelay: `${delay + 0.5}s` }}
        d={outlinePath}
        fill={`url(#${tintId})`}
      />
      <Dots dots={STYLE2_DOTS} fill={palette.contrast} delay={delay} />
    </svg>
  )
}

/* HUD button from https://21st.dev/@isaiahbjork/components/hud-button,
   ported off framer-motion/next-themes onto the CSS animations in
   app/styles/hud-button.css. Renders a <button> by default, a Next Link
   when `href` is a route, or an <a> for same-page hash targets. */
export function HudButton({
  children,
  variant = 'primary',
  hudStyle = 'style1',
  size = 'default',
  href,
  type = 'button',
  disabled = false,
  delay = 0,
  className,
  ...rest
}: HudButtonProps) {
  /* useId can emit colons, which break url(#…) gradient references */
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const palette = PALETTES[variant]
  const dims = hudStyle === 'style1' ? STYLE1_DIMS : STYLE2_DIMS[size]

  const rootClass = [
    'hud-btn',
    hudStyle === 'style2' && size !== 'default' ? `hud-btn--${size}` : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const rootStyle: React.CSSProperties = {
    width: `${dims.width}px`,
    height: `${dims.height}px`,
    animationDelay: `${delay}s`,
  }

  const chrome = (
    <>
      <span
        className="hud-btn-glow"
        style={{ background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)` }}
      />
      {variant === 'primary' && <span className="hud-btn-shimmer" />}
      <span className="hud-btn-body">
        {hudStyle === 'style1' ? (
          <Style1Svg palette={palette} delay={delay} uid={uid} />
        ) : (
          <Style2Svg palette={palette} delay={delay} uid={uid} />
        )}
        {/* aria-hidden: the scramble effect churns the text node, so the
            accessible name lives on the root element instead */}
        <span
          className="hud-btn-label"
          aria-hidden="true"
          style={{ color: palette.text, animationDelay: `${delay + 0.6}s` }}
        >
          <HyperText text={children} className="hud-btn-text" />
        </span>
      </span>
    </>
  )

  if (href) {
    if (href.startsWith('#')) {
      return (
        <a href={href} className={rootClass} style={rootStyle} aria-label={children} {...rest}>
          {chrome}
        </a>
      )
    }
    return (
      <Link href={href} className={rootClass} style={rootStyle} aria-label={children} {...rest}>
        {chrome}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={rootClass}
      style={rootStyle}
      aria-label={children}
      disabled={disabled}
      {...rest}
    >
      {chrome}
    </button>
  )
}
