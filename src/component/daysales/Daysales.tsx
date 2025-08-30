import "./daysales.css"
import { SiMoneygram } from "react-icons/si";


type Result ={
  title_name:string
  total_value:string
}
export const Daysales = ()=>{
    return(
      <div className="sales-container">
        <p className="head">Today Sales</p>
        <p className="Amount"> <SiMoneygram color="black" size={20}/>2300000 Tsh</p>
      </div>
    ) 
}

export const DayResult = ({title_name, total_value}:Result)=>{
  return(
    <div className="dayresult-contaier">
      <div>
        <p className="dayanalys">{title_name}</p>
      </div>
      <div>
        <p className="total_value">{total_value}.Tsh</p>
      </div>

    </div>
  )
}