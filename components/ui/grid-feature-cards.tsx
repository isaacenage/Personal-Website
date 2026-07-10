'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type FeatureType = {
  title: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  description: string
  meta?: string
}

type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureType
}

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const p = seededPattern(feature.title)

  return (
    <div className={cn('relative overflow-hidden p-6 md:p-8', className)} {...props}>
      <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/[0.02] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full fill-white/5 stroke-white/10 mix-blend-overlay"
          />
        </div>
      </div>
      <feature.icon className="size-6 text-[#8fb3ff]" strokeWidth={1} aria-hidden />
      <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/90 md:text-[15px]">
        {feature.title}
      </h3>
      {feature.meta && (
        <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-white/40">{feature.meta}</p>
      )}
      <p className="relative z-20 mt-3 text-xs font-light leading-relaxed tracking-wide text-white/55 md:text-sm">
        {feature.description}
      </p>
    </div>
  )
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<'svg'> & {
  width: number
  height: number
  x: string
  y: string
  squares?: number[][]
}) {
  const patternId = React.useId()

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}

/* Deterministic replacement for the original component's Math.random()
   pattern — random values in render would mismatch between server and
   client and trigger hydration warnings. */
function seededPattern(seed: string, length = 5): number[][] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const rand = () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return (h >>> 0) / 4294967296
  }
  return Array.from({ length }, () => [
    Math.floor(rand() * 4) + 7,
    Math.floor(rand() * 6) + 1,
  ])
}
