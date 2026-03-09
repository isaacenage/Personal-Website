'use client'

import { useState } from 'react'
import { useEmailJS } from '../hooks/useEmailJS'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
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
    const success = await sendEmail(formData)

    if (success) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      })
    }
  }

  return (
    <section className="contact-area tmp-section-gapTop" id="contacts">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Contact Me</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Let&apos;s Work Together
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Ready to bring your geospatial and development projects to life? Get in touch and let&apos;s discuss your needs.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <form className="tmp-dynamic-form" id="contact-form" onSubmit={handleSubmit}>
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
                      name="phone"
                      placeholder="Phone Number"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputChange}
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
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      className="input-field"
                      name="subject"
                      placeholder="Subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
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
              <div id="form-messages" className="error">
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
