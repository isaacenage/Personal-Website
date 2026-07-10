# Performance Overhaul — byZenterra Site (2026-07-10)

## Goal

Make the site run smoothly in any browser on any laptop (including low-end
integrated GPUs) **without changing the cosmic design system or UI**. Remove
effects that only cost frames (backdrop blurs), stop work that runs while
invisible, shrink payloads, and adopt Lenis for smooth scrolling.

## Diagnosis

1. **~500KB of template JS on every page** via `ScriptLoader` (jQuery, Swiper,
   Bootstrap JS, GSAP + SplitText + ScrollTrigger, wheel-hijacking
   `smoothscroll.js`, `main.js`). The home page uses **none** of it — every
   home component is React/CSS/IntersectionObserver-based. Only `/about`
   still uses template features (`.wow`, `.odometer`, jQuery init chain).
2. **Three render loops that never pause:**
   - Three.js hero: UnrealBloomPass at up to 2× devicePixelRatio with
     `antialias: true` (useless under EffectComposer), still rendering when
     scrolled past.
   - Sitewide globe canvas: ~10k halftone dots re-projected with spherical
     trig (`geoDistance` + `projection()`) per dot per frame, each dot its
     own `beginPath()/fill()`.
   - Pricing particles canvas: rAF loop runs even when the section is
     off-screen.
3. **Backdrop-filter blurs** on `.cosmic-mobile-menu` (14px) and
   `.pricing-card--pop` (6px). Both sit on ≥0.92-alpha backgrounds, so the
   blur is visually negligible but forces expensive filter passes.
4. **Images**: `owner.png` is 5.3MB; portfolio PNG screenshots total ~2.5MB.
5. **Per-scroll React re-renders**: hero (`setScrollProgress`) and
   ScrollToTop (`setScrollProgress`) update state every scroll frame.

## Changes

### A. Script diet (home page)
- Remove `<ScriptLoader />` from `app/layout.jsx`; render it only in
  `app/about/page.jsx` (unchanged list minus `smoothscroll.js`, which Lenis
  replaces). Swiper stays on /about because `main.js` references `Swiper`.
- Remove unused `swiper.css` import from `app/globals.css`.

### B. Lenis smooth scrolling (sitewide)
- `npm i lenis`; new `app/components/SmoothScroll.jsx` client component:
  instantiates Lenis (autoRaf), disabled under `prefers-reduced-motion`,
  smooth-scrolls in-page anchor links, exposes `window.lenis`.
- Remove `html { scroll-behavior: smooth }` from cosmic-theme.css (conflicts
  with Lenis); ScrollToTop uses `window.lenis?.scrollTo` with native fallback.

### C. Hero renderer (components/ui/horizon-hero-section.tsx)
- `antialias: false`, `powerPreference: 'high-performance'`, DPR cap 1.5,
  bloom pass at half resolution (visually identical for a soft glow).
- IntersectionObserver on the hero container pauses/resumes the rAF loop —
  zero GPU cost once the user scrolls past the hero.
- Scroll progress/opacity/counter written directly to DOM refs; React state
  kept only for rare changes (`isReady`, `webglFailed`).

### D. Globe renderer (components/ui/wireframe-dotted-globe.tsx)
- Precompute each dot's sin/cos once; per frame only the longitude rotation
  changes, so projection + visibility test become a few multiplies per dot
  (no `geoDistance`/`projection()` per dot).
- Draw all dots in a single path with one `fill()` call.
- Cap canvas DPR at 1.5.

### E. Pricing particles (app/components/Pricing.jsx)
- rAF loop starts/stops with section visibility (IntersectionObserver).

### F. Blur/glass removal (visual parity)
- `.cosmic-mobile-menu`: drop `backdrop-filter: blur(14px)`, raise bg alpha
  0.92 → 0.97.
- `.pricing-card--pop`: drop `backdrop-filter: blur(6px)` (bg already 0.92
  over a dark section — no visible change).

### G. Images
- `owner.png` → resized WebP (~1200px wide) + `loading="lazy"`,
  `decoding="async"`, `width`/`height` attributes.
- `latest-portfolio/*.png` → WebP (originals kept on disk; JSX paths updated).

### H. ScrollToTop
- Write progress transform/visibility to refs; no state updates on scroll.

## Non-goals

- No visual/design changes beyond the imperceptible blur substitutions.
- No deletion of template assets from `public/` (standalone HTML pages under
  `public/Tools` and `public/Portfolio` still reference them).
- No changes to the /about page's look or its template-driven behavior.

## Verification

- `npm run build` (static export) passes.
- Dev-server smoke test: hero renders and animates, scrolling is smooth,
  anchors scroll correctly, mobile menu opens, pricing animates in view,
  /about unchanged, no console errors.
