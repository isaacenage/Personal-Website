import Header from './components/Header'
import Footer from './components/Footer'
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section'
import About from './components/About'
import Portfolio from './components/Portfolio'
import InsightsTeaser from './components/InsightsTeaser'
import Contact from './components/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <div className="cosmic-backdrop" aria-hidden="true" />
      <main className="cosmic-main">
        <div id="home">
          <HorizonHero />
        </div>
        <About />
        <Portfolio />
        <InsightsTeaser />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
