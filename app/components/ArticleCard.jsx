import Link from 'next/link'
import { formatPostDate } from '@/lib/blog'

/* Index/teaser card for one blog post. */
const ArticleCard = ({ article }) => (
  <Link href={`/blogs/${article.slug}`} className="cosmic-insight-card p-6 md:p-8">
    <div className="top">
      <span className="category">{article.category}</span>
      <span className="date">{formatPostDate(article.date)}</span>
    </div>
    <h3 className="title">{article.title}</h3>
    <p className="excerpt">{article.excerpt}</p>
    <div className="bottom">
      <span className="read-time">{article.readTime}</span>
      <span className="arrow" aria-hidden="true">
        <i className="fa-solid fa-arrow-up-right"></i>
      </span>
    </div>
  </Link>
)

export default ArticleCard
