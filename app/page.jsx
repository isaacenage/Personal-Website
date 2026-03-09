'use client'

import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/Banner'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Resume from './components/Resume'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import { useScrollAnimations, useOdometer } from './hooks/useScrollAnimations'

export default function Home() {
  useScrollAnimations()
  useOdometer()

  return (
    <div className="spybody index-11" data-spy="scroll" data-bs-target=".navbar-example2" data-offset="150">
      <Header />
      <Banner />
      <About />
      <Services />
      <Pricing />
      <Portfolio />
      <Resume />
      <Contact />
      <Footer />
    </div>
  )
}
