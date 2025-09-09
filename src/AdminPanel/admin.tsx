import { Accountbar } from "../component/account/Account"
import { SummaryCard } from "../component/summaryCard/summarycard";
import { GiDjedPillar } from "react-icons/gi";
import { GiProfit } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import {  FaWallet, FaPiggyBank } from "react-icons/fa";
import { FcDebt } from "react-icons/fc";

import "./admin.css"
import { Button } from "../component/button/Button";
import AnimatedCard from "../component/Admincord/animatedcard";
export  const AdminPanel = () =>{
    return(
        <div className="adminpanel-container">
            <div className="panel-title-account-container">
                <h2>Admin-Panel</h2>
                <Accountbar/>
            </div>
            <div className="busniess-details-container">
            <SummaryCard SummaryActInfo="250000" SummaryTitle="Business Money" icon={GiTakeMyMoney } style={{ animationDelay: '0.7s'}}/>
            <SummaryCard SummaryActInfo="250000" SummaryTitle="Business Capital " icon={ GiDjedPillar } style={{ animationDelay: '0.8s' }}/>
            <SummaryCard SummaryActInfo="20000" SummaryTitle="Busines Profit" icon={GiProfit } style={{ animationDelay: '0.9s' }}/>
            </div>
            <div className="admin-action-container">
                <Button buttonName="Register Product"/>
                <Button buttonName="Business Target"/>
                <Button buttonName="Deviation Record"/>
            </div>
            <div className="business-other-info">
                <div className="admin-product-details-container">
                    <Button buttonName="Money Usage"/>
                    <AnimatedCard details="Bank-dept" icon={FaPiggyBank} money={2300000}/>
                    <AnimatedCard details="Debt" icon={FcDebt} money={23000}/>
                </div>
                <div className="admin-report-analysis-container">
               
                </div>
                <div className="admin-sales-summary-stock">
                    <Button buttonName="User-Register"/>
                    <div className="critical-stock-product">
                    </div>
                    <AnimatedCard details="Total salesToday" icon={FaWallet} money={25000}/>
                </div>
            </div>

        </div>
    )

}