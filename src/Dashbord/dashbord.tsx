import "./dash.css";
import { Search } from "../component/search/Search";
import { Button } from "../component/button/Button";
import { CardReport } from "../component/card-report/card";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { Accountbar } from "../component/account/Account";
import { Salesdeviation } from "../component/daysales/Salesdeviation";
import { DonalChart } from "../component/donatchart/Donalchart";
import { OrdersTable } from "../component/Ordercomp/OrderlistTable";
import { PlaceOrder } from "../component/Form-comp/Form";
import { useEffect, useState } from "react";
import { GiTakeMyMoney, GiPiggyBank } from "react-icons/gi";
import type { CardReportType ,TodayRev } from "../type.interface";
import { DashboardResponseInfo } from "./dash.api";
import AnimatedCard from "../component/Admincord/animatedcard";
export const Dashboard = () => {
  const [Cashmoney, setCashmoney] = useState<TodayRev>();
  const [TotalGenerated, setTotalGenerated] = useState<number>()
  const [Percentage_deviation, setPercentage_deviation] = useState<number>()
  const [DeviateAmont, setDeviateAmount] = useState()
  const [ExpectedRevenue, setExpectedRevenue] = useState()
  useEffect(() => {
    handleDashResponse();
  }, []);
  const handleDashResponse = async () => {
    try {
      const response = await DashboardResponseInfo();
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      setCashmoney(response.data.data.TodayRevenue[0]);
      let Cash = response.data.data.TodayRevenue[0].generated_today
      let Bank = response.data.data.TodayRevenue[0].bankRevenue
     setTotalGenerated(Number(Cash) + Number(Bank))
     setPercentage_deviation(response.data.data.Percentage_deviation)
     setDeviateAmount(response.data.data.Deviation[0])
     setExpectedRevenue(response.data.data.averageRevenue)
    } catch (err) {
      alert("Network Error");
    }
  };

  const [openOrder, setopenOrder] = useState<boolean>(false);
  return (
    <div className="dash-container">
      <div className="account-part">
        <div className="dash-notification">
          <IoNotificationsCircleSharp size={40} color="black" />
        </div>
        <div>
          <Search />
        </div>
        <div>
          <Accountbar />
        </div>
      </div>
      <div className="title-part">
        <div>
          <p className="title">Dashboard</p>
          <p className="title-desc">Welcome to ShopApp-V2</p>
        </div>
        <div className="export-data">
          <Button buttonName="Make Order" Onclick={() => setopenOrder(true)} />
          <Button buttonName="export" />
        </div>
      </div>
      <div className="main-dashboard">
        <div className="main-firstlayor">
          <div className="cardreport">
            <CardReport titleone="Fast selling product this Month" />
            <CardReport titleone="Least selling product this Month" />
            <OrdersTable />
          </div>
          <div className="sale-info">
            <div className="cardreport">
               <AnimatedCard icon={GiTakeMyMoney} details={"cash money"} money={Number(Cashmoney?.generated_today)?? 0}/>
                <AnimatedCard icon={GiPiggyBank} details={"Bank cash"} money={Number(Cashmoney?.bankRevenue)?? 0}/>
                 <AnimatedCard icon={"symbol"} details={"Total Generated Today"} money={TotalGenerated}/>
            </div>
            <Salesdeviation TotalGenerated={TotalGenerated ?? 0} PercentageDeviation={Percentage_deviation}  DeviationAmount={DeviateAmont} ExpectedRevenue={ExpectedRevenue}/>
            <DonalChart />
          </div>
        </div>
      </div>
      {openOrder && <PlaceOrder onclose={() => setopenOrder(false)} />}
    </div>
  );
};
