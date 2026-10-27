# byZenterra.org

The official website of byZenterra — a geospatial, analytics, and web studio. byZenterra builds interactive web maps, decision-ready dashboards, and modern web applications for organizations that run on location data.

## Site Structure

| Route | Purpose |
|-------|---------|
| `/` | Home: hero, services, selected work, industries, process, open data |
| `/services/` `/work/` `/pricing/` `/about/` | Company pages |
| `/insights/`, `/insights/<slug>/` | Articles (add them in `lib/blog.js`) |
| `/contact/` | Project inquiry form (EmailJS) |
| `/privacy/` `/terms/` | Legal |

Company facts, services, projects and pricing all live in `lib/site.js`.
Old routes (`/our-work`, `/blogs`, `/about/*`, `/get-involved/*`) forward to the new ones.

## Technical Stack

- Next.js 14 App Router, static export (`output: 'export'`)
- One hand-written stylesheet, `app/globals.css` (tokens, fluid type, light and dark mode)
- IBM Plex Sans via `next/font`, icons from `lucide-react`

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
