import './card.css'
import { FaArrowUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
export const Reportcard = ()=>{

    return(
        <div className="report-card-container">
            <div className='report-card-container-title'>
                <span className='title-report-card'>Total Stock Out</span>
            </div>
            <div className='report-show-amount'>
               <GiReceiveMoney size={20} color='gold'/> <span className='report-main-info'>250000 Tsh</span>
            </div>
            <div className='report-card-info-shown'>
                <FaArrowUp color='green' fontSize={14}/> <span style={{color:"green", fontSize:"14px", fontWeight:"bold"}}>28 %</span> <span style={{color:"green", fontSize:"14px", fontWeight:"bold"}}> still too small</span>
            </div>
        </div>
    )
}