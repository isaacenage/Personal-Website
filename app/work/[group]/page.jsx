import { notFound } from 'next/navigation'
import { Screen, Lead, Close } from '../../components/blocks'
import WorkBrowser from '../../components/WorkBrowser'
import { WORK_GROUPS } from '@/lib/site'

// Static export: one page per work group.
export function generateStaticParams() {
  return Object.keys(WORK_GROUPS).map((group) => ({ group }))
}

export function generateMetadata({ params }) {
  const g = WORK_GROUPS[params.group]
  return g ? { title: `${g.label} | Work`, description: g.lead } : { title: 'Work' }
}

export default function WorkGroupPage({ params }) {
  const g = WORK_GROUPS[params.group]
  if (!g) notFound()

  return (
    <>
      <Screen layout="work">
        <Lead route="/work" title={g.label} lead={g.lead} />
        <WorkBrowser group={params.group} />
      </Screen>
      <Close />
    </>
  )
}
