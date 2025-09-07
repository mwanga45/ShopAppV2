// import React from 'react'

import { Accountbar } from "../component/account/Account"
import {Button} from "../component/button/Button"
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
          
        </div>
        <div className="totalprofit-summary">

        </div>
       </div>
    </div>
  )
}
