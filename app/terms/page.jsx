import { Screen, Lead } from '../components/blocks'
import { COMPANY } from '@/lib/site'

export const metadata = {
  title: 'Terms of service',
  description: 'Terms governing use of the byZenterra website.',
}

export default function TermsPage() {
  return (
    <Screen layout="split">
      <Lead route="/terms" title="Terms of service" lead="Last updated October 27, 2026." />
      <article className="panel vt-panel">
        <div className="prose">
          <p>
            These terms govern your use of {COMPANY.domain}, operated by {COMPANY.legalName}, a
            business registered with the Department of Trade and Industry of the Philippines. By
            using this site you agree to them.
          </p>
          <h2>Website content</h2>
          <p>
            Content on this site is provided for general information. Prices shown are typical
            ranges, not offers; every engagement is governed by a written proposal or contract
            agreed with the client.
          </p>
          <h2>Intellectual property</h2>
          <p>
            The byZenterra name, site design and written content belong to {COMPANY.legalName}.
            Datasets on the open data portal carry their own licenses and source credits.
          </p>
          <h2>Third-party links</h2>
          <p>
            Project links may lead to sites operated by clients or third parties. We are not
            responsible for their content or practices.
          </p>
          <h2>Liability</h2>
          <p>
            The site is provided as is. To the extent allowed by law, we are not liable for losses
            arising from use of the site or reliance on its content.
          </p>
          <h2>Governing law and contact</h2>
          <p>
            These terms are governed by the laws of the Republic of the Philippines. Questions:{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          </p>
        </div>
      </article>
    </Screen>
  )
}
