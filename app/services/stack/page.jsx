import { Screen, Lead, Close } from '../../components/blocks'
import { STACK } from '@/lib/site'

export const metadata = {
  title: 'Tech stack',
  description: 'The GIS, mapping, dashboard, automation and design tools byZenterra works with.',
}

export default function StackPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/services"
          title="Tools we work in"
          lead="We fit the stack your team already uses, so what we hand over stays maintainable."
        />

        <section className="panel vt-panel" aria-label="Tech stack">
          <dl className="pairs">
            {STACK.map((s) => (
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
