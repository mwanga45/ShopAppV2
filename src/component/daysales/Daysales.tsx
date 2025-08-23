import "./daysales.css"
import { SiMoneygram } from "react-icons/si";
export const Daysales = ()=>{
    return(
      <div className="sales-container">
        <p className="head">Today Sales</p>
        <p className="Amount"> <SiMoneygram color="black" size={20}/>2300000 Tsh</p>
      </div>
    )
        
    
}