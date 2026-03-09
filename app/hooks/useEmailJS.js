'use client'

import { useState, useEffect } from 'react'

const EMAILJS_CONFIG = {
  serviceId: 'service_1seo4n9',
  templateId: 'template_8ybvobt',
  publicKey: 'KfD6YKZjWI0f9p6mM'
}

export const useEmailJS = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_CONFIG.publicKey)
      }
    }
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const sendEmail = async (formData) => {
    if (!window.emailjs) {
      setMessage('Email service not loaded')
      return false
    }

    setIsLoading(true)
    setMessage('')

    try {
      const params = {
        name: formData.name,
        phone: formData.phone || '',
        email: formData.email,
        subject: formData.subject || 'Contact from Portfolio',
        message: formData.message
      }

      await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        params
      )

      setMessage('Message sent successfully!')
      setIsLoading(false)
      return true
    } catch (error) {
      setMessage(`Error: ${error.text || 'Failed to send message'}`)
      setIsLoading(false)
      return false
    }
  }

  return { sendEmail, isLoading, message }
}
