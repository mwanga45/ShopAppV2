import "./dash.css"
import { Search } from "../component/search/Search"
import Button from "../component/button/Button"
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { Accountbar } from "../component/account/Account"
export const Dashboard = () =>{
    return(
      <div className="dash-container">
        <div className="account-part">
        <div className="dash-notification">
          <IoNotificationsCircleSharp size={40} color="black"/>
        </div>
          <div>
            <Search/>
          </div>
          <div>
            <Accountbar/>
          </div>
        </div>
        <div className="title-part">
          <div>
          <p className="title">Dashboard</p>
          <p className="title-desc">Welcome to ShopApp-V2</p>
          </div>
          <div className="export-data">
            <Button/>
          </div>
        </div>
      
      </div>
    )
} 