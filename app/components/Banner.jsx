'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

const Banner = () => {
  const intervalRef = useRef(null)

  useEffect(() => {
    const roles = [
      'a GIS Professional',
      'a Developer',
      'an Analyst',
      'a Spatial Data Scientist',
      'a Geographer'
    ]

    let currentRoleIndex = 0
    const roleElement = document.querySelector('.header-caption .cd-words-wrapper')

    if (roleElement) {
      intervalRef.current = setInterval(() => {
        currentRoleIndex = (currentRoleIndex + 1) % roles.length
        roleElement.innerHTML = `<b class="theme-gradient">${roles[currentRoleIndex]}</b>`
      }, 3000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const initParticles = useCallback(() => {
    if (!window.particlesJS) return

    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 5,
          density: { enable: true, value_area: 1000 }
        },
        color: { value: ['#ffffff'] },
        shape: {
          type: 'star',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 5 }
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: { enable: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false }
        },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          attract: { enable: false }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: false },
          onclick: { enable: false },
          resize: true
        }
      },
      retina_detect: false
    })
  }, [])

  useEffect(() => {
    initParticles()
  }, [initParticles])

  return (
    <div className="tmp-banner-one-area style-4" id="home">
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="inner text-center">
                <div className="thumbnail-author">
                  <Image
                    src="/assets/images/banner/header-bg2.png"
                    alt="personal-logo"
                    width={350}
                    height={350}
                    priority
                    quality={80}
                  />
                </div>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  I&apos;m Isaac Enage, <br />
                  <span className="header-caption">
                    <span className="cd-headline clip is-full-width">
                      <span className="cd-words-wrapper">
                        <b className="theme-gradient">a GIS Professional</b>
                      </span>
                    </span>
                  </span>
                </h1>

                <div className="button-area-banner-one tmp-scroll-trigger tmp-fade-in animation-order-4 mt--30 mt_sm--20">
                  <a
                    className="tmp-btn hover-icon-reverse radius-round"
                    href="https://drive.google.com/file/d/1Hoy7jALr81UTa6PEMn97KqC1ljv5ZOSW/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Download My CV</span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="galaxy"></div>
      <div className="loader-bg-pattern-wrapper">
        <div className="loader-bg-pattern">
          <div className="box">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" className="svg">
                <path d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z"></path>
                <path d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z"></path>
                <path d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z"></path>
              </svg>
            </div>
          </div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
      <div id="particles-js"></div>
    </div>
  )
}

export default Banner
