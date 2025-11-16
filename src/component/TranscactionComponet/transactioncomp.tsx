import React, { useEffect, useState } from "react";
import { RiCloseFill, RiWallet3Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { Services } from "./icon";
import type { ServiceCategory, ServiceIconchoose } from "../../type.interface";
import styles from "./transaction.module.css";
import AnimatedCard from "../Admincord/animatedcard";
import { FaBalanceScale } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import {
  FaCoins,
  FaExchangeAlt,
  FaWallet,
  FaExclamationCircle,
  FaHashtag,
  FaRegCalendarAlt,
  FaRegStickyNote,
  FaTags,
} from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { FcCollect } from "react-icons/fc";
import { Button } from "../button/Button";
export const TransactionComp: React.FC = () => {
  const [showAddServe, setshowAddServe] = useState<boolean>(false);
  const [showCapital, setshowCapital] = useState<boolean>(false)
  const [iconlist, seticonlist] = useState<ServiceCategory[]>([]);
  useEffect(() => {
    const handleIconlist = () => {
      seticonlist(Services);
    };
    handleIconlist();
  }, []);
  return (
    <div className={styles.transctionmaincontainer}>
      <div className={styles.transcationtopbar}>
        <div className={styles.transactionIconContainer}>
          <FaExchangeAlt size={35} color="white" />
          <FaCoins size={35} color="white" />
        </div>
        <div className="icon-close">
          <RiCloseFill size={30} color="black" />
        </div>
      </div>
      <div className={styles.transactiontitle}>
        <span>Transaction Activity</span>
      </div>
      <div className={styles.TranscationBody}>
        <div className={styles.transcionamountcontainer}>
          <div className={styles.transactionRecord}>
            <div className={styles.transactionsalaryContainer}>
              <div style={{ display: "flex", alignItems: "center", cursor:"pointer"}} onClick={()=> setshowCapital(true)}>
                <AnimatedCard
                  icon={"symbol"}
                  details={"Business Capital"}
                  money={700000}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <AnimatedCard
                  icon={"symbol"}
                  details={"ON USE"}
                  money={600000}
                />
              </div>
            </div>
            <div className={styles.transactionHistory}>
              <span>Transaction History</span>
            </div>
            <span className={styles.transactionHistoryHead}>
              Today Record(5)
            </span>
            <div className={styles.transactionInfoHistory}>
              <div className={styles.TransactionBarContainer}>
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
              </div>
            </div>
            <span className={styles.transactionHistoryHead}>
              Summary of week(5)
            </span>
            <div className={styles.transactionInfoHistory}>
              <div className={styles.TransactionBarContainer}>
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
                <TransactionBar />
              </div>
            </div>
          </div>
          <div className={styles.transactionAssign}>
            <div className={styles.transactionFormcontainer}>
              <TransactionForm />
            </div>
            <div>
              <div className={styles.serviceContainer}>
                <span
                  style={{
                    color: "grey",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Create servece & View service
                </span>
                <div className={styles.viewAddservece}>
                  <div className={styles.serviceNumber}>
                    <span
                      style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: "30px",
                      }}
                    >
                      Total Service
                    </span>
                    <span
                      style={{
                        color: "#18a200ff",
                        fontWeight: "600",
                        fontSize: "30px",
                        scale: "4.4",
                      }}
                    >
                      5
                    </span>
                  </div>
                  <div className={styles.serviceAction}>
                    <div
                      className={styles.serveceprocess}
                      onClick={() => setshowAddServe(true)}
                    >
                      <MdAdd color="white" size={35} fontWeight={900} />
                      <span>Add</span>
                    </div>
                    <div className={styles.serveceprocess}>
                      <FaEye color="white" size={35} />
                      <span>View</span>
                    </div>
                    <div className={styles.serveceprocess}>
                      <RiDeleteBinLine color="white" size={35} />
                      <span>Remove</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAddServe && (
          <div className={styles.popupCompocontainer}>
            <ServiceFormregister Icon={iconlist} />
          </div>
        )}
        {
          showCapital && (
               <div className={styles.popupCompocontainer}>
                <BusinessCapital/>
               </div>
          )
        }
      </div>
    </div>
  );
};
export const TransactionForm = () => {
  return (
    <div className={styles.formContainer} style={{width:'100%'}}>
      <div className={styles.formContainerHead}>
        <span>Quick Action</span>
      </div>
      <div className={styles.transactionFormserviceContainer}>
        <div>
          <div className={styles.iconContainer}>
            <GiChickenOven color="gold" size={40} />
          </div>
          <span>Food Service</span>
        </div>
        <div>
          <div className={styles.iconContainer}>
            <FaBoltLightning color="white" size={40} />
          </div>
          <span>Electricity Service</span>
        </div>
        <div>
          <div className={styles.iconContainer}>
            <RiWallet3Line color="blue" size={40} />
          </div>
          <span>Withdraw Service</span>
        </div>
        <div>
          <div className={styles.iconContainer}>
            <FcCollect color="black" size={40} />
          </div>
          <span>Other Service</span>
        </div>
      </div>
      <div
        style={{ width: "100%", height: "2px", backgroundColor: "grey" }}
      ></div>
      <div className={styles.formMainContainer}>
        <label
          htmlFor=""
          style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
        >
          OnUse Amount
        </label>
        <div className={styles.inputfieldContainer}>
          <div className={styles.inputfield}>
            <div>
              <FaWallet size={30} color="gold" />
            </div>
            <div className={styles.inputfield}>
              <input type="text" value={"200,000"} />
            </div>
          </div>
        </div>
        <label
          htmlFor=""
          style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
        >
          Amount for Service
        </label>
        <div className={styles.inputfieldContainer}>
          <div className={styles.inputfield}>
            <input type="text" placeholder="Enter Amount" />
          </div>
        </div>
        <span className={styles.precaution}>
          <FaExclamationCircle color="black " /> Make sure the you have Enough
          On use money to make request
        </span>
        <div className={styles.buttonCOntainer}>
          <Button buttonName="Confirm payment for your service." />
        </div>
      </div>
    </div>
  );
};
export const TransactionBar = () => {
  return (
    <div className={styles.barRecord}>
      <div>
        <FaBoltLightning size={20} />
      </div>
      <div>
        <span>Electricity</span>
      </div>
      <div>
        <span>Amount 5,000.Tsh</span>
        <span> Date 5 Nov 2025</span>
      </div>
      <div>
        <span>Successfuly</span>
      </div>
    </div>
  );
};
export const BusinessCapital: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: "",
    serviceAmount: "",
    paymentMethod: "cash",
    reference: "",
    code: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [notes, setNotes] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Capital recorded successfully");
  };

  const handleReset = () => {
    setFormData({
      amount: "",
      serviceAmount: "",
      paymentMethod: "cash",
      reference: "",
      code: "",
      date: new Date().toISOString().split("T")[0],
    });
    setNotes("");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.BusinessCapital_close}>
        <button type="button" className={styles.iconButton}>
          <IoMdClose size={22} />
        </button>
      </div>
      <div className={styles.formContainerHead}>
        <span>Capital Registered </span>
        <p className={styles.formSubHeading}>
          Log every capital injection, link it to a service, and leave a note
          for finance to review.
        </p>
      </div>

      <div className={styles.capitalSummaryRow}>
        <div className={styles.capitalSummaryCard}>
          <span>Total Capital</span>
          <strong>TZS 15,450,000</strong>
          <small className={styles.capitalSummaryBadge}>+ 4.5% this month</small>
        </div>
        <div className={styles.capitalSummaryCard}>
          <span>Allocated to services</span>
          <strong>TZS 8,320,000</strong>
          <small className={styles.capitalSummaryMuted}>
            Remaining balance TZS 7,130,000
          </small>
        </div>
      </div>

      <form
        className={styles.BusinessCapitalformCOntainer}
        onSubmit={handleSubmit}
      >
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Capital Amount</label>
          <div className={styles.inputfield}>
            <div>
              <FaWallet size={26} color="#d1b000" />
            </div>
            <input
              type="text"
              name="amount"
              placeholder="TZS 0.00"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Amount for Service</label>
          <div className={styles.inputfield}>
            <div>
              <FaBalanceScale size={26} color="#2f80ed" />
            </div>
            <input
              type="text"
              name="serviceAmount"
              placeholder="Service allocation"
              value={formData.serviceAmount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.fieldGridTwo}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Payment Method</label>
            <div className={styles.inputfield}>
              <div>
                <FaCoins size={24} color="#27ae60" />
              </div>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className={styles.capitalSelect}
              >
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="mobile">Mobile Money</option>
              </select>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Date</label>
            <div className={styles.inputfield}>
              <div>
                <FaRegCalendarAlt size={24} color="#ff7a00" />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.fieldGridTwo}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Reference / Vendor</label>
            <div className={styles.inputfield}>
              <div>
                <FaTags size={24} color="#6c63ff" />
              </div>
              <input
                type="text"
                name="reference"
                placeholder="Vendor or project name"
                value={formData.reference}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Tracking Code</label>
            <div className={styles.inputfield}>
              <div>
                <FaHashtag size={24} color="#00b894" />
              </div>
              <input
                type="text"
                name="code"
                placeholder="CAP-2025-001"
                value={formData.code}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <label className={styles.fieldLabel}>Notes</label>
        <div className={styles.textareaWrapper}>
          <FaRegStickyNote size={20} color="#999" />
          <textarea
            name="notes"
            placeholder="Add internal remarks, approval details or attachment reference..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={styles.capitalNotes}
          />
        </div>

        <div className={styles.capitalActions}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.capitalGhostButton}
          >
            Clear
          </button>
          <button type="submit" className={styles.capitalPrimaryButton}>
            Record Capital
          </button>
        </div>
      </form>
      </div>
  );
};
export const ServiceFormregister: React.FC<ServiceIconchoose> = ({ Icon }) => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }
    setSubmitted(true);
  };

  const handleIconClick = (iconKey: string) => {
    setActiveIcon(activeIcon === iconKey ? null : iconKey);
  };
  return (
    <div className={styles.container}>
      {!submitted ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <span className={styles.title}>Enter Service Name</span>
          <div className={styles.inputcontainer}>
            <input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Proceed
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.servicesSection}>
          <h2 className={styles.welcomeText}>
            Welcome, {name}! Choose a Service:
          </h2>
          <div className={styles.servicesList}>
            {Icon.map((service) => (
              <div key={service.category} className={styles.serviceCard}>
                <h3 className={styles.serviceTitle}>{service.category}</h3>
                <div className={styles.iconGroup}>
                  {service.icons.map(({ name, icon, color }) => {
                    const iconKey = `${service.category}-${name}`;
                    const isActive = activeIcon === iconKey;
                    return (
                      <div
                        key={iconKey}
                        className={`${styles.icon} ${isActive ? styles.iconActive : ""}`}
                        onClick={() => handleIconClick(iconKey)}
                      >
                        <span className={color}>{icon}</span>
                        <span>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
