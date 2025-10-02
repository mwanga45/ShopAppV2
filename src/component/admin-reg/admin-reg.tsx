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
  id?:string
}
export interface RoleCountResponse {
  role?: string;           
  total?: number;          
  activeCount?: number; 
  inActiveCount?:number  
  user?:{
    total:number,
    activeCount:number
  } 
}
 export const fetch_Acc = async()=>{
          try{
            const  response = await Account_details()
             if(!response.data.success){
                alert(response.data.message)
                return
             }
             return{
                user:response.data.data.return_user,
                rolecount:response.data.data.ROleObj
             }
             
            }catch(err){
                console.error(err)
                throw (err)
            }
        
    }
export const AdminReg = () => {
    const [_, setloading] = useState<boolean>(true)
    const [Acc_info, setAcc_info] = useState<AccResponse[]>([])
    const [rolecount , setrolecount] = useState<RoleCountResponse >()
   
    useEffect(()=>{
         const handleAcc_info = async()=>{
            try{
             const data = await fetch_Acc()
             
             setAcc_info(data?.user)

             setrolecount(data?.rolecount)
             
            }catch(err){
                console.error(err)
                throw (err)
            }finally{
              setloading(false)
            }
        }
        handleAcc_info()

    }, [])
    console.log(rolecount)
    return (
        <div className="admin-reg-container">
            <div className="title-bar-reg">
                <p className="reg-title">Admin Action</p>
            </div>
            <div className="info-form-container">
                <div className="info-bar">
                  <SummaryCard icon={FaUserShield} SummaryTitle="Admin-Account" SummaryActInfo={rolecount?.total} style={{background:"#073093", color:"white"}}/>
                  <SummaryCard icon={ MdPerson } SummaryTitle="User-Account-Active"SummaryActInfo={rolecount?.user?.total} style={{background:"#0a6803ff", color:"white"}}/>
                  <SummaryCard icon={ MdPerson } SummaryTitle="User-Account-InActive" SummaryActInfo={rolecount?.inActiveCount} style={{background:"#ba0606ff", color:"white", fontWeight:"800"}}/>
                </div>

                <div className="list-reg-verification">
                    <div className="list-reg-container">
                        {
                         Acc_info.map((A)=>(
                          A.id? <OtherAc key={A.id} email= {A.email} isActive = {A.isActive} role={A.role}/>:null
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
