import { Link } from 'next-view-transitions'
import { Screen, Lead, Arrow } from '../components/blocks'
import { getAllPosts, formatPostDate } from '@/lib/blog'

export const metadata = {
  title: 'Insights',
  description: 'Notes on geospatial technology, open data and the web from the byZenterra team.',
}

export default function InsightsPage() {
  const posts = getAllPosts()

  return (
    <Screen layout="split">
      <Lead
        route="/insights"
        title="Insights"
        lead="What we learn while mapping, measuring and building, written down."
      />
      <section className="panel vt-panel" aria-label="Articles">
        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/insights/${post.slug}`} className="post-item">
              <div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="meta">
                  {post.category}, {formatPostDate(post.date)}
                </span>
              </div>
              <span className="circle">
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Screen>
  )
}
