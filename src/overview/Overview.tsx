
import { Accountbar } from "../component/account/Account"
import { FcSalesPerformance } from "react-icons/fc";
import {Button} from "../component/button/Button"
import { SummaryCard } from "../component/summaryCard/summarycard"
import "./overview.css"
import { Complinechart, BarCompChart } from "../component/comparisonchart/Complinechart"; 
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
          <SummaryCard SummaryActInfo="250000" SummaryTitle="Most  Sales Wholesales Product" icon={FcSalesPerformance}/>
          <SummaryCard SummaryActInfo="25000" SummaryTitle="Profit Made" icon={FcSalesPerformance}/>
          <SummaryCard SummaryActInfo="20000" SummaryTitle="Most  Sales Retailsales Product" icon={FcSalesPerformance}/>
          <SummaryCard SummaryActInfo="5000" SummaryTitle="Profit Made" icon={FcSalesPerformance}/>
        </div>
        <div className="totalprofit-summary">
           <SummaryCard SummaryActInfo="25500" SummaryTitle="Most  Sales Wholesales Product" icon={FcSalesPerformance}/>
        </div>
       </div>
       <div className="product-and-sales-comparison">
        <h2 className="comarisons-title">Business Comparisons</h2>
        <div className="comparison-chart">
          <div className="Linecomponet-container">
              <Complinechart Pname="Pallet starter"/>
          </div>
        <div className="Barcomponet-container">
            <BarCompChart Pname="Marsh"/> {/* Use BarCompChart */} 
        </div>
        </div>
       </div>
    </div>
  )
}
