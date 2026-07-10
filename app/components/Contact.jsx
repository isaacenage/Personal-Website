'use client'

import { useState } from 'react'
import { useEmailJS } from '../hooks/useEmailJS'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { HudButton } from '@/components/ui/hud-button'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const { sendEmail, isLoading, message } = useEmailJS()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await sendEmail(formData)

    if (success) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      })
    }
  }

  return (
    <section className="cosmic-section" id="contacts">
      <div className="cosmic-section-inner max-w-3xl">
        <AnimatedContainer className="cosmic-head--center mx-auto mb-14 max-w-3xl">
          <span className="cosmic-eyebrow">Start a Project</span>
          <h2 className="cosmic-title">
            Let&apos;s Build
            <br />
            Something Together
          </h2>
          <div className="cosmic-line" />
          <p className="cosmic-desc">
            Tell us what you&apos;re mapping, measuring, or building — the byZenterra team will get
            back to you with a plan and a quote.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3}>
          <form className="cosmic-form" id="contact-form" onSubmit={handleSubmit}>
            <input
              className="cosmic-input"
              name="name"
              placeholder="Your Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              className="cosmic-input"
              name="phone"
              placeholder="Phone Number"
              type="text"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input
              className="cosmic-input"
              name="email"
              placeholder="Your Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              className="cosmic-input"
              name="subject"
              placeholder="Subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
            />
            <textarea
              className="cosmic-input full"
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <div className="full flex justify-center">
              <HudButton type="submit" disabled={isLoading}>
                {isLoading ? 'Sending…' : 'Send Message'}
              </HudButton>
            </div>
          </form>

          {message && (
            <div
              className={`cosmic-alert ${
                message.includes('Error') ? 'cosmic-alert--error' : 'cosmic-alert--success'
              }`}
              role="status"
            >
              {message}
            </div>
          )}
        </AnimatedContainer>
      </div>
    </section>
  )
}

export default Contact
