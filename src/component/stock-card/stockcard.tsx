import type React from "react";
import { SimpleDonutChart } from "./SimpleDonutChart";
import "./stockcard.css"
interface CardProps {
  onclick?:React.MouseEventHandler<HTMLButtonElement>
}
export const Stockcard:React.FC<CardProps> =({onclick})=> {
  const handleonclick:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    if(onclick){
     onclick(e) 
     console.log("clicked")
    }

  }
  return (
    <div className="stock-card-container">
      <div className="stock-card-main">
        <div className="stock-card-info">
          <p className="info-about">Product-name</p>
          <p className="info-real">Pallet starter</p>
          <p className="info-about">Remain Product</p>
          <p className="info-real">5/20 pc</p>
          <p className="info-about">% Remain </p>
          <p className="info-real">20%</p>
        </div>
        <div className="stock-card-donut">
            <SimpleDonutChart percentage={50}/>
        </div>
      </div>
      <div className="stock-update">
        <button name="update stock" onClick={handleonclick}>Update stock</button>
      </div>
    </div>
  )
}
