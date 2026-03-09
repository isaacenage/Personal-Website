import './globals.css'
import ScrollToTop from './components/ScrollToTop'
import ChatWidget from './components/ChatWidget'
import ScriptLoader from './components/ScriptLoader'

export const metadata = {
  title: 'Zaxus',
  description: 'Welcome to Zaxus — Zac\'s Nexus, the digital space of Isaac Enage. Explore a curated portfolio highlighting his journey and expertise in geospatial solutions, data analytics, and web development.',
  icons: {
    icon: '/assets/images/zwlogo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScrollToTop />
        <ChatWidget />
        <ScriptLoader />
      </body>
    </html>
  )
}
