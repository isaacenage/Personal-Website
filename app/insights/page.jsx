import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { getAllInsights } from '@/lib/insights'

export const metadata = {
  title: 'Insights — byZenterra',
  description:
    'Field notes, walkthroughs, and opinions on geospatial technology, data, and the web from the byZenterra studio.',
}

export default function InsightsPage() {
  const articles = getAllInsights()

  return (
    <>
      <Header />
      <div className="cosmic-backdrop" aria-hidden="true" />
      <main className="cosmic-main">
        <PageHero
          eyebrow="Insights"
          title="Notes from the Studio"
          description="What we learn while mapping, measuring, and building — written down. Field notes from real GIS work, practical tool walkthroughs, and honest opinions on where geospatial technology is heading."
        />

        <section className="cosmic-section pt-0">
          <div className="cosmic-section-inner">
            {articles.length ? (
              <AnimatedContainer
                delay={0.2}
                className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2 lg:grid-cols-3"
              >
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </AnimatedContainer>
            ) : (
              <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
                <p className="cosmic-desc">
                  The first articles are being written now — check back soon.
                </p>
              </AnimatedContainer>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
