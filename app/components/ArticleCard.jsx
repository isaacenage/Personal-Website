import Link from 'next/link'
import { formatInsightDate } from '@/lib/insights'

/* Index/teaser card for one Insights article. */
const ArticleCard = ({ article }) => (
  <Link href={`/insights/${article.slug}`} className="cosmic-insight-card p-6 md:p-8">
    <div className="top">
      <span className="category">{article.category}</span>
      <span className="date">{formatInsightDate(article.date)}</span>
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
