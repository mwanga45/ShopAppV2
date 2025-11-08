import { RiCloseFill, RiWallet3Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { Services } from "./icon";
import type {
  ServiceIcon,
  ServiceCategory,
  ServiceIconchoose,
} from "../../type.interface";
import styles from "./transaction.module.css";
import AnimatedCard from "../Admincord/animatedcard";
import {
  FaCoins,
  FaExchangeAlt,
  FaWallet,
  FaExclamationCircle,
} from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { FcCollect } from "react-icons/fc";
import { Button } from "../button/Button";
export const TransactionComp: React.FC = () => {
  const [showAddServe, setshowAddServe] = useState<boolean>(false);
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
              <div></div>
              <AnimatedCard icon={"symbol"} details={"ON USE"} money={600000} />
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
      </div>
    </div>
  );
};
export const TransactionForm = () => {
  return (
    <div className={styles.formContainer}>
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
import React, { useEffect, useState } from "react";
export const ServiceFormregister: React.FC<ServiceIconchoose> = ({ Icon }) => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }
    setSubmitted(true);
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
                  {service.icons.map((iconObj) => (
                    <div
                      key={iconObj.name}
                      className={styles.icon}
                      style={{ color: iconObj.color }}
                    >
                      {iconObj.icon}
                      <span className={styles.iconName}>{iconObj.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
