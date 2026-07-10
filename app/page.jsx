import PageShell from './components/PageShell'
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section'
import About from './components/About'

/* Landing page: the WebGL horizon journey, then the firm introduction
   ("Maps, Metrics, and Code"). Everything else lives on its own page. */
export default function Home() {
  return (
    <PageShell>
      <div id="home">
        <HorizonHero />
      </div>
      <About />
    </PageShell>
  )
}
