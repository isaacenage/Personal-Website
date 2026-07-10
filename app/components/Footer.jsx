import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="cosmic-footer">
      <div className="logo">
        <Link href="/">
          <img src="/assets/images/logo/byzenterra-full.svg" alt="byZenterra" />
        </Link>
      </div>
      <p>
        &copy; {currentYear} · All rights reserved by{' '}
        <a target="_blank" href="https://www.byzenterra.org" rel="noopener noreferrer">
          byZenterra.org
        </a>
      </p>
    </footer>
  )
}

export default Footer
