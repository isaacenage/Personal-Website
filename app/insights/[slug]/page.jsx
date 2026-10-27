import { notFound } from 'next/navigation'
import { Screen, Lead, BtnArrow } from '../../components/blocks'
import { getAllPosts, getPost, formatPostDate } from '@/lib/blog'

// Static export: pre-render one page per registered post.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug)
  if (!post) return { title: 'Insights' }
  return { title: post.title, description: post.excerpt }
}

const BLOCKS = {
  p: (b, i) => <p key={i}>{b.text}</p>,
  h2: (b, i) => <h2 key={i}>{b.text}</h2>,
  ul: (b, i) => (
    <ul key={i}>
      {b.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ),
  quote: (b, i) => <blockquote key={i}>{b.text}</blockquote>,
}

export default function PostPage({ params }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <Screen layout="split">
      <Lead
        route="/insights"
        title={post.title}
        lead={`By ${post.author}, ${formatPostDate(post.date)}`}
      >
        <div className="actions">
          <BtnArrow href="/insights" variant="light">
            All insights
          </BtnArrow>
        </div>
      </Lead>
      <article className="panel vt-panel">
        <div className="prose">{post.body.map((b, i) => BLOCKS[b.type]?.(b, i))}</div>
      </article>
    </Screen>
  )
}
