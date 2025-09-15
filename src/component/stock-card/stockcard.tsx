import type React from "react";
import { SimpleDonutChart } from "./SimpleDonutChart";
import type{ Stockprops } from "../../stock/Stock";
import "./stockcard.css"
interface CardProps {
  onclick?:React.MouseEventHandler<HTMLButtonElement>
}
type StockCardprops = CardProps & Stockprops
export const Stockcard:React.FC<StockCardprops> =({onclick,product_id,product_name, user_id, fullname,last_add_stock,last_stock,CreatedAt,percentageRemain,product_category})=> {
  const handleonclick:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    if(onclick){
     onclick(e) 
     console.log("clicked")
    }

  }
  return (
    <div className="stock-card-container" key=
    {product_id}>
      <div className="stock-card-main">
        <div className="stock-card-info">
          <p className="info-about">Product-name</p>
          <p className="info-real">{product_name}r</p>
          <p className="info-about">Remain Product</p>
          <p className="info-real">{last_stock}/{last_add_stock}</p>
          <p className="info-about">% Remain </p>
          <p className="info-real">{percentageRemain}%</p>
        </div>
        <div className="stock-card-donut">
            <SimpleDonutChart percentage={percentageRemain}/>
        </div>
      </div>
      <div className="stock-update">
        <button name="update stock" onClick={handleonclick}>Update stock</button>
      </div>
    </div>
  )
}
