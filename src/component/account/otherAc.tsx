import React from 'react'
import { ImUserTie } from "react-icons/im";
import { FaUserCheck } from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";
import { TbHandClick } from "react-icons/tb";
import "./account.css";
interface OtherAcType{
    fullname?:string
    email?:string
    role?:string
    isActive?:boolean
    id?:number
} 
export const  OtherAc:React.FC<OtherAcType> =({isActive,fullname,email,role})=> {
  return (
    <div className='Ac-list-main-container' >
        <div className="image-container">
            {role==="admin"?(
            isActive === true ?(
                    <ImUserTie color="#3498db" size={30} />
                ):(
                    <ImUserTie color="#e74c3c" size={30} />
                )
            ):role === "user"?(
                isActive === true ?(
                    <FaUserCheck color="#2ecc71" size={30}/>

                ):(
                   <FaUserCheck color="#e74c3c" size={30}/>
                )
            ):(
            <GrStatusUnknown color="#f1c40f" size={30}/>
            )
            }
        </div>
        <div className="info-detailer">
          <p className="username-info">{fullname}</p>
          <p className="email-info">{email}</p>
        </div>
        <div className="button-view-more">
            <  TbHandClick  color="#3498db" size={20} />
        </div>

      
    </div>
  )
}
