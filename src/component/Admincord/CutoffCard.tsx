import type React from "react";
import "./AnimatedCard.css"
import { MdLocalOffer } from "react-icons/md";
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
            <p>5%</p>
        </div>
      </div>
      <div className="actualAmount-pnumber">
        <div className="offer-detail">
        <p>Offer Amount</p>
        <p>1000</p>
        </div>
          <div className="offer-detail">
          <p>Started from</p>
           <p>10</p>
          </div>
      </div>
    </div>
  )
}
