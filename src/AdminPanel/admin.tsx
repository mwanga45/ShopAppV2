import { FaPiggyBank,FaBoxes,FaCoins } from "react-icons/fa";
import { FcDebt } from "react-icons/fc";
import "./admin.css";
import { Button } from "../component/button/Button";
import AnimatedCard from "../component/Admincord/animatedcard";
import { motion } from "framer-motion";
import FormComp from "../component/Form-comp/Form";
import { RiCloseFill } from "react-icons/ri";
import { ListComp } from "../component/List-comp/Listcomp";
import { StockRegForm } from "../component/Form-comp/Form";
import { useEffect, useState } from "react";
import { OtherAc } from "../component/account/otherAc";
import {
  BusinessWorthData,
  GetuserList,
  BusinesServiceinfo,
} from "./adminservice";
import { AdminReg } from "../component/admin-reg/admin-reg";
import { TransactionComp } from "../component/TranscactionComponet/transactioncomp";
import { ShowinfoCard } from "../component/card-report/shownInfo";
import { type MostOverViewRec, type BusinesServiceInfo, type IServiceRecord } from "../type.interface";
import { DateFormat } from "../format.helper";

interface AccountUserRespose {
  id?: number;
  CreatedAt?: string;
  UpdateAt?: string;
  fullname?: string;
  email?: string;
  phone_number?: string;
  nida?: string;
  role?: string;
  isActive?: boolean;
}
export const AdminPanel = () => {
  const [productShown, setproductShown] = useState<boolean>(false);
  const [Productlist, setProductlist] = useState<boolean>(false);
  const [showStockreg, setShowStockreg] = useState<boolean>(false);
  const [register, setregister] = useState<boolean>(false);
  const [rate, setrate] = useState(0);
  const [rate_status, setrate_status] = useState("");
  const [capital, setcapital] = useState(0);
  const [Bankdebt, setBankdebt] = useState(0);
  const [ListServ, setListServ] = useState<BusinesServiceInfo[]>([]);
  const [mostsales, setmostsales] = useState<MostOverViewRec>()
  const [leastsales, setleastsales] = useState<MostOverViewRec>()
  const [Accountdetails, setAccountdetails] = useState<AccountUserRespose[]>(
    []
  );
  const [StockWorth, setStockWorth] = useState<number | null>();
  const [Withdraw, setwithdraw] = useState<number | null>();
  const [CustomerDebt, setCustomerDebt] = useState<number | null>();
  const [Businessnetworth, setBusinessnetworth] = useState<number | null>();
  const [transactionopen, settransactionopen] = useState<boolean>(false);
  const [largerDebt, setlargerDebt] = useState<MostOverViewRec>()
  const [thisWeekservRecord, setthisWeekservRecord] = useState<
    IServiceRecord[] | null
  >([]);
  const [TodayservRecord, setTodayservRecord] = useState<
    IServiceRecord[] | null
  >([]);
  const handleRegUser = () => {
    setregister(!register);
  };
  const handleopenproductregForm = () => {
    setproductShown(!productShown);
  };
  const handleOpenList = () => {
    setProductlist(!Productlist);
  };
  const handleopenStockreg = () => {
    setShowStockreg(!showStockreg);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const handleServiceList = async () => {
    try {
      const response = await BusinesServiceinfo();
      setListServ(response?.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleBusinessWorth = async () => {
    try {
      const response = await BusinessWorthData();
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      setStockWorth(response.data.data.StockWorth);
      setCustomerDebt(response.data.data.CustomerDebt);
      setBusinessnetworth(response.data.data.networth);
      setrate(response.data.data.Revenue_Rate.data.rate);
      setrate_status(response.data.data.Revenue_Rate.data.rate_status);
      setcapital(response.data.data.capital_amount);
      setBankdebt(response.data.data.Bank_Debt);
      setwithdraw(response.data.data.Withdraw_money.Withdraw);
      setTodayservRecord(response.data.data.TodayservRecord);
      setthisWeekservRecord(response.data.data.ThisweekServRecord);
      setmostsales(response.data.data.findMostSalesDay)
      setleastsales(response.data.data. findLeastSalesDay)
      setlargerDebt(response.data.data.findlargestDebtRec)
      return;
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    try {
      const handlegetuserAccount = async () => {
        const response = await GetuserList();
        if (Array.isArray(response.data.data)) {
          setAccountdetails(response.data.data);
        } else {
          console.error("API response data is not an array:", response.data);
          setAccountdetails([]);
        }
        if (!response.data.success) {
          alert(response.data.message);
        }
      };
      handlegetuserAccount();
      handleBusinessWorth();
      handleServiceList();
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }, []);
  useEffect(() => {
    handleBusinessWorth();
    const intervalLoad = setInterval(() => {
      if (transactionopen) {
        handleBusinessWorth();
        handleServiceList()
        document.body.style.overflow = transactionopen ? 'hidden' :'auto'
      }
    }, 5000);
    return () => clearInterval(intervalLoad);
  }, [transactionopen]);
  return (
    <motion.div
      className="adminpanel-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="sales-header" variants={itemVariants}>
        <h1 className="page-title">Admin-Panel</h1>
        {/* <Accountbar /> */}
      </motion.div>
      <motion.div
        className="busniess-details-container"
        variants={itemVariants}
      >
        <ShowinfoCard
          discription="Rate of Capital growth"
          rate={rate ?? 0}
          totalAmount={Number(capital).toLocaleString() ?? 0}
          rate_status={rate_status}
        />
        <ShowinfoCard />
      </motion.div>
      <motion.div className="admin-action-container" variants={itemVariants}>
        <Button
          buttonName="Register Product"
          Onclick={handleopenproductregForm}
        />
        <Button buttonName="Update-Product" Onclick={handleOpenList} />
        <Button buttonName="Stock-register" Onclick={handleopenStockreg} />
      </motion.div>
      <motion.div className="business-other-info" variants={itemVariants}>
        <motion.div
          className="admin-product-details-container"
          variants={itemVariants}
        >
          <Button
            buttonName="Cash flow & Transaction"
            Onclick={() => settransactionopen(true)}
          />
          <AnimatedCard
            details="Bank-Dept"
            icon={FaPiggyBank}
            money={Bankdebt ?? 0}
          />
          <AnimatedCard
            details="Customer-Debt"
            icon={FcDebt}
            money={CustomerDebt ?? 0}
          />
          <AnimatedCard
            details="Business-Networth"
            icon={FaCoins}
            money={Businessnetworth ?? 0}
          />
        </motion.div>
        <motion.div
          className="admin-report-analysis-container"
          variants={itemVariants}
        >
          <div className="report-card black">
            <h3>Most Selling Day</h3>
            <span className="detail-item">Date:  {' '}{DateFormat(mostsales?.Date ?? '')}</span>
            <span className="detail-item">Sales:  {' '}{Number(mostsales?.Revenue ?? 0).toLocaleString()}.Tsh</span>
          </div>
          <div className="report-card white">
            <h3>Least Selling Day</h3>
            <span className="detail-item" >Date:  {' '}{DateFormat(leastsales?.Date ?? '')}</span>
            <span className="detail-item">Sales: {' '}{Number(leastsales?.Revenue ?? 0).toLocaleString()}Tsh</span>
          </div>
          <div className="report-card green">
            <h3>Biggest Debt</h3>
            <span className="detail-item">Customer: {largerDebt?.customerName}</span>
            <span className="detail-item">Amount: {' '} {Number(largerDebt?.Revenue ?? 0).toLocaleString()} Tsh</span>
          </div>
          <div className="report-card black">
            <h3>Business Situation</h3>
            <span className="detail-item">Overall: Stable</span>
            <span className="detail-item">Trend: Upward</span>
          </div>
        </motion.div>
        <motion.div
          className="admin-sales-summary-stock"
          variants={itemVariants}
        >
          <Button buttonName="User-Register" Onclick={handleRegUser} />
          <div className="critical-stock-product">
            {Accountdetails.map((u) =>
              u.id ? (
                <OtherAc
                  key={u.id}
                  fullname={u.fullname}
                  email={u.email}
                  isActive={u.isActive}
                  role={u.role}
                />
              ) : null
            )}
          </div>
          <AnimatedCard
            details="Stock Worth"
            icon={FaBoxes}
            money={StockWorth ?? 0}
          />
        </motion.div>
      </motion.div>
      {productShown && (
        <div className="product-reg-popup">
          <FormComp isOpen={productShown} onClose={handleopenproductregForm} />
        </div>
      )}
      {Productlist && (
        <div className="pop-background">
          <div className="close-poup-container">
            <div
              className="icon-close"
              onClick={() => setProductlist(!Productlist)}
            >
              <RiCloseFill size={30} />
            </div>
          </div>
          <div className="content-container-component">
            <ListComp />
          </div>
        </div>
      )}
      {showStockreg && (
        <div className="product-reg-popup">
          <StockRegForm isOpen={productShown} onClose={handleopenStockreg} />
        </div>
      )}
      {register && (
        <div className="pop-background">
          <div className="close-poup-container">
            <div className="icon-close" onClick={() => setregister(!register)}>
              <RiCloseFill size={30} />
            </div>
          </div>
          <AdminReg />
        </div>
      )}
      {transactionopen && (
        <div className='transactionComp-container'>
          <TransactionComp
            capital={capital}
            withdraw={Withdraw ?? 0}
            BusinesSev={ListServ}
            thisWeekservRecord={thisWeekservRecord ?? []}
            TodayservRecord={TodayservRecord ?? []}
            close={()=> settransactionopen(false)}
          />
        </div>
      )}
    </motion.div>
  );
};
