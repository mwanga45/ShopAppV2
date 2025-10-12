import { FaUpDown } from 'react-icons/fa6'
import './card.css'
export  const ShowinfoCard = ()=>{
    return(
        <div className="shownInfo-card-container">
           <div className='showninfo-main-info'><span></span></div>
             <div className='showinfo-description'><span>New Order <FaUpDown/> </span></div>
               <div className='showninfo-roll'></div>
        </div>
    )
}