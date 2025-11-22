
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import './card.css'
import type React from "react";
import type { ShowInfoCard } from "../../type.interface";
export  const ShowinfoCard:React.FC<ShowInfoCard> = ({rate, totalAmount, discription,rate_status})=>{
    return(
        <div className="shownInfo-card-container">
           <div className='showninfo-main-info'><span>{totalAmount}.Tsh</span></div>
             <div className='showinfo-description'><span>{discription ?? 'no data'} {Number(rate).toFixed(2) ?? 0} {rate_status === 'up' ?<FaArrowUp color="green"/>: rate_status === 'down' ?<FaArrowDown color="red"/>:<FaMinus color="blue"/> }</span></div>
               <div className='showninfo-roll'>
                <span className="iron-rod"></span>
               </div>
        </div>
    )
}