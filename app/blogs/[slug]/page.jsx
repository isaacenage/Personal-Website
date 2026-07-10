import { notFound } from 'next/navigation'
import PageShell from '../../components/PageShell'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'
import { getAllPosts, getPost, formatPostDate } from '@/lib/blog'

// Static export: pre-render one page per registered post.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug)
  if (!post) return { title: 'Blogs — byZenterra' }
  return {
    title: `${post.title} — byZenterra`,
    description: post.excerpt,
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

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <PageShell>
      <article className="cosmic-section cosmic-page-hero">
        <div className="cosmic-section-inner max-w-3xl">
          <AnimatedContainer>
            <div className="cosmic-article-meta">
              <span className="category">{post.category}</span>
              <span>{formatPostDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="cosmic-title">{post.title}</h1>
            <div className="cosmic-line" />
            <p className="cosmic-article-byline">By {post.author}</p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.25} className="cosmic-article">
            {post.body.map((block, i) =>
              BLOCK_RENDERERS[block.type] ? BLOCK_RENDERERS[block.type](block, i) : null
            )}
          </AnimatedContainer>

          <AnimatedContainer delay={0.3} className="mt-14">
            <HudButton variant="secondary" href="/blogs">
              All Posts
            </HudButton>
          </AnimatedContainer>
        </div>
      </article>
    </PageShell>
  )
}
