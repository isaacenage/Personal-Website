'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import RotatingEarth from '@/components/ui/wireframe-dotted-globe'

const TOTAL_SECTIONS = 2

const SECTION_TITLES = ['BYZENTERRA', 'EXPLORE', 'CREATE']

const SECTION_SUBTITLES = [
  {
    line1: 'Where geography meets engineering,',
    line2: 'we turn spatial data into decisions',
  },
  {
    line1: 'Beyond maps and dashboards',
    line2: 'lies intelligence your team can act on',
  },
  {
    line1: 'From data to design to deployment,',
    line2: 'we build what your organization needs next',
  },
]

interface ThreeRefs {
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  renderer: THREE.WebGLRenderer | null
  stars: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>[]
  nebula: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null
  galaxy: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null
  atmosphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial> | null
  mountains: THREE.Mesh<THREE.ShapeGeometry, THREE.MeshBasicMaterial>[]
  animationId: number | null
  targetCameraX?: number
  targetCameraY?: number
  targetCameraZ?: number
  locations: number[]
}

// Galaxy palette — mirrors the cosmic theme tokens in cosmic-theme.css
// (--star-white, --aurora-cyan, --nebula-violet).
const GALAXY_CORE_COLOR = 0xf4f6ff
const GALAXY_MID_COLOR = 0x6fe3ff
const GALAXY_RIM_COLOR = 0x7c5cff

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Scroll-driven UI is written straight to these nodes (no setState): a
  // React re-render per scroll frame is real jank on low-end machines.
  const heroContentRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const sectionCounterRef = useRef<HTMLDivElement>(null)

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 })

  const [isReady, setIsReady] = useState(false)
  const [webglFailed, setWebglFailed] = useState(false)

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    galaxy: null,
    atmosphere: null,
    mountains: [],
    animationId: null,
    locations: [],
  })

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return

    // WebGL can be unavailable (hardware acceleration disabled, enterprise
    // policy, virtual machines). Detect it up front and fall back to the
    // static CSS backdrop instead of letting the renderer constructor throw.
    const testCanvas = document.createElement('canvas')
    const testContext =
      testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
    if (!testContext) {
      console.warn(
        'Horizon hero: WebGL is not available in this browser — rendering static fallback.'
      )
      setWebglFailed(true)
      setIsReady(true)
      return
    }

    // Shader time must be seconds-since-mount, never Date.now(): epoch
    // seconds (~1.7e9) overflow mediump floats and exceed sin/cos range
    // reduction on mobile GPUs, so every time-driven shader collapses to
    // NaN there — stars vanish, and NaN nebula vertices rasterize as
    // bright spikes shooting across the screen.
    const clock = new THREE.Clock()

    // One DPR value for the renderer and every point shader, so star
    // sprite sizes stay consistent between desktop and high-DPI mobile.
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5)

    const createStarField = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return
      const starCount = 5000

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(starCount * 3)
        const colors = new Float32Array(starCount * 3)
        const sizes = new Float32Array(starCount)

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(Math.random() * 2 - 1)

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[j * 3 + 2] = radius * Math.cos(phi)

          // Color variation
          const color = new THREE.Color()
          const colorChoice = Math.random()
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2)
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8)
          } else {
            color.setHSL(0.6, 0.5, 0.8)
          }

          colors[j * 3] = color.r
          colors[j * 3 + 1] = color.g
          colors[j * 3 + 2] = color.b

          sizes[j] = Math.random() * 2 + 0.5
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
            uPixelRatio: { value: pixelRatio },
          },
          vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            uniform float uPixelRatio;

            void main() {
              vColor = color;
              vec3 pos = position;

              // Slow rotation based on depth. mod() keeps the angle small
              // so sin/cos stay accurate on mobile GPU float precision.
              float angle = mod(time * 0.05 * (1.0 - depth * 0.3), 6.28318530718);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              // Clamp: floor keeps far stars visible on small high-DPI
              // screens, ceiling stays inside mobile point-size limits.
              gl_PointSize = clamp(size * uPixelRatio * (300.0 / -mvPosition.z), 1.0, 64.0);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;

            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;

              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          vertexColors: true,
        })

        const stars = new THREE.Points(geometry, material)
        refs.scene.add(stars)
        refs.stars.push(stars)
      }
    }

    const createNebula = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return

      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0x7c5cff) },
          opacity: { value: 0.3 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;

          void main() {
            vUv = uv;
            vec3 pos = position;

            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);

            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      })

      const nebula = new THREE.Mesh(geometry, material)
      nebula.position.z = -1050
      nebula.rotation.x = 0
      refs.scene.add(nebula)
      refs.nebula = nebula
    }

    // Spiral galaxy: a THREE.Points cloud on a logarithmic spiral, tinted
    // core -> arms with the cosmic theme palette. It sits beyond the nebula
    // so the deep-space camera legs (EXPLORE / CREATE) have a destination
    // once the mountains recede.
    const createGalaxy = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return

      const count = 4000
      const branches = 3
      const radius = 500
      const spin = 1.6
      const randomnessPower = 2.5

      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)
      const sizes = new Float32Array(count)

      const coreColor = new THREE.Color(GALAXY_CORE_COLOR)
      const midColor = new THREE.Color(GALAXY_MID_COLOR)
      const rimColor = new THREE.Color(GALAXY_RIM_COLOR)

      for (let i = 0; i < count; i++) {
        const r = Math.pow(Math.random(), 1.5) * radius
        const branchAngle = ((i % branches) / branches) * Math.PI * 2
        const spinAngle = (r / radius) * spin * Math.PI

        const scatter = () =>
          Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i * 3] = Math.cos(branchAngle + spinAngle) * r + scatter() * 0.35 * r
        positions[i * 3 + 1] = scatter() * 0.12 * r
        positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + scatter() * 0.35 * r

        // Bright core fading through cyan into violet arms
        const t = r / radius
        const color = coreColor.clone()
        if (t < 0.35) {
          color.lerp(midColor, t / 0.35)
        } else {
          color.copy(midColor).lerp(rimColor, (t - 0.35) / 0.65)
        }

        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b

        sizes[i] = (1 - t * 0.6) * (Math.random() * 3 + 2)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          uPixelRatio: { value: pixelRatio },
        },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          uniform float time;
          uniform float uPixelRatio;

          void main() {
            vColor = color;
            vec3 pos = position;

            // Slow rigid rotation in the galactic plane; mod() keeps the
            // angle inside mobile GPU sin/cos range.
            float angle = mod(time * 0.03, 6.28318530718);
            float c = cos(angle);
            float s = sin(angle);
            pos.xz = mat2(c, -s, s, c) * pos.xz;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = clamp(size * uPixelRatio * (400.0 / -mvPosition.z), 1.0, 48.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;

          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;

            float opacity = (1.0 - smoothstep(0.15, 0.5, dist)) * 0.85;
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      })

      const galaxy = new THREE.Points(geometry, material)
      galaxy.position.set(0, 260, -1350)
      galaxy.rotation.x = -1.05
      galaxy.rotation.z = 0.25
      refs.scene.add(galaxy)
      refs.galaxy = galaxy
    }

    const createMountains = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return

      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
      ]

      layers.forEach((layer, index) => {
        const points = []
        const segments = 50

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 -
            100
          points.push(new THREE.Vector2(x, y))
        }

        points.push(new THREE.Vector2(5000, -300))
        points.push(new THREE.Vector2(-5000, -300))

        const shape = new THREE.Shape(points)
        const geometry = new THREE.ShapeGeometry(shape)
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        })

        const mountain = new THREE.Mesh(geometry, material)
        mountain.position.z = layer.distance
        mountain.position.y = layer.distance
        mountain.userData = { baseZ: layer.distance, index }
        refs.scene!.add(mountain)
        refs.mountains.push(mountain)
      })
    }

    const createAtmosphere = () => {
      const { current: refs } = threeRefs
      if (!refs.scene) return

      const geometry = new THREE.SphereGeometry(600, 32, 32)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;

          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;

            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;

            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      })

      const atmosphere = new THREE.Mesh(geometry, material)
      refs.scene.add(atmosphere)
      refs.atmosphere = atmosphere
    }

    const getLocation = () => {
      const { current: refs } = threeRefs
      refs.locations = refs.mountains.map((mountain) => mountain.position.z)
    }

    const animate = () => {
      const { current: refs } = threeRefs
      refs.animationId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()
      const TWO_PI = Math.PI * 2

      // Update stars
      refs.stars.forEach((starField) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time
        }
      })

      // Nebula and atmosphere read time in fragment shaders, which run at
      // fp16 on many mobile GPUs. Every use is sin(x + time)-periodic, so
      // wrapping here is seamless and keeps the value in fp16 range.
      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = (time * 0.5) % TWO_PI
      }

      if (refs.galaxy && refs.galaxy.material.uniforms) {
        refs.galaxy.material.uniforms.time.value = time
      }

      // sin(time * 2.0) in the atmosphere shader has period PI
      if (refs.atmosphere && refs.atmosphere.material.uniforms) {
        refs.atmosphere.material.uniforms.time.value = time % Math.PI
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05

        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor
        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor
        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor

        // Add subtle floating motion
        const floatX = Math.sin(time * 0.1) * 2
        const floatY = Math.cos(time * 0.15) * 1

        refs.camera.position.x = smoothCameraPos.current.x + floatX
        refs.camera.position.y = smoothCameraPos.current.y + floatY
        refs.camera.position.z = smoothCameraPos.current.z
        refs.camera.lookAt(0, 10, -600)
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor
        mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor
      })

      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
    }

    const initThree = () => {
      const { current: refs } = threeRefs

      // Scene setup
      refs.scene = new THREE.Scene()
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025)

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      )
      refs.camera.position.z = 100
      refs.camera.position.y = 20

      // Renderer. antialias on: the scene renders straight to the default
      // framebuffer (no post-processing), so MSAA works and keeps the flat
      // mountain silhouettes from shimmering. DPR capped at 1.5: 2x is
      // nearly indistinguishable here but ~78% more pixels.
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      refs.renderer.setPixelRatio(pixelRatio)
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
      refs.renderer.toneMappingExposure = 0.5

      // Create scene elements
      createStarField()
      createNebula()
      createGalaxy()
      createMountains()
      createAtmosphere()
      getLocation()

      // Start animation
      animate()

      setIsReady(true)
    }

    try {
      initThree()
    } catch (error) {
      console.error(
        'Horizon hero: WebGL initialization failed — rendering static fallback.',
        error
      )
      setWebglFailed(true)
      setIsReady(true)
      return
    }

    const handleResize = () => {
      const { current: refs } = threeRefs
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight
        refs.camera.updateProjectionMatrix()
        refs.renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    // Stop rendering entirely once the hero scrolls out of view — without
    // this, the scene keeps burning GPU under every other section of the
    // page.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const { current: refs } = threeRefs
      if (entry.isIntersecting) {
        if (refs.animationId === null && refs.renderer) {
          animate()
        }
      } else if (refs.animationId !== null) {
        cancelAnimationFrame(refs.animationId)
        refs.animationId = null
      }
    })
    if (containerRef.current) {
      visibilityObserver.observe(containerRef.current)
    }

    return () => {
      const { current: refs } = threeRefs

      visibilityObserver.disconnect()

      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
        refs.animationId = null
      }

      window.removeEventListener('resize', handleResize)

      refs.stars.forEach((starField) => {
        starField.geometry.dispose()
        starField.material.dispose()
      })

      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose()
        mountain.material.dispose()
      })

      if (refs.nebula) {
        refs.nebula.geometry.dispose()
        refs.nebula.material.dispose()
      }

      if (refs.galaxy) {
        refs.galaxy.geometry.dispose()
        refs.galaxy.material.dispose()
      }

      if (refs.atmosphere) {
        refs.atmosphere.geometry.dispose()
        refs.atmosphere.material.dispose()
      }

      if (refs.renderer) {
        refs.renderer.dispose()
      }

      refs.stars = []
      refs.mountains = []
      refs.nebula = null
      refs.galaxy = null
      refs.atmosphere = null
      refs.locations = []
    }
  }, [])

  // Entrance animations are CSS-driven (see .hero-ready rules in
  // horizon-hero.css). The template's global GSAP build loaded by
  // ScriptLoader can freeze module-level GSAP tweens mid-flight, so the
  // hero deliberately avoids GSAP for its reveal sequence.

  // Scroll handling - progress is scoped to this hero's own scroll length
  // so the rest of the page can continue below it.
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const scrollY = window.scrollY
      const maxScroll = Math.max(container.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
      const newSection = Math.min(Math.floor(progress * TOTAL_SECTIONS), TOTAL_SECTIONS)

      // Write scroll-driven UI straight to the DOM — setState here would
      // re-render the whole hero on every scroll frame.
      if (heroContentRef.current) {
        // Fade the pinned hero copy out during the first quarter of the
        // journey so the scrolling section titles never overlap it.
        heroContentRef.current.style.opacity = String(Math.max(0, 1 - progress * 4))
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progress * 100}%`
      }
      if (sectionCounterRef.current) {
        sectionCounterRef.current.textContent = `${String(newSection).padStart(2, '0')} / ${String(TOTAL_SECTIONS).padStart(2, '0')}`
      }

      const { current: refs } = threeRefs

      const totalProgress = progress * TOTAL_SECTIONS
      const sectionProgress = totalProgress % 1

      // Camera positions for each section of the journey
      const cameraPositions = [
        { x: 0, y: 30, z: 300 }, // Section 0 - BYZENTERRA
        { x: 0, y: 40, z: -50 }, // Section 1 - EXPLORE
        { x: 0, y: 50, z: -700 }, // Section 2 - CREATE
      ]

      const currentPos = cameraPositions[newSection] || cameraPositions[0]
      const nextPos = cameraPositions[newSection + 1] || currentPos

      // Set target positions (actual smoothing happens in animate loop)
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress

      // Mountains recede once the journey passes into deep space
      refs.mountains.forEach((mountain, i) => {
        if (progress > 0.7) {
          mountain.position.z = 600000
        } else if (refs.locations[i] !== undefined) {
          mountain.position.z = refs.locations[i]
        }
      })

      const lastMountain = refs.mountains[refs.mountains.length - 1]
      if (refs.nebula && lastMountain) {
        refs.nebula.position.z = lastMountain.position.z
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Set initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const splitTitle = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="title-char" style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
        {char}
      </span>
    ))

  return (
    <div
      ref={containerRef}
      className={`hero-container cosmos-style ${isReady ? 'hero-ready' : ''}`}
    >
      <div className="hero-stage">
        {webglFailed ? (
          <div className="hero-fallback" aria-hidden="true" />
        ) : (
          <canvas ref={canvasRef} className="hero-canvas" />
        )}

        {/* Sitewide globe backdrop. Lives inside the stage so it paints
           above the hero canvas but below the hero copy; position: fixed
           keeps the one instance covering the viewport for the whole page. */}
        <RotatingEarth className="globe-backdrop" />

        {/* Side menu */}
        <div className="side-menu">
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="vertical-text">BYZENTERRA</div>
        </div>

        {/* Main content */}
        <div ref={heroContentRef} className="hero-content cosmos-content">
          <h1 className="hero-title">{splitTitle(SECTION_TITLES[0])}</h1>

          <div className="hero-subtitle cosmos-subtitle">
            <p className="subtitle-line">{SECTION_SUBTITLES[0].line1}</p>
            <p className="subtitle-line">{SECTION_SUBTITLES[0].line2}</p>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="scroll-progress">
          <div className="scroll-text">SCROLL</div>
          <div className="progress-track">
            <div ref={progressFillRef} className="progress-fill" style={{ width: '0%' }} />
          </div>
          <div ref={sectionCounterRef} className="section-counter">
            00 / {String(TOTAL_SECTIONS).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Additional sections for scrolling */}
      <div className="scroll-sections">
        {Array.from({ length: TOTAL_SECTIONS }, (_, i) => (
          <section key={i} className="content-section">
            <h1 className="hero-title">{SECTION_TITLES[i + 1]}</h1>

            <div className="hero-subtitle cosmos-subtitle">
              <p className="subtitle-line">{SECTION_SUBTITLES[i + 1].line1}</p>
              <p className="subtitle-line">{SECTION_SUBTITLES[i + 1].line2}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Component
