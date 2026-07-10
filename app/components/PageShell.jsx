import Header from './Header'
import Footer from './Footer'

/* Common chrome for every page: fixed header, starfield backdrop, and the
   shared hover footer pinned to the bottom of the content flow. The footer
   renders inside .cosmic-main so it out-paints the fixed globe layer. */
const PageShell = ({ children }) => (
  <>
    <Header />
    <div className="cosmic-backdrop" aria-hidden="true" />
    <main className="cosmic-main">
      {children}
      <Footer />
    </main>
  </>
)

export default PageShell
