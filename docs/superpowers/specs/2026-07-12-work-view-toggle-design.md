# Our Work view toggle — Galaxy ⇄ Showcase

**Date:** 2026-07-12
**Status:** Approved (user selected: toggle on the stage; grid clicks open the existing detail modal)

## Goal

Let visitors switch the Our Work page between the existing 3D card galaxy
(`StellarWorkGallery`) and a flat magazine-style showcase adapted from
21st.dev's `team-showcase` (@makviesainte). The original component's source is
auth-gated; the rebuild follows its published preview and description: a
staggered three-column photo grid paired with an interactive list, photos
monotone by default, hover on either side colorizing the matching photo and
highlighting the row.

## Decisions

- **Toggle placement:** pinned to the work stage itself, bottom-right,
  mirroring the "Drag to explore" hint at bottom-left. Header stays untouched;
  works identically on mobile.
- **Grid click behavior:** opens the same `WorkModal` as the galaxy view —
  one code path for project details.
- **Default view:** galaxy (current behavior preserved). No persistence.
- **No new dependencies:** icons come from `lucide-react` (already installed),
  not the original's `react-icons`.

## Architecture

### 1. `components/ui/work-modal.tsx` (new, extracted)

`WorkItem`, `ACCENT`, `CARD_BG`, `chamferClip`, `IMG_MONO_FILTER`,
`IMG_COLOR_FILTER`, and `WorkModal` move out of `3d-image-gallery.tsx` so both
views share them. No behavior change; `3d-image-gallery.tsx` imports them and
re-exports `WorkItem`.

### 2. `components/ui/work-showcase.tsx` (new)

The adapted team-showcase. Team members → work items; portraits → 16:10
project screenshots; roles → categories; social icons → an `ArrowUpRight`
that slides in on the active row.

- **Desktop (≥900px):** two-column layout inside the fullscreen stage. Left:
  staggered three-column photo grid (items distributed round-robin; columns
  carry different top offsets for the magazine stagger). Right: interactive
  list — title, small-caps category, accent dot marker, hover arrow.
- **Hover sync:** one `activeId` state. Hovering a photo or its row colorizes
  that photo (`IMG_MONO_FILTER → IMG_COLOR_FILTER`, the same fade the galaxy
  cards use), highlights the row in aurora-cyan, reveals the arrow.
- **Click:** photo or row → `WorkModal`.
- **Mobile (<900px):** photo grid collapses to two columns, list stacks below.
- **Scrolling:** the showcase root is `overflow-y: auto` with
  `data-lenis-prevent`, so the wheel scrolls the showcase natively while Lenis
  keeps owning the window scroll. Layout classes live in
  `app/styles/cosmic-theme.css` (media queries can't be inline).

### 3. `components/ui/work-view-toggle.tsx` (new)

HUD-styled segmented control (Galaxy | Grid), chamfered plate, uppercase
letter-spaced labels, accent fill on the active segment,
`aria-pressed` on each button. Positioned absolute, bottom-right of the
stage, with `env(safe-area-inset-bottom)` padding on mobile.

### 4. `app/components/Portfolio.jsx` (edited)

Holds `view` in plain `useState` — the toggle and both views share one
component tree, so the external-store pattern (`work-category.js`) is not
needed. Renders `StellarWorkGallery` or `WorkShowcase` (both keyed by
category, both receiving the same filtered items) plus the toggle overlay.
Switching to Grid unmounts the R3F canvas entirely, idling the GPU; the
"Drag to explore" hint lives inside the galaxy component and disappears
with it.

## Testing

- `npx tsc --noEmit` clean.
- Visual pass in the browser: toggle switches views, stagger renders, hover
  sync colorizes, modal opens from both views, category filter applies in
  both views, showcase scrolls without fighting Lenis, mobile layout stacks.
