import { RiCloseFill } from "react-icons/ri";
import "./transaction.modele.css";
export const TransactionComp = () => {
  return (
    <div className="transction-main-container">
    <div className="transcation-top-bar">
      <div className="icon-close">
        <RiCloseFill size={30} color="black" />
      </div>
      </div>
    </div>
  );
};
export const TransactionForm = () => {
  return <div></div>;
};
