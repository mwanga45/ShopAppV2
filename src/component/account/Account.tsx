import "./account.css"
import { PiUserCircleDashedFill } from "react-icons/pi";
export const Accountbar = ()=>{
    return(
    <div className="ac-container">
      <div className="avator">
        <PiUserCircleDashedFill color="pink" size={40} enableBackground={"pink"}/>
      </div>
      <div className="acc-details">
        <p className="acc-name">Issa mwanga</p>
        <p className="acc-email">issamwanga02@gmail.com</p>
      </div>
    </div> 
    )
}