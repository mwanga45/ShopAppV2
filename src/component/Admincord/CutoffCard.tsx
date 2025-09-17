import type React from "react";
import "./AnimatedCard.css"
import { MdLocalOffer } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
interface CutoffCardprops{
    productname?:string
    percentagecutoff?:number
    Amount?:number
    ProductNumber?:number
    details?:string
}
export const  CutoffCard:React.FC<CutoffCardprops> =({ProductNumber, productname,percentagecutoff,Amount, details})=> {
  return (
    <div className="cutoff-card-component ">
      <div className="cutoff-logo">
          <MdLocalOffer  size={30} color="red"/>
      </div>
      <div className="product-name">
        <p>Pallet starter</p>
        <div className="precentage-background">
            <p style={{fontSize:"25px"}}>5%</p>
        </div>
      </div>
      <div className="actualAmount-pnumber">
        <div className="offer-detail">
        <p className="offe-details-label">Offer Amount</p>
        <p className="offe-details-actual">< GiPayMoney size={20}/>1000.sh</p>
        </div>
          <div className="offer-detail">
          <p className="offe-details-label">Started from</p>
           <p className="offe-details-actual"> <MdOutlineProductionQuantityLimits size={20}/>10</p>
          </div>
      </div>
    </div>
  )
}
