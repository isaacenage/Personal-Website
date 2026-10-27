import { Screen, Lead, Close } from '../../components/blocks'
import { VALUES } from '@/lib/site'

export const metadata = {
  title: 'Values',
  description: 'The six standards byZenterra holds its maps, data and software to.',
}

export default function ValuesPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/about"
          title="What we hold to"
          lead="Six standards every map, dataset and application is checked against."
        />
        <section className="panel vt-panel" aria-label="Values">
          <dl className="pairs">
            {VALUES.map((v) => (
              <div key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Screen>
      <Close />
    </>
  )
}
