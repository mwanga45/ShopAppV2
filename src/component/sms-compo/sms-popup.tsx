import { useState, useEffect } from "react";
import "./sms-popup.css";
import { IoClose } from "react-icons/io5";

interface SmsPopupProps {
  isOpen: () => void;
  onClose: () => void;
  Debtor_name?: string;
  Phone_number:string

}

export const SmsPopup: React.FC<SmsPopupProps> = ({
  isOpen,
  onClose,
  Debtor_name,
  Phone_number
}) => {

  const [charCount, setCharCount] = useState(0);
  const maxChars = 160;

  const [smspayload, setsmspayload] = useState({
    sms: "",
    Phone_number: Phone_number,
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setsmspayload((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setCharCount(smspayload.sms.length);
  }, [smspayload.sms]);

  const handleSend = () => {
    if (smspayload.sms.trim() && Phone_number.trim()) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="sms-overlay" onClick={onClose} />
      <div className="sms-popup">
        <div className="sms-header">
          <div className="sms-header-content">
            <div className="sms-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="sms-title">Send SMS to {Debtor_name}</h2>
          </div>
          <button className="sms-close" onClick={onClose} aria-label="Close">
            <IoClose color="red" />
          </button>
        </div>

        <div className="sms-body">
          <div className="sms-field">
            <label htmlFor="phone" className="sms-label">
              Phone Number
            </label>
            <input
              id="Phone_number"
              type="tel"
              name="Phone_number"
              className="sms-input"
              placeholder="255....."
              value={smspayload.Phone_number}
              onChange={handleOnchange}
            />
          </div>

          <div className="sms-field">
            <label htmlFor="message" className="sms-label">
              Message
            </label>
            <textarea
              id="message"
              name="sms"
              className="sms-textarea"
              placeholder="Type your message here..."
              value={smspayload.sms}
              onChange={handleOnchange}
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
            disabled={!smspayload.sms.trim() || !smspayload.Phone_number.trim()}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send Message
          </button>
        </div>
      </div>
    </>
  );
};
