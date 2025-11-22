"use client"

import { useState, useEffect } from "react"
import { Button } from "../button/Button"


interface Payment {
  id: string
  title: string
  amount: number
  dueDate: string
  recipient: string
  description?: string
  invoiceNumber?: string
}

interface PendingPaymentSliderProps {
  payments: Payment[]
}

export function PendingPaymentSlider({ payments }: PendingPaymentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [showDetails, setShowDetails] = useState(false)

  const nextPayment = () => {
    setDirection("right")
    setCurrentIndex((prev) => (prev + 1) % payments.length)
  }

  const prevPayment = () => {
    setDirection("left")
    setCurrentIndex((prev) => (prev - 1 + payments.length) % payments.length)
  }

  useEffect(() => {
    const timer = setInterval(nextPayment, 5000)
    return () => clearInterval(timer)
  }, [payments.length])

  const currentPayment = payments[currentIndex]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = getDaysUntilDue(currentPayment.dueDate)

  return (
    <div className="payment-slider-wrapper">
      <div className="payment-card">
        <div className="payment-card-header">
          <div className="payment-card-header-content">
            <h2 className="payment-card-title">Pending Payments</h2>
            <div className="payment-counter">
              <span>{currentIndex + 1}</span>
              <span>/</span>
              <span>{payments.length}</span>
            </div>
          </div>
        </div>

        <div className="payment-slide-container">
          <div className={`payment-slide payment-slide-${direction}`} key={currentPayment.id}>
            <div className="payment-slide-content">
              <div className="payment-info-section">
                <div className="payment-header-row">
                  <div>
                    <h3 className="payment-item-title">{currentPayment.title}</h3>
                    <p className="payment-recipient">{currentPayment.recipient}</p>
                  </div>
                  <div
                    className={`payment-badge ${daysUntilDue <= 3 ? "payment-badge-urgent" : "payment-badge-normal"}`}
                  >
                    {daysUntilDue <= 0 ? "Overdue" : `${daysUntilDue} days left`}
                  </div>
                </div>

                <div className="payment-details-row">
                  <div className="payment-detail-item">
                    <svg className="payment-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="payment-detail-label">Amount</p>
                      <p className="payment-detail-value">${currentPayment.amount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="payment-detail-item">
                    <svg className="payment-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="payment-detail-label">Due Date</p>
                      <p className="payment-detail-value">{formatDate(currentPayment.dueDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-actions"> 
                <Button buttonName="Pay Now"/>
                  
                <Button buttonName = 'View Details' Onclick={() => setShowDetails(true)} >
                  
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-footer">
          <Button buttonName="previos" Onclick={prevPayment} />

          <div className="payment-dots">
            {payments.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left")
                  setCurrentIndex(index)
                }}
                className={`payment-dot ${index === currentIndex ? "payment-dot-active" : ""}`}
                aria-label={`Go to payment ${index + 1}`}
              />
            ))}
          </div>

          <Button buttonName = 'nextPayment' Onclick={nextPayment} />
        </div>
      </div>

      {showDetails && (
        <div className="payment-modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="payment-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h3 className="payment-modal-title">Payment Details</h3>
              <button onClick={() => setShowDetails(false)} className="payment-modal-close">
                <svg className="payment-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="payment-modal-body">
              <div className="payment-modal-field">
                <p className="payment-modal-label">Payment Title</p>
                <p className="payment-modal-value">{currentPayment.title}</p>
              </div>

              <div className="payment-modal-field">
                <p className="payment-modal-label">Recipient</p>
                <p className="payment-modal-value">{currentPayment.recipient}</p>
              </div>

              <div className="payment-modal-field">
                <p className="payment-modal-label">Amount</p>
                <p className="payment-modal-value-large">${currentPayment.amount.toFixed(2)}</p>
              </div>

              <div className="payment-modal-field">
                <p className="payment-modal-label">Due Date</p>
                <p className="payment-modal-value">{formatDate(currentPayment.dueDate)}</p>
              </div>

              {currentPayment.invoiceNumber && (
                <div className="payment-modal-field">
                  <p className="payment-modal-label">Invoice Number</p>
                  <p className="payment-modal-value">{currentPayment.invoiceNumber}</p>
                </div>
              )}

              {currentPayment.description && (
                <div className="payment-modal-field">
                  <p className="payment-modal-label">Description</p>
                  <p className="payment-modal-value">{currentPayment.description}</p>
                </div>
              )}

              <div className="payment-modal-actions">
                <Button buttonName="Pay Now" />
                <Button buttonName=" Close"  Onclick={() => setShowDetails(false)}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
