
import { FaArrowUp } from "react-icons/fa6";
import './card.css'
import type React from "react";
import type { ShowInfoCard } from "../../type.interface";
export  const ShowinfoCard:React.FC<ShowInfoCard> = ({rate, totalAmount, discription})=>{
    return(
        <div className="shownInfo-card-container">
           <div className='showninfo-main-info'><span>{totalAmount}</span></div>
             <div className='showinfo-description'><span>{discription}<FaArrowUp color="green"/> {rate} </span></div>
               <div className='showninfo-roll'>
                <span className="iron-rod"></span>
               </div>
        </div>
    )
}