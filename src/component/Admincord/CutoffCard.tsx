import type React from "react";
import "./AnimatedCard.css"
import { MdLocalOffer } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { specDisc } from "../../AdminPanel/adminservice";
import { useEffect, useState } from "react";
export interface DiscountInfo {
  UpdateAt?: string;
  percentage?: string;
  CashDiscount?: number;
  start_from?: number;
  product_name?: string; 
  id:string
}


export const  CutoffCard:React.FC<DiscountInfo> =({id, product_name})=> {
  const [DiscRec, setDiscRec] = useState<DiscountInfo>()
  
const handleDiscount = async()=>{
const response = await specDisc(id)
if(!response.data.success){
  setDiscRec({
    product_name:product_name,
    start_from:0,
    percentage:"0",
    CashDiscount:0,
    id:id
  })
  return
}
setDiscRec(response.data.data)
console.log(DiscRec)
}
useEffect(()=>{
  handleDiscount()
}, [])

  return (
    <div className="cutoff-card-component ">
      <div className="cutoff-logo">
          <MdLocalOffer  size={30} color="red"/>
      </div>
      <div className="product-name">
        <p>{DiscRec?.product_name}</p>
        <div className="precentage-background">
            <p style={{fontSize:"25px"}}>{Number(DiscRec?.percentage).toFixed(1)}%</p>
        </div>
      </div>
      <div className="actualAmount-pnumber">
        <div className="offer-detail">
        <p className="offe-details-label">Offer Amount</p>
        <p className="offe-details-actual">< GiPayMoney size={20}/>{DiscRec?.CashDiscount}.sh</p>
        </div>
          <div className="offer-detail">
          <p className="offe-details-label">Started from</p>
           <p className="offe-details-actual"> <MdOutlineProductionQuantityLimits size={20}/>{DiscRec?.start_from}</p>
          </div>
      </div>
    </div>
  )
}
