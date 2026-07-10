import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'
import ArticleCard from './ArticleCard'
import { getLatestInsights } from '@/lib/insights'

/* Home-page strip surfacing the latest Insights articles. */
const InsightsTeaser = () => {
  const latest = getLatestInsights(3)

  if (!latest.length) return null

  return (
    <section className="cosmic-section" id="insights">
      <div className="cosmic-section-inner space-y-12">
        <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
          <span className="cosmic-eyebrow">Insights</span>
          <h2 className="cosmic-title">
            Notes from
            <br />
            the Studio
          </h2>
          <div className="cosmic-line" />
          <p className="cosmic-desc">
            Field notes, walkthroughs, and opinions on geospatial technology, data, and the web —
            written by the people doing the work.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.3}
          className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2 lg:grid-cols-3"
        >
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </AnimatedContainer>

        <AnimatedContainer delay={0.4} className="cosmic-head--center">
          <HudButton variant="secondary" href="/insights">
            All Insights
          </HudButton>
        </AnimatedContainer>
      </div>
    </section>
  )
}

export default InsightsTeaser
