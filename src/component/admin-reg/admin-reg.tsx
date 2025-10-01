import "./admin-reg.css"
import { OtherAc } from "../account/otherAc"
import { SummaryCard } from "../summaryCard/summarycard"
import { FaUserShield } from "react-icons/fa"
import { MdPerson } from "react-icons/md"
import { FormRegUser } from "./form-reg-user"
import { Account_details } from "../../AdminPanel/adminservice"
import { useEffect, useState } from "react"
export interface AccResponse {
  CreatedAt?: string;       
  fullname?: string;
  email?: string;
  phone_number?: string;
  nida?: string;
  role?: 'admin' | 'user' | string;  
  isActive?: boolean;
}
export interface RoleCountResponse {
  role: string;           
  total: number;          
  activeCount: number;    
}

export const AdminReg = () => {
    const [loading, setloading] = useState<boolean>(true)
    const [Acc_info, setAcc_info] = useState<AccResponse[]>([])
    const [rolecount , setrolecount] = useState<RoleCountResponse []>([])

    useEffect(()=>{
        const handleAcc_info = async()=>{
            try{
            const  response = await Account_details()
             if(!response.data.success){
                alert(response.data.message)
                return
             }
             setAcc_info(response.data.data.return_user)
             setrolecount(response.data.data.roleAndisActive)
             
            }catch(err){
                console.error(err)
                throw (err)
            }finally{
              setloading(false)
            }
        }
        handleAcc_info()

    }, [])
    return (
        <div className="admin-reg-container">
            <div className="title-bar-reg">
                <p className="reg-title">Admin Action</p>
            </div>
            <div className="info-form-container">
                <div className="info-bar">
                  <SummaryCard icon={FaUserShield} SummaryTitle="Admin-Account"/>
                  <SummaryCard icon={ MdPerson } SummaryTitle="User-Account-Active"/>
                  <SummaryCard icon={ MdPerson } SummaryTitle="User-Account-InActive"/>
                </div>
                <div className="list-reg-verification">
                    <div className="list-reg-container">
                        {
                         Acc_info.map((A)=>(
                            <OtherAc email= {A.email} isActive = {A.isActive} role={A.role}/>
                         ))
                        }
                    </div>
                    <div className="user-reg-form">
                        <FormRegUser/>
                    </div>
                </div>
            </div>

        </div>
    )
}
