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
    let cancelled = false

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (cancelled) return reject(new Error('cancelled'))
        const script = document.createElement('script')
        script.src = src
        script.async = false
        script.onload = resolve
        script.onerror = () => {
          console.warn(`Failed to load script: ${src}`)
          resolve()
        }
        document.body.appendChild(script)
        loadedScripts.push(script)
      })

    const loadAll = async () => {
      for (const src of scripts) {
        if (cancelled) break
        await loadScript(src)
      }
    }

    loadAll()

    return () => {
      cancelled = true
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
