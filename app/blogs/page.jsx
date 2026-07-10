import PageShell from '../components/PageShell'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blogs — byZenterra',
  description:
    'Field notes, walkthroughs, and opinions on geospatial technology, open data, and the web from the byZenterra team.',
}

export default function BlogsPage() {
  const posts = getAllPosts()

  return (
    <PageShell>
      <PageHero
        eyebrow="Blogs"
        title="Notes from the Field"
        description="What we learn while mapping, measuring, and building — written down. Field notes from real GIS work, practical tool walkthroughs, and honest opinions on where geospatial technology is heading."
      />

      <section className="cosmic-section pt-0">
        <div className="cosmic-section-inner">
          {posts.length ? (
            <AnimatedContainer
              delay={0.2}
              className="grid grid-cols-1 divide-x divide-y divide-dashed divide-white/10 cosmic-grid-frame sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <ArticleCard key={post.slug} article={post} />
              ))}
            </AnimatedContainer>
          ) : (
            <AnimatedContainer className="cosmic-head--center mx-auto max-w-3xl">
              <p className="cosmic-desc">
                The first posts are being written now — check back soon.
              </p>
            </AnimatedContainer>
          )}
        </div>
      </section>
    </PageShell>
  )
}
