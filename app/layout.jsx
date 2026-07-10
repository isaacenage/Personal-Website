import './globals.css'
import './styles/horizon-hero.css'
import './styles/cosmic-theme.css'
import './styles/hud-button.css'
import './styles/cosmic-chat.css'
import ScrollToTop from './components/ScrollToTop'
import ChatWidget from './components/ChatWidget'
import SmoothScroll from './components/SmoothScroll'
import InteractionGuard from './components/InteractionGuard'

/* viewportFit: 'cover' draws under notches/dynamic islands/status bars on any
   phone — the safe-area env() paddings in the stylesheets keep UI clear of
   them. The scale locks disable pinch/double-tap zoom where the meta tag is
   honored (Android); InteractionGuard covers iOS Safari, which ignores it. */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata = {
  title: 'byZenterra — Geospatial, Analytics & Web Studio',
  description: 'byZenterra is a creative technology studio building interactive web maps, decision-ready dashboards, and modern web applications. We turn spatial data, analytics, and code into products your team can act on.',
  icons: {
    icon: '/assets/images/logo/byzenterra-icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScrollToTop />
        <ChatWidget />
        <SmoothScroll />
        <InteractionGuard />
      </body>
    </html>
  )
}
