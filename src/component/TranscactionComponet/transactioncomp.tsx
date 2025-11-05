import { RiCloseFill } from "react-icons/ri";
import styles from "./transaction.module.css";
import AnimatedCard from "../Admincord/animatedcard";
import { FaCoins, FaExchangeAlt } from "react-icons/fa";
import type React from "react";
export const TransactionComp: React.FC = () => {
  return (
    <div className={styles.transctionmaincontainer}>
      <div className={styles.transcationtopbar}>
        <div className={styles.transactionIconContainer}>
        <FaExchangeAlt size={40} color="white"/>
        < FaCoins size={40} color="white"/>
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
          <AnimatedCard icon={"symbol"} details={"ON USE"} money={600000} />
        </div>
      </div>
    </div>
  );
};
export const TransactionForm = () => {
  return <div></div>;
};
