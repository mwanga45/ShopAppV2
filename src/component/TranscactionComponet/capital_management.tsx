import { useState, type FormEvent } from 'react';
import styles from './capital-form.module.css';

interface FormData {
  total_capital: string;
  cash_capital: string;
  Bank_capital: string;
  code: string;
  registerTime: string;
  withdraw: string;
}

interface FormErrors {
  [key: string]: string;
}

const REGISTER_TIMES = [
  { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
  { value: 'evening', label: 'Evening (6 PM - 12 AM)' },
  { value: 'night', label: 'Night (12 AM - 6 AM)' },
];

export default function CapitalForm() {
  const [formData, setFormData] = useState<FormData>({
    total_capital: '',
    cash_capital: '',
    Bank_capital: '',
    code: '',
    registerTime: '',
    withdraw: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.total_capital) {
      newErrors.total_capital = 'Total capital is required';
    } else if (isNaN(Number(formData.total_capital)) || Number(formData.total_capital) < 0) {
      newErrors.total_capital = 'Total capital must be a valid positive number';
    }

    if (!formData.cash_capital) {
      newErrors.cash_capital = 'Cash capital is required';
    } else if (isNaN(Number(formData.cash_capital)) || Number(formData.cash_capital) < 0) {
      newErrors.cash_capital = 'Cash capital must be a valid positive number';
    }

    if (!formData.Bank_capital) {
      newErrors.Bank_capital = 'Bank capital is required';
    } else if (isNaN(Number(formData.Bank_capital)) || Number(formData.Bank_capital) < 0) {
      newErrors.Bank_capital = 'Bank capital must be a valid positive number';
    }

    const total = Number(formData.total_capital);
    const cash = Number(formData.cash_capital);
    const bank = Number(formData.Bank_capital);
    
    if (total !== cash + bank) {
      newErrors.total_capital = 'Total capital must equal cash + bank capital';
    }

    if (!formData.code) {
      newErrors.code = 'Code is required';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Code must be at least 3 characters';
    }

    if (!formData.registerTime) {
      newErrors.registerTime = 'Registration time is required';
    }

    if (formData.withdraw && (isNaN(Number(formData.withdraw)) || Number(formData.withdraw) < 0)) {
      newErrors.withdraw = 'Withdraw must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
      
      setTimeout(() => {
        setFormData({
          total_capital: '',
          cash_capital: '',
          Bank_capital: '',
          code: '',
          registerTime: '',
          withdraw: '',
        });
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.capitalFormWrapper}>
      <div className={styles.capitalFormContainer}>
        <div className={styles.capitalFormHeader}>
          <div className={styles.headerIcon}>💰</div>
          <div className={styles.headerContent}>
            <h1 className={styles.formTitle}>Capital Management</h1>
            <p className={styles.formSubtitle}>Enter your capital allocation details</p>
          </div>
        </div>

        {submitted && (
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>✓</span>
            <div className={styles.successContent}>
              <h3>Success!</h3>
              <p>Your capital allocation has been submitted.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.capitalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="total_capital" className={styles.formLabel}>
                <span className={styles.labelIcon}>💰</span>
                Total Capital
                <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="total_capital"
                type="number"
                name="total_capital"
                value={formData.total_capital}
                onChange={handleChange}
                placeholder="Enter total capital"
                step="0.01"
                className={`${styles.formInput} ${errors.total_capital ? styles.inputError : ''}`}
              />
              {errors.total_capital && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.total_capital}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cash_capital" className={styles.formLabel}>
                <span className={styles.labelIcon}>💵</span>
                Cash Capital
                <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="cash_capital"
                type="number"
                name="cash_capital"
                value={formData.cash_capital}
                onChange={handleChange}
                placeholder="Enter cash amount"
                step="0.01"
                className={`${styles.formInput} ${errors.cash_capital ? styles.inputError : ''}`}
              />
              {errors.cash_capital && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.cash_capital}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="Bank_capital" className={styles.formLabel}>
                <span className={styles.labelIcon}>🏦</span>
                Bank Capital
                <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="Bank_capital"
                type="number"
                name="Bank_capital"
                value={formData.Bank_capital}
                onChange={handleChange}
                placeholder="Enter bank amount"
                step="0.01"
                className={`${styles.formInput} ${errors.Bank_capital ? styles.inputError : ''}`}
              />
              {errors.Bank_capital && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.Bank_capital}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="withdraw" className={styles.formLabel}>
                <span className={styles.labelIcon}>🪙</span>
                Withdraw
                <span className={styles.optionalText}>(optional)</span>
              </label>
              <input
                id="withdraw"
                type="number"
                name="withdraw"
                value={formData.withdraw}
                onChange={handleChange}
                placeholder="Enter withdrawal amount"
                step="0.01"
                className={`${styles.formInput} ${errors.withdraw ? styles.inputError : ''}`}
              />
              {errors.withdraw && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.withdraw}
                </div>
              )}
            </div>
          </div>

          <div className={styles.formDivider}></div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="code" className={styles.formLabel}>
                Code
                <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter unique code"
                className={`${styles.formInput} ${errors.code ? styles.inputError : ''}`}
              />
              {errors.code && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.code}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="registerTime" className={styles.formLabel}>
                Registration Time
                <span className={styles.requiredStar}>*</span>
              </label>
              <select
                id="registerTime"
                name="registerTime"
                value={formData.registerTime}
                onChange={handleChange}
                className={`${styles.formSelect} ${errors.registerTime ? styles.inputError : ''}`}
              >
                <option value="">Select a time...</option>
                {REGISTER_TIMES.map(time => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
              {errors.registerTime && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.registerTime}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Capital Allocation
          </button>
        </form>

        <div className={styles.infoBox}>
          <strong>Note:</strong> Total capital must equal the sum of cash and bank capital for validation.
        </div>
      </div>
    </div>
  );
}
