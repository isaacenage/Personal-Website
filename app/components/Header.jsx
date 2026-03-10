'use client'

import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className="tmp-header-area-start header-one header--sticky header--transparent">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-content">
                <div className="logo">
                  <Link href="/">
                    <img className="logo-dark" src="/assets/images/logo/zachwebfull.png" alt="ZachWeb - Personal Portfolio" />
                  </Link>
                </div>
                <div className="tmp-mainmenu-nav d-none d-xl-block">
                  <nav className="navbar-example2 onepagenav onepage">
                    <ul className="tmp-mainmenu nav nav-pills">
                      <li className="current"><Link className="smoth-animation" href="/">Home</Link></li>
                      <li className="nav-item"><a className="smoth-animation" href="#about">About</a></li>
                      <li className="nav-item"><a className="smoth-animation" href="#service">Services</a></li>
                      <li className="nav-item"><a className="smoth-animation" href="#pricing">Pricing</a></li>
                      <li className="nav-item"><a className="smoth-animation" href="#portfolio">Portfolio</a></li>
                      <li className="nav-item"><a className="smoth-animation" href="#resume">Resume</a></li>
                      <li className="nav-item"><a className="smoth-animation" href="#contacts">Contact</a></li>
                    </ul>
                  </nav>
                </div>

                <div className="tmp-header-right">
                  <div className="social-share-wrapper d-none d-md-block">
                    <div className="social-link">
                      <a href="https://instagram.com/isaacenagework" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a href="https://ph.linkedin.com/in/ivenage" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a href="https://www.x.com/isaacwork0105" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a href="https://www.facebook.com/isaacenagework" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      <a href="https://www.github.com/isaacenage" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-github"></i>
                      </a>
                    </div>
                  </div>

                  <div className="tmp-side-collups-area d-block d-xl-none">
                    <button
                      className="hamberger-menu humberger_menu_active"
                      onClick={toggleMobileMenu}
                    >
                      <i id="menuBtn" className="fa-light fa-bars humberger-menu"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="d-block d-xl-none">
        <div className={`tmp-popup-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="inner">
            <div className="header-top">
              <div className="logo">
                <Link href="/" className="logo-area">
                  <img className="logo-dark" src="/assets/images/logo/zachwebfull.png" alt="logo" />
                  <img className="logo-white" src="/assets/images/logo/logo-white.png" alt="logo" />
                </Link>
              </div>
              <div className="close-menu">
                <button
                  className="close-button tmp-round-action-btn"
                  onClick={toggleMobileMenu}
                >
                  <i className="fa-sharp fa-light fa-xmark"></i>
                </button>
              </div>
            </div>

            <ul className="tmp-mainmenu onepagenav-click onepage">
              <li className="current"><Link className="smoth-animation" href="/" onClick={toggleMobileMenu}>Home</Link></li>
              <li className="nav-item"><a className="smoth-animation" href="#about" onClick={toggleMobileMenu}>About</a></li>
              <li className="nav-item"><a className="smoth-animation" href="#service" onClick={toggleMobileMenu}>Services</a></li>
              <li className="nav-item"><a className="smoth-animation" href="#pricing" onClick={toggleMobileMenu}>Pricing</a></li>
              <li className="nav-item"><a className="smoth-animation" href="#portfolio" onClick={toggleMobileMenu}>Portfolio</a></li>
              <li className="nav-item"><a className="smoth-animation" href="#resume" onClick={toggleMobileMenu}>Resume</a></li>
              <li className="nav-item"><a className="smoth-animation" href="#contacts" onClick={toggleMobileMenu}>Contact</a></li>
            </ul>

            <div className="social-wrapper mt--40">
              <span className="subtitle">find with me</span>
              <div className="social-link">
                <a href="https://instagram.com/isaacenagework" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://ph.linkedin.com/in/ivenage" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.x.com/isaacwork0105" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="https://www.facebook.com/isaacenagework" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.github.com/isaacenage" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
