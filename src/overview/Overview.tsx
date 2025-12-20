import { FcSalesPerformance } from "react-icons/fc";
import { Button } from "../component/button/Button";
import { SummaryCard } from "../component/summaryCard/summarycard";
import { SalesChart } from "../component/salesoverviewComp/sales-chart";
import "./overview.css";
import {
  Complinechart,
  BarCompChart,
} from "../component/comparisonchart/Complinechart";
import { GraphInfomation } from "./overview.api";
import { useEffect, useState } from "react";
import type { weekChartData } from "../type.interface";
import { RiCloseFill } from "react-icons/ri";

export default function Overview() {
  const [Thisweek, setThisweek] = useState<weekChartData[]>([]);
  const [ViewCustomer, setViewCustomer] = useState<boolean>(false);
  const [LastWeek, setLastWeek] = useState<weekChartData[]>([]);
  const handleGraphData = async () => {
    const response = await GraphInfomation();
    if (!response.data.success) {
      alert(response.data.message);
      return;
    }
    setThisweek(response.data.data.Thisweek);
    setLastWeek(response.data.data.Lastweek);
    console.log("this week data", Thisweek);
  };
  useEffect(() => {
    handleGraphData();
    document.body.style.overflow = ViewCustomer ? "hidden" : "auto";
  }, []);

  return (
    <div className="overview-container">
      <div className="overview-title">
        <p>Business OverView -Summary</p>
      </div>
      <div className="overView-info-container">
        <Button
          buttonName="Customer-Information"
          Onclick={() => setViewCustomer(true)}
        />
      </div>
      <div className="business-summary">
        <div className="category-summary">
          <SummaryCard
            SummaryActInfo="250000"
            SummaryTitle="Most  Sales Wholesales Product"
            icon={FcSalesPerformance}
            style={{ animationDelay: "0.7s" }}
          />
          <SummaryCard
            SummaryActInfo="25000"
            SummaryTitle="Profit Made"
            icon={FcSalesPerformance}
            style={{ animationDelay: "0.8s" }}
          />
          <SummaryCard
            SummaryActInfo="20000"
            SummaryTitle="Most  Sales Retailsales Product"
            icon={FcSalesPerformance}
            style={{ animationDelay: "0.9s" }}
          />
          <SummaryCard
            SummaryActInfo="5000"
            SummaryTitle="Profit Made"
            icon={FcSalesPerformance}
            style={{ animationDelay: "1.0s" }}
          />
        </div>
        <div className="totalprofit-summary">
          <SummaryCard
            SummaryActInfo="25500"
            SummaryTitle="Most  Sales Wholesales Product"
            icon={FcSalesPerformance}
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </div>
      <div className="product-and-sales-comparison">
        <h2 className="comarisons-title">Business Performance</h2>
        <div className="comparison-chart">
          <div className="Linecomponet-container">
            <Complinechart
              title="Sales Performance"
              LastWeek={LastWeek}
              Thisweek={Thisweek}
            />
          </div>
          <div className="Barcomponet-container">
            <BarCompChart
              title="Sales Product Perfomance"
              LastWeek={LastWeek}
              Thisweek={Thisweek}
            />
          </div>
        </div>
      </div>
      <div>
        <span className="comarisons-title">Money Distribution Cycle</span>
        <SalesChart />
      </div>
      {ViewCustomer && (
        <div className="Customer-View-Container">
          <div className="customer-view-bar">
            <div>
              <span className="Customer-title">Customer Information </span>
            </div>
            <div className="close-circle">
             <RiCloseFill size={30} />
            </div>
          </div>
          <div className="Debtor-bar">
            <span>Debt Summary</span>
            
          </div>
        </div>
      )}
    </div>
  );
}
