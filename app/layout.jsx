import { Urbanist, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { ViewTransitions } from 'next-view-transitions'
import Shell from './components/Shell'
import Footer from './components/Footer'
import { COMPANY } from '@/lib/site'

const urbanist = Urbanist({ subsets: ['latin'], display: 'swap', variable: '--font-urbanist' })
const hanken = Hanken_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-hanken' })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#e9e8e3',
}

export const metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: 'byZenterra | GIS, Data and Web Engineering',
    template: '%s | byZenterra',
  },
  description:
    'byZenterra builds web maps, geospatial analysis, dashboards and web applications for organizations in the Philippines.',
  openGraph: {
    type: 'website',
    siteName: COMPANY.brand,
    url: COMPANY.url,
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.brand,
  legalName: COMPANY.legalName,
  url: COMPANY.url,
  email: COMPANY.email,
  logo: `${COMPANY.url}/assets/images/logo/zenterra-logo-dark.png`,
  address: { '@type': 'PostalAddress', addressCountry: 'PH' },
}

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
    <html lang="en" className={`${urbanist.variable} ${hanken.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* Liquid glass refraction, after rdev/liquid-glass-react (MIT, Max Rovensky).
            One shared filter; globals.css applies it as a backdrop-filter. */}
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <filter id="liquid-glass" colorInterpolationFilters="sRGB">
            <feImage
              href="/assets/images/liquid-glass-map.jpg"
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              result="map"
            />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-70" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </svg>
        <Shell>{children}</Shell>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
    </ViewTransitions>
  )
}
