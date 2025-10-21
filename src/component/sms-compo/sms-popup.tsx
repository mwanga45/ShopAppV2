

import { useState, useEffect } from "react"
import "./sms-popup.css"

interface SmsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function SmsPopup({ isOpen, onClose }: SmsPopupProps) {
  const [message, setMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [charCount, setCharCount] = useState(0)
  const maxChars = 160

  useEffect(() => {
    setCharCount(message.length)
  }, [message])

  const handleSend = () => {
    if (message.trim() && phoneNumber.trim()) {
      console.log("Sending SMS:", { phoneNumber, message })
      // Add your SMS sending logic here
      setMessage("")
      setPhoneNumber("")
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="sms-overlay" onClick={onClose} />
      <div className="sms-popup">
        <div className="sms-header">
          <div className="sms-header-content">
            <div className="sms-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="sms-title">Send SMS</h2>
          </div>
          <button className="sms-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="sms-body">
          <div className="sms-field">
            <label htmlFor="phone" className="sms-label">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="sms-input"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="sms-field">
            <label htmlFor="message" className="sms-label">
              Message
            </label>
            <textarea
              id="message"
              className="sms-textarea"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={maxChars}
              rows={5}
            />
            <div className="sms-char-count">
              <span className={charCount > maxChars * 0.9 ? "warning" : ""}>
                {charCount} / {maxChars}
              </span>
            </div>
          </div>
        </div>

        <div className="sms-footer">
          <button className="sms-button sms-button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="sms-button sms-button-primary"
            onClick={handleSend}
            disabled={!message.trim() || !phoneNumber.trim()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send Message
          </button>
        </div>
      </div>
    </>
  )
}
