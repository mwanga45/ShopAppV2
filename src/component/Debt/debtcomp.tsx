import "./debtcomp.css";
import './CardDiscript.css'
import type { CardDiscriptionInterface, DebtResponse } from "../../type.interface";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export const Debtcompo:React.FC<DebtResponse> = ({findUserDebtInfo, findtrack,PersonDebt}) => {
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
        {
         PersonDebt && PersonDebt.length > 0 ?(

        <CardDiscription/>
         ):(
          <span>No debt available</span>
         )
         
        }

      </div>
    </div>
  );
};
export const CardDiscription:React.FC<CardDiscriptionInterface> = ({name, date, amount, title})=>{
     return(
        <div className="crd-dsc-cont">
            <div className="crd-dsc-icon-cont" >
               <AiOutlineLoading3Quarters size={25} color="green" fontSize={28} fontWeight={700}/>
            </div>
            <div className="crd-dsc-desc-info">
                <span className="crd-dcs-name">{name}</span>
                <span className="crd-dcs-amount"><span>{title}</span> {amount}Tsh</span>
            </div>
            <div className="crd-dcs-date-container">
                <span>{date}</span>
            </div>
        </div>
     )
}
