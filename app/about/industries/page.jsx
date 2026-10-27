import { Screen, Lead, Close } from '../../components/blocks'
import { SECTORS } from '@/lib/site'

export const metadata = {
  title: 'Industries',
  description: 'Real estate, renewable energy, telecommunications and local government: where byZenterra maps do the work.',
}

export default function IndustriesPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/about"
          title="Where our maps do the work"
          lead="The sectors our field GIS practice grew up in, and still serves."
        />
        <section className="panel vt-panel" aria-label="Industries">
          <dl className="pairs">
            {SECTORS.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Screen>
      <Close />
    </>
  )
}
