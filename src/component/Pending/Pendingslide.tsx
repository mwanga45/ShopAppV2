import { useState, useEffect } from "react";
import { Button } from "../button/Button";
import styles from "./pending-payment-slider.module.css";

interface Payment {
  id: string;
  product_name: string;
  Revenue: number;
  CreatedAt: string;
  seller: string;
  Category?: string;
  total_quantity?: number;
}

interface PendingPaymentSliderProps {
  payments: Payment[];
}

export function PendingPaymentSlider({ payments }: PendingPaymentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [showDetails, setShowDetails] = useState(false);

  const nextPayment = () => {
    if (payments.length === 0) return;
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % payments.length);
  };

  const prevPayment = () => {
    if (payments.length === 0) return;
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + payments.length) % payments.length);
  };

  useEffect(() => {
    if (payments.length === 0) return;
    const timer = setInterval(nextPayment, 5000);
    return () => clearInterval(timer);
  }, [payments.length]);

  useEffect(() => {
    if (payments.length > 0 && currentIndex >= payments.length) {
      setCurrentIndex(0);
    }
  }, [payments.length, currentIndex]);

  const currentPayment = payments.length > 0 ? payments[currentIndex] : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (payments.length === 0 || !currentPayment) {
    return (
      <div className={styles.paymentSliderWrapper}>
        <div className={styles.paymentCard}>
          <div className={styles.paymentCardHeader}>
            <div className={styles.paymentCardHeaderContent}>
              <h2 className={styles.paymentCardTitle}>Pending Payments</h2>
              <div className={styles.paymentCounter}>
                <span>0</span>
                <span>/</span>
                <span>0</span>
              </div>
            </div>
          </div>
          <div className={styles.paymentSlideContainer}>
            <div className={styles.paymentEmptyState}>
              <svg
                className={styles.paymentEmptyIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
              <p className={styles.paymentEmptyText}>
                No pending payments at this time
              </p>
              <p className={styles.paymentEmptySubtext}>
                All payments are up to date
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paymentSliderWrapper}>
      <div className={styles.paymentCard}>
        <div className={styles.paymentCardHeader}>
          <div className={styles.paymentCardHeaderContent}>
            <h2 className={styles.paymentCardTitle}>Pending Payments</h2>
            <div className={styles.paymentCounter}>
              <span>{currentIndex + 1}</span>
              <span>/</span>
              <span>{payments.length}</span>
            </div>
          </div>
        </div>

        <div className={styles.paymentSlideContainer}>
          <div
            className={`${styles.paymentSlide} ${styles[`paymentSlide-${direction}`]}`}
            key={currentPayment.id}
          >
            <div className={styles.paymentSlideContent}>
              <div className={styles.paymentInfoSection}>
                <div className={styles.paymentHeaderRow}>
                  <div>
                    <h3 className={styles.paymentItemTitle}>{currentPayment.product_name}</h3>
                    <p className={styles.paymentRecipient}>{currentPayment.seller}</p>
                  </div>
                  {currentPayment.Category && (
                    <div className={styles.paymentBadge}>
                      {currentPayment.Category}
                    </div>
                  )}
                </div>

                <div className={styles.paymentDetailsRow}>
                  <div className={styles.paymentDetailItem}>
                    <svg
                      className={styles.paymentIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className={styles.paymentDetailLabel}>Revenue</p>
                      <p className={styles.paymentDetailValue}>
                        {currentPayment.Revenue} Tsh
                      </p>
                    </div>
                  </div>

                  {currentPayment.total_quantity && (
                    <div className={styles.paymentDetailItem}>
                      <svg
                        className={styles.paymentIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <div>
                        <p className={styles.paymentDetailLabel}>Quantity</p>
                        <p className={styles.paymentDetailValue}>
                          {currentPayment.total_quantity}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={styles.paymentDetailItem}>
                    <svg
                      className={styles.paymentIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className={styles.paymentDetailLabel}>Date</p>
                      <p className={styles.paymentDetailValue}>
                        {formatDate(currentPayment.CreatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.paymentActions}>
                <Button buttonName="Pay Now" />
                <Button
                  buttonName="View Details"
                  Onclick={() => setShowDetails(true)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.paymentFooter}>
          <Button buttonName="Previous" Onclick={prevPayment} />

          <div className={styles.paymentDots}>
            {payments.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left");
                  setCurrentIndex(index);
                }}
                className={`${styles.paymentDot} ${
                  index === currentIndex ? styles.paymentDotActive : ""
                }`}
                aria-label={`Go to payment ${index + 1}`}
              />
            ))}
          </div>

          <Button buttonName="Next" Onclick={nextPayment} />
        </div>
      </div>

      {showDetails && (
        <div
          className={styles.paymentModalOverlay}
          onClick={() => setShowDetails(false)}
        >
          <div
            className={styles.paymentModalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.paymentModalHeader}>
              <h3 className={styles.paymentModalTitle}>Payment Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className={styles.paymentModalClose}
              >
                <svg
                  className={styles.paymentIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.paymentModalBody}>
              <div className={styles.paymentModalField}>
                <p className={styles.paymentModalLabel}>Product Name</p>
                <p className={styles.paymentModalValue}>{currentPayment.product_name}</p>
              </div>

              <div className={styles.paymentModalField}>
                <p className={styles.paymentModalLabel}>Seller</p>
                <p className={styles.paymentModalValue}>{currentPayment.seller}</p>
              </div>

              <div className={styles.paymentModalField}>
                <p className={styles.paymentModalLabel}>Revenue</p>
                <p className={styles.paymentModalValueLarge}>
                  {currentPayment.Revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Tsh
                </p>
              </div>

              {currentPayment.Category && (
                <div className={styles.paymentModalField}>
                  <p className={styles.paymentModalLabel}>Category</p>
                  <p className={styles.paymentModalValue}>{currentPayment.Category}</p>
                </div>
              )}

              {currentPayment.total_quantity && (
                <div className={styles.paymentModalField}>
                  <p className={styles.paymentModalLabel}>Quantity</p>
                  <p className={styles.paymentModalValue}>{currentPayment.total_quantity}</p>
                </div>
              )}

              <div className={styles.paymentModalField}>
                <p className={styles.paymentModalLabel}>Date</p>
                <p className={styles.paymentModalValue}>
                  {formatDate(currentPayment.CreatedAt)}
                </p>
              </div>

              <div className={styles.paymentModalActions}>
                <Button buttonName="Pay Now" />
                <Button
                  buttonName="Close"
                  Onclick={() => setShowDetails(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
