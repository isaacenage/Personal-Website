import { Screen, Lead, Close, BtnArrow } from '../components/blocks'
import { TIERS, INCLUDED } from '@/lib/site'

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

        <article className="float-card vt-card glass">
          <h2>Every tier includes</h2>
          <ul className="checks">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </Screen>
      <Close title="Need a quote?" />
    </>
  )
}
