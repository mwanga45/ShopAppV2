
import { FaArrowUp } from "react-icons/fa6";
import './card.css'
export  const ShowinfoCard = ()=>{
    return(
        <div className="shownInfo-card-container">
           <div className='showninfo-main-info'><span>42</span></div>
             <div className='showinfo-description'><span>New Order <FaArrowUp/> </span></div>
               <div className='showninfo-roll'>
                <span className="iron-rod"></span>
               </div>
        </div>
    )
}