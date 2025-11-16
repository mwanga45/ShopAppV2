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
import { GiTakeMyMoney } from "react-icons/gi";
import type { TodayRev } from "../type.interface";
import { DashboardResponseInfo ,  DashordGraphdata} from "./dash.api";
import AnimatedCard from "../component/Admincord/animatedcard";
import { GridDemo } from "../component/comparisonchart/profitchart";
import type{ RevenueRatechange } from "../type.interface";
import { TbSum } from "react-icons/tb";
import { BsBank2 } from "react-icons/bs";

export const Dashboard = () => {
  const [Cashmoney, setCashmoney] = useState<TodayRev>();
  const [TotalGenerated, setTotalGenerated] = useState<number>();
  const [Percentage_deviation, setPercentage_deviation] = useState<number>();
  const [DeviateAmont, setDeviateAmount] = useState();
  const [ExpectedRevenue, setExpectedRevenue] = useState();
  const [Ratedata , setRatedata] =useState<RevenueRatechange[] | null>([])

  const handleDashResponse = async () => {
    try {
      const response = await DashboardResponseInfo();
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      setCashmoney(response.data.data.TodayRevenue[0] ??0);
      setTotalGenerated(response.data.data.combineResult ?? 0);
      setPercentage_deviation(response.data.data.Percentage_deviation ?? 100);
      setDeviateAmount(response.data.data.Deviation[0] ?? response.data.data.averageRevenue );
      setExpectedRevenue(response.data.data.averageRevenue);
      return
    } catch (err) {
      alert("Network Error");
      
    }
  };
  const handlGrphData = async () => {
     try{
      const response = await DashordGraphdata()
      if(!response.data.success){
        alert("Error Occured")
        return
      }
      setRatedata(response.data.data.formattedResult)
      console.log("something here",response.data.data.formattedResult)
     }catch(err){
      console.error(err)
      alert('Something went wrong')
     }
  }
    useEffect(() => {
    handleDashResponse();
    handlGrphData()
  }, []);

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
          <Button buttonName="daily requirement"/>
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
            <GridDemo RevenueRateChange={Ratedata ?? []} />
            <GridDemo />
          </div>
          <div className="sale-info">
            <div className="cardreport">
              <AnimatedCard
                icon={GiTakeMyMoney}
                details={"cash money"}
                money={Number(Cashmoney?.generated_today) ?? 0}
              />
              <AnimatedCard
                icon={BsBank2}
                details={"Bank money"}
                money={Number(Cashmoney?.bankRevenue) ?? 0}
              />
              <AnimatedCard
                icon={ TbSum}
                details={"Total Generated Today"}
                money={TotalGenerated}
              />
            </div>
            <Salesdeviation
              TotalGenerated={TotalGenerated ?? 0}
              PercentageDeviation={Percentage_deviation}
              DeviationAmount={DeviateAmont}
              ExpectedRevenue={ExpectedRevenue}
            />
            <DonalChart />
          </div>
        </div>
      </div>
      {openOrder && <PlaceOrder onclose={() => setopenOrder(false)} />}
    </div>
  );
};
