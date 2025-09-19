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
export const  CutoffCard:React.FC<CutoffCardprops> =({ProductNumber, productname,percentagecutoff,Amount, })=> {
  return (
    <div className="cutoff-card-component ">
      <div className="cutoff-logo">
          <MdLocalOffer  size={30} color="red"/>
      </div>
      <div className="product-name">
        <p>{productname}</p>
        <div className="precentage-background">
            <p style={{fontSize:"25px"}}>{percentagecutoff}</p>
        </div>
      </div>
      <div className="actualAmount-pnumber">
        <div className="offer-detail">
        <p className="offe-details-label">Discount Money</p>
        <p className="offe-details-actual">< GiPayMoney size={20}/>{Amount}.Tsh</p>
        </div>
          <div className="offer-detail">
          <p className="offe-details-label">Started from</p>
           <p className="offe-details-actual"> <MdOutlineProductionQuantityLimits size={20}/>{ProductNumber}</p>
          </div>
      </div>
    </div>
  )
}
