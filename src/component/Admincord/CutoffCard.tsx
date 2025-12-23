import type React from "react";
import "./AnimatedCard.css"
import { MdLocalOffer } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import type { DiscountInfo } from "../List-comp/Listcomp";
export const  CutoffCard:React.FC<DiscountInfo> =({id, product_name, percentage, CashDiscount, start_from})=> {


  return (
    <div className="cutoff-card-component " key={id}>
      <div className="cutoff-logo">
          <MdLocalOffer  size={30} color="red"/>
      </div>
      <div className="product-name">
        <span style={{color:"white", fontSize:"23px", fontWeight:"bold"}}>{product_name}</span>
        <div className="precentage-background">
            <p style={{fontSize:"25px"}}>{Number(percentage?? "0").toFixed(1)}%</p>
        </div>
      </div>
      <div className="actualAmount-pnumber">
        <div className="offer-detail">
        <p className="offe-details-label">Offer Amount</p>
        <p className="offe-details-actual">< GiPayMoney size={20}/>{CashDiscount??"0"}.sh</p>
        </div>
          <div className="offer-detail">
          <p className="offe-details-label">Started from</p>
           <p className="offe-details-actual"> <MdOutlineProductionQuantityLimits size={20}/>{start_from?? "0"}</p>
          </div>
      </div>
    </div>
  )
}
