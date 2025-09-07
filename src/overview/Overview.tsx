// import React from 'react'

import { Accountbar } from "../component/account/Account"
import { FaAppleWhole } from "react-icons/fa6";
import {Button} from "../component/button/Button"
import { SummaryCard } from "../component/summaryCard/summarycard"
import "./overview.css"
export default function Overview() {
  return (
    <div className='overview-container' >
      <div className="overview-Accountbar">
        <Accountbar/>
      </div>
       <div className="overview-title">
        <p>Business OverView -Summary</p>
       </div>
       <div className="overView-info-container">
        <Button buttonName="Debtor" />
        <Button buttonName="OrderList"/>
       </div>
       <div className="business-summary">
        <div className="category-summary">
          <SummaryCard SummaryActInfo="2500.sh" SummaryTitle="Most  Sales Wholesales Product" icon={FaAppleWhole }/>
          <SummaryCard SummaryActInfo="2500.sh" SummaryTitle="Most  Sales Wholesales Product" icon={FaAppleWhole }/>
          <SummaryCard SummaryActInfo="2500.sh" SummaryTitle="Most  Sales Wholesales Product" icon={FaAppleWhole }/>
          <SummaryCard SummaryActInfo="2500.sh" SummaryTitle="Most  Sales Wholesales Product" icon={FaAppleWhole }/>
        </div>
        <div className="totalprofit-summary">
           <SummaryCard SummaryActInfo="2500.sh" SummaryTitle="Most  Sales Wholesales Product" icon={FaAppleWhole }/>
        </div>
       </div>
    </div>
  )
}
