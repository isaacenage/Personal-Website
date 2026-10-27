import { Screen, Lead, Close } from '../components/blocks'
import WorkBrowser from '../components/WorkBrowser'

export const metadata = {
  title: 'Work',
  description:
    'Web maps, client websites and geospatial tools built by byZenterra, from live outage maps to open geodata portals.',
}

export default function WorkPage() {
  return (
    <>
      <Screen layout="work">
        <Lead
          route="/work"
          title="Our work"
          lead="Maps, tools and websites we have shipped. Every project opens the live product."
        />
        <WorkBrowser />
      </Screen>
      <Close />
    </>
  )
}
