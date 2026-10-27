import { PlusSignIcon } from '@/app/components/icons/plus-sign'
import { Screen, Lead, Close, BtnArrow } from '../../components/blocks'
import { FAQ } from '@/lib/site'

export const metadata = {
  title: 'Pricing FAQ',
  description: 'How byZenterra prices projects, works with government offices and supports what it ships.',
}

export default function PricingFaqPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/pricing"
          title="Common questions"
          lead="Pricing, government work, support and tools, answered before the discovery call."
        />

        <section className="panel vt-panel faq" aria-label="Common questions">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <PlusSignIcon size={18} aria-hidden />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <article className="float-card vt-card glass">
          <h2>Still deciding?</h2>
          <p>Send a short brief. We reply with a written scope and a fixed quote.</p>
          <BtnArrow href="/contact" variant="ink">
            Request a quote
          </BtnArrow>
        </article>
      </Screen>
      <Close title="Need a quote?" />
    </>
  )
}
