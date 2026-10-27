import { Link } from 'next-view-transitions'
import { Arrow } from '../components/blocks'
import { formatPostDate } from '@/lib/blog'

export default function PostList({ posts }) {
  return (
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
  )
}
