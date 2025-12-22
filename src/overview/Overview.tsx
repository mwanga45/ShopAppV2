import { FcSalesPerformance } from "react-icons/fc";
import { Button } from "../component/button/Button";
import { SummaryCard } from "../component/summaryCard/summarycard";
import { SalesChart } from "../component/salesoverviewComp/sales-chart";
import "./overview.css";
import {
  Complinechart,
  BarCompChart,
} from "../component/comparisonchart/Complinechart";
import { GraphInfomation, CustomerInfo } from "./overview.api";
import { useEffect, useState } from "react";
import type {
  weekChartData,
  CustomerInfoInterface,
  DebtAmountInfo,
} from "../type.interface";
import { RiCloseFill } from "react-icons/ri";
import AnimatedCard from "../component/Admincord/animatedcard";
import { Debtcompo } from "../component/Debt/debtcomp";
import { CustomerList, Simplebar } from "../component/customer/customerlist";
import { HatGlassesIcon, PlusCircle } from "lucide-react";
import { SiToptal } from "react-icons/si";

export default function Overview() {
  const [Thisweek, setThisweek] = useState<weekChartData[]>([]);
  const [ViewCustomer, setViewCustomer] = useState<boolean>(false);
  const [showReg, setshowReg] = useState<boolean>(false);
  const [LastWeek, setLastWeek] = useState<weekChartData[]>([]);
  const [customerList, setCustomerList] = useState<CustomerInfoInterface[]>([]);
  const [DebtAmountInf, setDebtAmountInf] = useState<DebtAmountInfo>();
  const [searchName, setsearchName] = useState("");
  const handleCustomerInfo = async () => {
    try {
      const response = await CustomerInfo();
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      setCustomerList(response.data.data.CustomerInfo);
      setDebtAmountInf(response.data.data.DebtAmountInfo);
    } catch (err) {
      alert(err);
    }
  };

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
    handleCustomerInfo();
    document.body.style.overflow = ViewCustomer ? "hidden" : "auto";
  }, []);
  const filtercustomerName = customerList.filter((items) => {
    return items.customerName?.toLowerCase().includes(searchName.toLowerCase());
  });
  const CalculateRemainDebt =
    Number(DebtAmountInf?.TotalDebtRec) - Number(DebtAmountInf?.PaidMoney);
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
            <div
              className="close-circle"
              onClick={() => setViewCustomer(false)}
            >
              <RiCloseFill size={30} />
            </div>
          </div>
          <div className="Debtor-bar">
            <span>Debt Summary</span>
            <div className="Debtor-Infolist">
              <AnimatedCard
                icon={SiToptal}
                details={"Total paid and Unpaid Debt"}
                money={Number(DebtAmountInf?.TotalDebtRec ?? 0)}
              />
              <AnimatedCard
                icon={HatGlassesIcon}
                details={"Total Remain Debt"}
                money={Number(CalculateRemainDebt ?? 0)}
              />
              <AnimatedCard
                icon={"symbol"}
                details={"Total Paid Debt"}
                money={Number(DebtAmountInf?.PaidMoney ?? 0)}
              />
            </div>
          </div>
          <div className="CustomerRegisterSecection">
            <div>
              <button onClick={() => setshowReg(true)}>
                <PlusCircle />
                Add Customer
              </button>
            </div>
          </div>
          <div className="Customer-list-container">
            <span>Customer-list</span>
            <div>
              <input
                type="text"
                placeholder="search customer name..."
                name=""
                onChange={(e) => setsearchName(e.target.value)}
                value={searchName}
              />
            </div>
            <CustomerList CustomerDetails={filtercustomerName} />
          </div>
          {showReg && (
            <div className="RegiFormContainer">
              <span className="RegiFormContainerTitle">Welcome to Customer Panel! </span>
              <div className="customer-panel">
                <Simplebar description="Total Customer" Value={50} />
                <Simplebar description="Total Customer Debt" Value={25} />
                <Simplebar description="None Debt Customer " Value={25} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
