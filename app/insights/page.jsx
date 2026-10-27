import { Screen, Lead } from '../components/blocks'
import PostList from './PostList'
import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'Insights',
  description: 'Notes on geospatial technology, open data and the web from the byZenterra team.',
}

export default function InsightsPage() {
  return (
    <Screen layout="split">
      <Lead
        route="/insights"
        title="Insights"
        lead="What we learn while mapping, measuring and building, written down."
      />
      <PostList posts={getAllPosts()} />
    </Screen>
  )
}
