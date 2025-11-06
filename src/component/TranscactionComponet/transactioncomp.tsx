import { RiCloseFill } from "react-icons/ri";
import styles from "./transaction.module.css";
import AnimatedCard from "../Admincord/animatedcard";
import { FaCoins, FaExchangeAlt } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import type React from "react";
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
            <div className={styles.transactionInfoHistory}>
              <span>Today</span>
            <div>
            <TransactionBar/>
             <TransactionBar/>
            </div>
            </div>
          </div>
          <div className={styles.transactionAssign}></div>
        </div>
      </div>
    </div>
  );
};
export const TransactionForm = () => {
  return <div></div>;
};
export const TransactionBar = () => {
  return (
    <div className={styles.barRecord}>
      <div>
        <FaBoltLightning size={20}/>
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
