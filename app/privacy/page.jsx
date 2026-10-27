import { Screen, Lead } from '../components/blocks'
import { COMPANY } from '@/lib/site'

export const metadata = {
  title: 'Privacy policy',
  description:
    'How Zenterra Systems Solutions (byZenterra) collects, uses and protects personal data.',
}

export default function PrivacyPage() {
  return (
    <Screen layout="split">
      <Lead route="/privacy" title="Privacy policy" lead="Last updated October 27, 2026." />
      <article className="panel vt-panel">
        <div className="prose">
          <p>
            {COMPANY.legalName} (&ldquo;byZenterra&rdquo;, &ldquo;we&rdquo;) respects your privacy
            and processes personal data in line with the Data Privacy Act of 2012 (Republic Act No.
            10173) and its implementing rules.
          </p>
          <h2>What we collect</h2>
          <p>
            When you use our contact form or email us, we collect the details you choose to send:
            your name, email address, phone number and the content of your message. This site does
            not use advertising trackers.
          </p>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your inquiry and prepare proposals or quotes.</li>
            <li>To deliver and support projects you engage us for.</li>
            <li>To meet legal, tax and accounting obligations.</li>
          </ul>
          <h2>Sharing</h2>
          <p>
            We do not sell personal data. Contact form messages are delivered through EmailJS, an
            email delivery service. We share data with other parties only when required by law or
            with your consent.
          </p>
          <h2>Retention and security</h2>
          <p>
            We keep inquiry data only as long as needed for the purposes above and protect it with
            reasonable organizational and technical measures.
          </p>
          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data, or object
            to its processing. Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and we
            will respond within a reasonable time. You may also lodge a complaint with the National
            Privacy Commission.
          </p>
        </div>
      </article>
    </Screen>
  )
}
