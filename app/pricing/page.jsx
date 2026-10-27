import { Plus } from '@phosphor-icons/react/dist/ssr'
import { Screen, Lead, Close, BtnArrow } from '../components/blocks'
import { TIERS, FAQ } from '@/lib/site'

export const metadata = {
  title: 'Pricing',
  description:
    'Transparent price ranges for websites, web applications and enterprise systems from byZenterra, with a fixed quote after discovery.',
}

export default function PricingPage() {
  return (
    <>
      <Screen layout="pricing">
        <Lead
          route="/pricing"
          title="Pricing"
          lead="Typical ranges in Philippine pesos. You get a fixed written quote after a discovery call."
        />

        <section className="panel panel--bare vt-panel" aria-label="Packages">
          <div className="tiers">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`tier${tier.featured ? ' tier--featured' : ''}`}>
                <h2>{tier.name}</h2>
                <p className="price">{tier.price}</p>
                <p className="fit">{tier.fit}</p>
                <ul>
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {tier.note && <p className="note">{tier.note}</p>}
                <BtnArrow href="/contact" variant={tier.featured ? 'light' : 'ink'}>
                  Request a quote
                </BtnArrow>
              </div>
            ))}
          </div>
        </section>

        <section className="float-card vt-card glass faq" aria-label="Common questions">
          <h2>Common questions</h2>
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <Plus size={18} aria-hidden />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>
      </Screen>
      <Close title="Need a quote?" />
    </>
  )
}
