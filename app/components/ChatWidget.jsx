'use client'

import { useState } from 'react'
import { useEmailJS } from '../hooks/useEmailJS'
import { HudButton } from '@/components/ui/hud-button'

/* Octagonal cut-corner frame behind the launcher icon — same HUD language
   as components/ui/hud-button.tsx, drawn for the 56x56 button. */
const LauncherFrame = () => (
  <svg className="cosmic-chat-frame" viewBox="0 0 56 56" aria-hidden="true">
    <path
      className="frame-path"
      d="M10.5 1.5H45.5L54.5 10.5V45.5L45.5 54.5H10.5L1.5 45.5V10.5Z"
    />
    <circle className="frame-dot" cx="43" cy="9" r="1.2" />
    <circle className="frame-dot" cx="47" cy="9" r="1.2" />
    <circle className="frame-dot" cx="43" cy="13" r="1.2" />
    <circle className="frame-dot" cx="47" cy="13" r="1.2" />
    <circle className="frame-dot" cx="5" cy="30" r="0.7" />
    <circle className="frame-dot" cx="5" cy="35" r="0.7" />
  </svg>
)

const BubbleIcon = () => (
  <svg className="cosmic-chat-icon cosmic-chat-icon--bubble" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6.8 4.5h10.4a2.8 2.8 0 0 1 2.8 2.8v5.4a2.8 2.8 0 0 1-2.8 2.8h-5.1L8 19.5v-4H6.8A2.8 2.8 0 0 1 4 12.7V7.3a2.8 2.8 0 0 1 2.8-2.8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle className="typing-dot" cx="9" cy="10" r="1" />
    <circle className="typing-dot" cx="12" cy="10" r="1" />
    <circle className="typing-dot" cx="15" cy="10" r="1" />
  </svg>
)

const CloseIcon = () => (
  <svg className="cosmic-chat-icon cosmic-chat-icon--close" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M7.5 7.5 16.5 16.5M16.5 7.5 7.5 16.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const { sendEmail, isLoading, message } = useEmailJS()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await sendEmail({
      name: formData.name,
      email: formData.email,
      message: formData.message
    })

    if (success) {
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const isError = message && !message.includes('successfully')

  return (
    <div className={`cosmic-chat${isOpen ? ' is-open' : ''}`} onKeyDown={handleKeyDown}>
      <div
        id="cosmic-chat-panel"
        className="cosmic-chat-panel"
        role="dialog"
        aria-label="Chat with byZenterra"
        aria-hidden={!isOpen}
      >
        <div className="cosmic-chat-head">
          <div>
            <p className="cosmic-chat-title">Chat with byZenterra</p>
            <p className="cosmic-chat-status">
              <span className="dot" aria-hidden="true"></span>
              Online — replies by email
            </p>
          </div>
          <span className="cosmic-chat-dots" aria-hidden="true">
            <i></i><i></i><i></i><i></i>
          </span>
        </div>
        <div className="cosmic-chat-body">
          <p className="cosmic-chat-desc">
            Fill out the form below and the team will get back to you directly.
          </p>
          <form className="cosmic-chat-form" onSubmit={handleSubmit}>
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
              name="email"
              placeholder="Your Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              className="cosmic-input"
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <div className="cosmic-chat-submit">
              <HudButton type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </HudButton>
            </div>
          </form>
          {message && (
            <div
              className={`cosmic-alert ${isError ? 'cosmic-alert--error' : 'cosmic-alert--success'}`}
              role="status"
            >
              {message}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="cosmic-chat-toggle"
        aria-expanded={isOpen}
        aria-controls="cosmic-chat-panel"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <LauncherFrame />
        <BubbleIcon />
        <CloseIcon />
      </button>
    </div>
  )
}

export default ChatWidget
