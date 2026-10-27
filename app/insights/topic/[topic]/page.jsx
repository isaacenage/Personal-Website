import { notFound } from 'next/navigation'
import { Screen, Lead } from '../../../components/blocks'
import PostList from '../../PostList'
import { getAllPosts, getTopics, topicSlug } from '@/lib/blog'

// Static export: one page per post category.
export function generateStaticParams() {
  return getTopics().map((t) => ({ topic: t.slug }))
}

const topicOf = (slug) => getTopics().find((t) => t.slug === slug)

export function generateMetadata({ params }) {
  const t = topicOf(params.topic)
  return { title: t ? `${t.label} | Insights` : 'Insights' }
}

export default function TopicPage({ params }) {
  const t = topicOf(params.topic)
  if (!t) notFound()
  const posts = getAllPosts().filter((post) => topicSlug(post.category) === t.slug)

  return (
    <Screen layout="split">
      <Lead route="/insights" title={t.label} lead={`Articles filed under ${t.label}.`} />
      <PostList posts={posts} />
    </Screen>
  )
}
