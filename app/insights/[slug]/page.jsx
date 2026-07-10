import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'
import { getAllInsights, getInsight, formatInsightDate } from '@/lib/insights'

// Static export: pre-render one page per registered article.
export function generateStaticParams() {
  return getAllInsights().map((article) => ({ slug: article.slug }))
}

export function generateMetadata({ params }) {
  const article = getInsight(params.slug)
  if (!article) return { title: 'Insights — byZenterra' }
  return {
    title: `${article.title} — byZenterra Insights`,
    description: article.excerpt,
  }
}

const BLOCK_RENDERERS = {
  p: (block, i) => <p key={i}>{block.text}</p>,
  h2: (block, i) => <h2 key={i}>{block.text}</h2>,
  ul: (block, i) => (
    <ul key={i}>
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ),
  quote: (block, i) => <blockquote key={i}>{block.text}</blockquote>,
}

export default function InsightArticlePage({ params }) {
  const article = getInsight(params.slug)
  if (!article) notFound()

  return (
    <>
      <Header />
      <div className="cosmic-backdrop" aria-hidden="true" />
      <main className="cosmic-main">
        <article className="cosmic-section cosmic-page-hero">
          <div className="cosmic-section-inner max-w-3xl">
            <AnimatedContainer>
              <div className="cosmic-article-meta">
                <span className="category">{article.category}</span>
                <span>{formatInsightDate(article.date)}</span>
                <span>{article.readTime}</span>
              </div>
              <h1 className="cosmic-title">{article.title}</h1>
              <div className="cosmic-line" />
              <p className="cosmic-article-byline">By {article.author}</p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.25} className="cosmic-article">
              {article.body.map((block, i) =>
                BLOCK_RENDERERS[block.type] ? BLOCK_RENDERERS[block.type](block, i) : null
              )}
            </AnimatedContainer>

            <AnimatedContainer delay={0.3} className="mt-14">
              <HudButton variant="secondary" href="/insights">
                All Insights
              </HudButton>
            </AnimatedContainer>
          </div>
        </article>

        <Footer />
      </main>
    </>
  )
}
