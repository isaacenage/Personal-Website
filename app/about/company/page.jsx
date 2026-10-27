import { Screen, Lead, Close } from '../../components/blocks'
import { COMPANY } from '@/lib/site'

export const metadata = {
  title: 'Company',
  description: 'Registration and contact details for Zenterra Systems Solutions, the company behind byZenterra.',
}

export default function CompanyPage() {
  return (
    <>
      <Screen layout="split">
        <Lead
          route="/about"
          title="Company details"
          lead="Who you are contracting with, for procurement and paperwork."
        />
        <section className="panel vt-panel" aria-label="Company">
          <dl className="facts">
            <div>
              <dt>Brand</dt>
              <dd>{COMPANY.brand}</dd>
            </div>
            <div>
              <dt>Registered name</dt>
              <dd>{COMPANY.legalName}</dd>
            </div>
            <div>
              <dt>Registration</dt>
              <dd>{COMPANY.registration}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>{COMPANY.domain}</dd>
            </div>
          </dl>
        </section>
      </Screen>
      <Close />
    </>
  )
}
