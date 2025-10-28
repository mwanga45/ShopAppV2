import "./dash.css"
import { Search } from "../component/search/Search"
import {Button} from "../component/button/Button"
import { CardReport } from "../component/card-report/card";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { Accountbar } from "../component/account/Account"
import { Daysales } from "../component/daysales/Daysales";
import { Salesdeviation } from "../component/daysales/Salesdeviation";
import { DonalChart } from "../component/donatchart/Donalchart";
import { OrdersTable } from "../component/Ordercomp/OrderlistTable";
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
            <Button buttonName="export"/>
          </div>
        </div>
        <div className="main-dashboard">
          <div className="main-firstlayor">
            <div className="cardreport">
            <CardReport/>
            <CardReport/>
             <OrdersTable/>
            </div>
            <div className="sale-info">
            <Daysales/>
            <Salesdeviation/>
            <DonalChart/>
            </div>
          </div>
        </div>
      
      </div>
    )
} 