import { Screen, Lead, Close, BtnArrow } from '../../components/blocks'
import { PROCESS, INCLUDED } from '@/lib/site'

export const metadata = {
  title: 'Process',
  description: 'How a byZenterra project runs: discovery and a fixed quote, reviewable builds, then documented handover.',
}

export default function ProcessPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/services"
          title="How a project runs"
          lead="Three stages, each with something you can review before the next begins."
        />

        <section className="panel vt-panel" aria-label="Project stages">
          <ol className="mini-steps mini-steps--lg">
            {PROCESS.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.body}</span>
              </li>
            ))}
          </ol>
        </section>

        <article className="float-card vt-card glass">
          <h2>Every project includes</h2>
          <ul className="checks">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <BtnArrow href="/contact" variant="ink">
            Start with discovery
          </BtnArrow>
        </article>
      </Screen>
      <Close />
    </>
  )
}
