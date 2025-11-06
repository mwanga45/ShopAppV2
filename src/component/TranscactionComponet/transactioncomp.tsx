import { RiCloseFill,  RiWallet3Line } from "react-icons/ri";
import styles from "./transaction.module.css";
import AnimatedCard from "../Admincord/animatedcard";
import { FaCoins, FaExchangeAlt, FaWallet, FaExclamationCircle  } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { FcCollect } from "react-icons/fc";
import type React from "react";
import { Button } from "../button/Button";
export const TransactionComp: React.FC = () => {
  return (
    <div className={styles.transctionmaincontainer}>
      <div className={styles.transcationtopbar}>
        <div className={styles.transactionIconContainer}>
          <FaExchangeAlt size={35} color="white" />
          <FaCoins size={35} color="white" />
        </div>
        <div className="icon-close">
          <RiCloseFill size={30} color="pink" />
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
            <div className={styles.transactionCalenderContainer}></div>
          </div>
        </div>
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
          <span>Pocket Service</span>
        </div>
          <div>
          <div className={styles.iconContainer}>
            <FcCollect color="black" size={40} />
          </div>
          <span>Other Service</span>
        </div>
      </div >
      <div style={{width:"100%", height:"2px", backgroundColor:"grey"}}></div>
      <div className={styles.formMainContainer}>
       <label htmlFor="" style={{color:"black", fontSize:"20px", fontWeight:"bold"}}>OnUse Amount</label>
      <div className={styles.inputfield}>
        <div>
          <FaWallet size={30} color="gold" />
        </div>
        <div className={styles.inputfield}>
          <input type="text" value={"200,000"} />
        </div>
      </div>
         <label htmlFor="" style={{color:"black", fontSize:"20px", fontWeight:"bold"}}>Amount for Service</label>
      <div className={styles.inputfield}>
        <input type="text" placeholder="Enter Amount" />
      </div>
      <span className={styles.precaution}><FaExclamationCircle color="black "/> Make sure the you have Enough On use money  to make request</span>
      <div className={styles.buttonCOntainer}>
      <Button buttonName="Confirm payment for your service."/>
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
