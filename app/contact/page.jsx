import { Screen, Lead } from '../components/blocks'
import ContactForm from '../components/ContactForm'
import { COMPANY } from '@/lib/site'

export const metadata = {
  title: 'Contact',
  description: 'Start a project with byZenterra. Send a brief and receive a scope and a fixed quote.',
}

export default function ContactPage() {
  return (
    <Screen layout="split">
      <Lead
        route="/contact"
        title="Start a project"
        lead="Tell us what you are mapping, measuring or building. We reply by email with next steps."
      />

      <section className="panel vt-panel" aria-label="Project inquiry">
        <ContactForm />
      </section>

      <article className="float-card vt-card glass">
        <dl className="facts">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </dd>
          </div>
          <div>
            <dt>Business</dt>
            <dd>{COMPANY.legalName}</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{COMPANY.location}, working with clients locally and abroad</dd>
          </div>
        </dl>
      </article>
    </Screen>
  )
}
