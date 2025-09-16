// import React from 'react'
import { ImUserTie } from "react-icons/im";
import { FaUserCheck } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import "./account.css";
interface OtherAcType{
    
} 
export default function OtherAc() {
  return (
    <div className='Ac-list-main-container'>
        <div className="image-container">
        <ImUserTie color="black" size={30}/>
        </div>
        <div className="info-detailer">
          <p className="username-info">Issa mwanga</p>
          <p className="email-info">issamwanga02@gmail.com</p>
        </div>
        <div className="button-view-more">
            <  TbHandClick  color="black" size={20} />
        </div>

      
    </div>
  )
}
