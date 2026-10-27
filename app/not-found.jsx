import { Screen, Lead, BtnArrow } from './components/blocks'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <Screen layout="solo">
      <Lead
        route="/404"
        title="Page not found"
        lead="The page you are looking for has moved or no longer exists."
      >
        <div className="actions">
          <BtnArrow href="/" variant="light">
            Back to home
          </BtnArrow>
        </div>
      </Lead>
    </Screen>
  )
}
