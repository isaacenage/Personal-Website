'use client'

import { useState } from 'react'
import { useEmailJS } from '../hooks/useEmailJS'

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

  return (
    <div className="ready-chatting-option tmp-ready-chat">
      <input
        type="checkbox"
        id="click"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <label htmlFor="click">
        <i className="fab fa-facebook-messenger"></i>
        <i className="fas fa-times"></i>
      </label>
      <div className="wrapper">
        <div className="head-text">
          Let&apos;s chat with me? - Online
        </div>
        <div className="chat-box">
          <div className="desc-text">
            Please fill out the form below to start chatting with me directly.
          </div>
          <form className="tmp-dynamic-form" onSubmit={handleSubmit}>
            <div className="contact-form-wrapper row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    className="input-field"
                    name="name"
                    placeholder="Your Name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    className="input-field"
                    name="email"
                    placeholder="Your Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea
                    className="input-field"
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="tmp-button-here">
                  <button
                    className="tmp-btn hover-icon-reverse radius-round w-100"
                    type="submit"
                    disabled={isLoading}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">
                        {isLoading ? 'Sending...' : 'Send Message'}
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right"></i>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          {message && (
            <div className="error">
              <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatWidget
