import { useState, type FormEvent } from "react";
import styles from "./capital-form.module.css";
import { CapitalAssign } from "../../AdminPanel/adminservice";

interface FormData {
  total_capital: string;
  cash_capital: string;
  Bank_capital: string;
  code: string;
  registerTime: string;
  bankdebt: string;
}
interface FormPayload {
  total_capital: number;
  cash_capital: number;
  Bank_capital: number;
  code: string;
  registerTime: string;
  bankdebt: number;
}

interface FormErrors {
  [key: string]: string;
}

export default function CapitalForm() {
  const [formData, setFormData] = useState<FormData>({
    total_capital: "",
    cash_capital: "",
    Bank_capital: "",
    code: "",
    registerTime: "firstTimes",
    bankdebt: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!/^\d{4}$/.test(formData.code)) {
      newErrors.code = "code must be exactly 4 digits";
    }
    if (!formData.total_capital) {
      newErrors.total_capital = "Total capital is required";
    } else if (
      isNaN(Number(formData.total_capital)) ||
      Number(formData.total_capital) < 0
    ) {
      newErrors.total_capital = "Total capital must be a valid positive number";
    }

    if (!formData.cash_capital) {
      newErrors.cash_capital = "Cash capital is required";
    } else if (
      isNaN(Number(formData.cash_capital)) ||
      Number(formData.cash_capital) < 0
    ) {
      newErrors.cash_capital = "Cash capital must be a valid positive number";
    }

    if (!formData.Bank_capital) {
      newErrors.Bank_capital = "Bank capital is required";
    } else if (
      isNaN(Number(formData.Bank_capital)) ||
      Number(formData.Bank_capital) < 0
    ) {
      newErrors.Bank_capital = "Bank capital must be a valid positive number";
    }

    const total = Number(formData.total_capital);
    const cash = Number(formData.cash_capital);
    const bank = Number(formData.Bank_capital);

    if (total !== cash + bank) {
      newErrors.total_capital = "Total capital must equal cash + bank capital";
    }

    if (!formData.code) {
      newErrors.code = "Code is required";
    } else if (formData.code.length < 3) {
      newErrors.code = "Code must be at least 3 characters";
    }

    if (!formData.registerTime) {
      newErrors.registerTime = "Registration time is required";
    }

    if (
      formData.bankdebt &&
      (isNaN(Number(formData.bankdebt)) || Number(formData.bankdebt) < 0)
    ) {
      newErrors.bankdebt = "bank debt must be a valid positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
       const finalPayload:FormPayload = {
        total_capital:Number(formData.total_capital),
        cash_capital:Number(formData.cash_capital),
        code:formData.code,
        registerTime:formData.registerTime,
        Bank_capital:Number(formData.Bank_capital),
        bankdebt:formData.bankdebt ? Number(formData.bankdebt) : 0
       }
       console.log(finalPayload)
      try {
        const response = await CapitalAssign(finalPayload);
       
        if (!response.data.success) {
           alert(response.data.message)
          return
        }
         setTimeout(() => {
            setFormData({
              total_capital: "",
              cash_capital: "",
              Bank_capital: "",
              code: "",
              registerTime: "firstTimes",
              bankdebt: "",
            });
            setSubmitted(false);
          }, 2000);
          setSubmitted(true)
          return
      } catch (err) {
        alert( err);
      }
    }
  };

  return (
    <div className={styles.capitalFormWrapper}>
      <div className={styles.capitalFormContainer}>
        <div className={styles.capitalFormHeader}>
          <div className={styles.headerIcon}>💰</div>
          <div className={styles.headerContent}>
            <h1 className={styles.formTitle}>Capital Management</h1>
            <p className={styles.formSubtitle}>
              Enter your capital allocation details
            </p>
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
                className={`${styles.formInput} ${
                  errors.total_capital ? styles.inputError : ""
                }`}
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
                className={`${styles.formInput} ${
                  errors.cash_capital ? styles.inputError : ""
                }`}
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
                className={`${styles.formInput} ${
                  errors.Bank_capital ? styles.inputError : ""
                }`}
              />
              {errors.Bank_capital && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.Bank_capital}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bd" className={styles.formLabel}>
                <span className={styles.labelIcon}>🪙</span>
                Withdraw
                <span className={styles.optionalText}>(optional)</span>
              </label>
              <input
                id="bd"
                type="number"
                name="bankdebt"
                value={formData.bankdebt}
                onChange={handleChange}
                placeholder="Enter withdrawal amount"
                step="0.01"
                className={`${styles.formInput} ${
                  errors.bankdebt ? styles.inputError : ""
                }`}
              />
              {errors.bankdebt && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.bankdebt}
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
                className={`${styles.formInput} ${
                  errors.code ? styles.inputError : ""
                }`}
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
                Registration Time-(Already filed )
                <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id=" registerTime"
                type="text"
                name="registerTime"
                value={formData.registerTime}
                readOnly
                onChange={handleChange}
                placeholder="Enter unique code"
                className={`${styles.formInput} ${
                  errors.code ? styles.inputError : ""
                }`}
              />
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
          <strong>Note:</strong> Total capital must equal the sum of cash and
          bank capital for validation.
        </div>
      </div>
    </div>
  );
}
