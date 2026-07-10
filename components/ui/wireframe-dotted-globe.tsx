'use client'

import { useEffect, useRef } from 'react'
import { geoBounds, geoGraticule, geoOrthographic, geoPath } from 'd3-geo'
import { timer } from 'd3-timer'
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson'

type LandFeature = Feature<Polygon | MultiPolygon>
type LonLat = [number, number]

const LAND_DATA_URL = '/data/ne_110m_land.json'
const DOT_STEP_DEGREES = 1.28
const BASE_SPEED_DEG_PER_SEC = 6
const MAX_SPEED_BOOST_DEG_PER_SEC = 90
const BOOST_PER_SCROLL_PIXEL = 0.4
const BOOST_DECAY_MS = 450
const DOT_RADIUS = 1.2
const RAD = Math.PI / 180
// This canvas covers the viewport for the whole page, so its per-frame cost
// is a sitewide floor. Cap the backing store below full retina — at 20%
// layer opacity the difference is invisible.
const MAX_DPR = 1.5

function pointInRing(point: LonLat, ring: number[][]): boolean {
  const [x, y] = point
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

function pointInPolygon(point: LonLat, rings: number[][][]): boolean {
  if (!pointInRing(point, rings[0])) return false
  // Inner rings are holes; a point inside one is not on land
  return rings.slice(1).every((hole) => !pointInRing(point, hole))
}

function pointInFeature(point: LonLat, feature: LandFeature): boolean {
  if (feature.geometry.type === 'Polygon') {
    return pointInPolygon(point, feature.geometry.coordinates)
  }
  return feature.geometry.coordinates.some((rings) => pointInPolygon(point, rings))
}

function generateDots(feature: LandFeature): LonLat[] {
  const dots: LonLat[] = []
  const [[minLng, minLat], [maxLng, maxLat]] = geoBounds(feature)
  for (let lng = minLng; lng <= maxLng; lng += DOT_STEP_DEGREES) {
    for (let lat = minLat; lat <= maxLat; lat += DOT_STEP_DEGREES) {
      if (pointInFeature([lng, lat], feature)) {
        dots.push([lng, lat])
      }
    }
  }
  return dots
}

export default function RotatingEarth({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const projection = geoOrthographic().clipAngle(90)
    const path = geoPath(projection, context)
    const graticule = geoGraticule()()
    const rotation: [number, number] = [0, 0]

    let width = 0
    let height = 0
    let land: FeatureCollection | null = null

    // Halftone dots, precomputed as spherical terms so the per-frame work is
    // four multiplies per dot. The rotation only ever spins longitude, so for
    // a dot at (λ, φ) with A = cosφ·sinλ and B = cosφ·cosλ:
    //   screen x  ∝ A·cos(r) + B·sin(r)
    //   depth   z = B·cos(r) − A·sin(r)   (visible while z > 0)
    //   screen y  ∝ sinφ                  (constant)
    // The old path (geoDistance + full projection + one fill() per dot,
    // ~10k times per frame, forever, sitewide) was the single biggest CPU
    // cost on the page.
    let dotA: Float32Array = new Float32Array(0)
    let dotB: Float32Array = new Float32Array(0)
    let dotSinPhi: Float32Array = new Float32Array(0)

    const setDots = (lonLats: LonLat[]) => {
      dotA = new Float32Array(lonLats.length)
      dotB = new Float32Array(lonLats.length)
      dotSinPhi = new Float32Array(lonLats.length)
      lonLats.forEach(([lng, lat], i) => {
        const lambda = lng * RAD
        const phi = lat * RAD
        const cosPhi = Math.cos(phi)
        dotA[i] = cosPhi * Math.sin(lambda)
        dotB[i] = cosPhi * Math.cos(lambda)
        dotSinPhi[i] = Math.sin(phi)
      })
    }

    const resize = () => {
      width = container.clientWidth
      height = container.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      projection
        .scale(Math.min(width, height) / 2.5)
        .translate([width / 2, height / 2])
    }

    const render = () => {
      context.clearRect(0, 0, width, height)

      // Ocean disc
      context.beginPath()
      context.arc(width / 2, height / 2, projection.scale(), 0, 2 * Math.PI)
      context.fillStyle = '#000000'
      context.fill()
      context.strokeStyle = '#ffffff'
      context.lineWidth = 1.5
      context.stroke()

      if (!land) return

      context.beginPath()
      path(graticule)
      context.strokeStyle = '#ffffff'
      context.lineWidth = 1
      context.globalAlpha = 0.25
      context.stroke()
      context.globalAlpha = 1

      context.beginPath()
      land.features.forEach((feature) => path(feature))
      context.strokeStyle = '#ffffff'
      context.lineWidth = 1
      context.stroke()

      // Halftone dots: cheap rotated-projection math (see setDots) and a
      // single batched fill for every visible dot.
      const k = projection.scale()
      const tx = width / 2
      const ty = height / 2
      const r = rotation[0] * RAD
      const cosR = Math.cos(r)
      const sinR = Math.sin(r)

      context.fillStyle = '#999999'
      context.beginPath()
      for (let i = 0; i < dotA.length; i++) {
        const z = dotB[i] * cosR - dotA[i] * sinR
        if (z <= 0) continue // far hemisphere
        const x = tx + k * (dotA[i] * cosR + dotB[i] * sinR)
        const y = ty - k * dotSinPhi[i]
        context.moveTo(x + DOT_RADIUS, y)
        context.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI)
      }
      context.fill()
    }

    resize()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let speedBoost = 0
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const scrollY = window.scrollY
      speedBoost = Math.min(
        MAX_SPEED_BOOST_DEG_PER_SEC,
        speedBoost + Math.abs(scrollY - lastScrollY) * BOOST_PER_SCROLL_PIXEL,
      )
      lastScrollY = scrollY
    }

    let lastElapsed = 0
    const tick = (elapsed: number) => {
      const delta = elapsed - lastElapsed
      lastElapsed = elapsed
      rotation[0] += ((BASE_SPEED_DEG_PER_SEC + speedBoost) * delta) / 1000
      speedBoost *= Math.exp(-delta / BOOST_DECAY_MS)
      projection.rotate(rotation)
      render()
    }

    const rotationTimer = reduceMotion ? null : timer(tick)
    if (!reduceMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    const observer = new ResizeObserver(() => {
      resize()
      render()
    })
    observer.observe(container)

    const controller = new AbortController()
    fetch(LAND_DATA_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Land data request failed: ${response.status}`)
        return response.json()
      })
      .then((data: FeatureCollection) => {
        land = data
        setDots(data.features.flatMap((feature) => generateDots(feature as LandFeature)))
        render()
      })
      .catch((err: unknown) => {
        // Decorative backdrop: log and leave the plain disc rather than break the page
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('Wireframe globe failed to load land data:', err)
        }
      })

    return () => {
      rotationTimer?.stop()
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      controller.abort()
    }
  }, [])

  return (
    <div ref={containerRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
