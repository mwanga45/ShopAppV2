import { RiCloseFill } from "react-icons/ri";
import "./transaction.modele.css";
import AnimatedCard from "../Admincord/animatedcard";
export const TransactionComp = () => {
  return (
    <div className="transction-main-container">
      <div className="transcation-top-bar">
        <div className="icon-close">
          <RiCloseFill size={30} color="pink" />
        </div>
      </div>
      <div className="transaction-title">
          <span>Transaction Activity</span>
      </div>
      <div className="transcion-amount-container">
         <AnimatedCard icon={"symbol"} details={"ON USE"} money={600000}/>
      </div>
    </div>
  );
};
export const TransactionForm = () => {
  return <div></div>;
};
