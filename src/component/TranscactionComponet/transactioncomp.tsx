import { RiCloseFill } from "react-icons/ri";
import styles from "./transaction.module.css";
import AnimatedCard from "../Admincord/animatedcard";
import { FcSalesPerformance } from "react-icons/fc";
import type React from "react";
export const TransactionComp: React.FC = () => {
  return (
    <div className={styles.transctionmaincontainer}>
      <div className={styles.transcationtopbar}>
        < FcSalesPerformance size={60} color="black"/>
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
