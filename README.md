# byZenterra.org

The official website of byZenterra — a geospatial, analytics, and web studio. byZenterra builds interactive web maps, decision-ready dashboards, and modern web applications for organizations that run on location data.

## Site Structure

| Route | Purpose |
|-------|---------|
| `/` | Home — horizon hero, studio overview, featured work, latest insights, contact |
| `/what-we-do/` | Services, engagement process, and pricing |
| `/who-we-are/` | Mission and values, track record, leadership |
| `/insights/` | Articles written by the studio (field notes, walkthroughs, opinions) |
| `/insights/<slug>/` | Individual article pages |
| `/Portfolio/*`, `/Tools/*` | Static project showcases and tools (e.g. Title Plotter PH) |

## Publishing an Insights Article

Articles live in [`lib/insights.js`](lib/insights.js). Add an object to the `ARTICLES` array (slug, title, category, date, author, excerpt, and a `body` of content blocks) and rebuild — the article page and index/teaser cards are generated automatically.

## Technical Stack

- **Framework**: Next.js 14 (App Router, static export via `output: 'export'`)
- **Styling**: Tailwind CSS + the custom cosmic theme (`app/styles/cosmic-theme.css`)
- **3D / animation**: Three.js horizon hero, Lenis smooth scrolling, IntersectionObserver reveals
- **Contact**: EmailJS-backed contact form and chat widget
- **Hosting**: Static export served at [byzenterra.org](https://www.byzenterra.org) (see `CNAME`)

## Development

```bash
npm install
npm run dev     # local development
npm run build   # static export to out/
```

## License

MIT License — see LICENSE file for details.

## Contact

- Website: https://www.byzenterra.org
- Use the contact form on the site to start a project.
