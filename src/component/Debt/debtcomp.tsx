import "./debtcomp.css";
import './CardDiscript.css'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export const Debtcompo = () => {
  return (
    <div>
      <div className="Dbt-compo-list-title-container">
        <span className="Dbt-compo-list-title1">Daily Debtor Summary List</span>
        <span className="Dbt-compo-list-title2">
          Tracks today’s pending debts and unpaid balances from active sales.
        </span>
      </div>
      <div className="Dbt-compo-list-selection">
        <span>All Debts</span>
        <span>Paid</span>
        <span>Partalpaid</span>
      </div>
      <div className="Dbt-compo-list-container">
        <CardDiscription/>
      </div>
    </div>
  );
};
export const CardDiscription = ()=>{
     return(
        <div className="crd-dsc-cont">
            <div className="crd-dsc-icon-cont" >
               <AiOutlineLoading3Quarters size={25} color="green" fontSize={28} fontWeight={700}/>
            </div>
            <div className="crd-dsc-desc-info">
                <span className="crd-dcs-name">John Doe</span>
                <span className="crd-dcs-amount">Remaining 240000Tsh</span>
            </div>
            <div className="crd-dcs-date-container">
                <span>24-07-2026</span>
            </div>
        </div>
     )
}
