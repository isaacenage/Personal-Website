'use client'

import { useEffect } from 'react'

const ScriptLoader = () => {
  useEffect(() => {
    const scripts = [
      '/assets/js/vendor/jquery.js',
      '/assets/js/vendor/bootstrap.min.js',
      '/assets/js/plugins/swiper.js',
      '/assets/js/plugins/gsap.js',
      '/assets/js/plugins/scrolltigger.js',
      '/assets/js/plugins/smoothscroll.js',
      '/assets/js/main.js'
    ]

    const loadedScripts = []

    scripts.forEach((src) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onerror = () => console.warn(`Failed to load script: ${src}`)
      document.head.appendChild(script)
      loadedScripts.push(script)
    })

    return () => {
      loadedScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

  return null
}

export default ScriptLoader
