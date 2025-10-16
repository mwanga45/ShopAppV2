import "./sales.css";
import { Accountbar } from "../component/account/Account";
import { Search } from "../component/search/Search";
import { Daysale_list, DayResult } from "../component/daysales/Daysales";
import { AdminsalesAnaysis } from "../component/daysales/salesAnalysis";
import { SalesRecForm } from "../component/Form-comp/Form";
import { useEffect, useState } from "react";
import { fetchProductsales, fetchNormalsellrecord } from "./service/sales.api";
import type { DebtRecord, SalesRecord, SalesSummaryResponsesales } from "../type.interface";
import type { wProduct } from "../type.interface";
import type { rProduct } from "../type.interface";
import { RiCloseFill } from "react-icons/ri";
import { Debtinfo } from "../central-api/central-api";
import { Debtcompo } from "../component/Debt/debtcomp";

export default function SalesToday() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [Allrecord, setAllrecord] = useState<SalesSummaryResponsesales>();
  const [Allsales, setAllsales] = useState<SalesRecord[]>([]);
  const [wholesalerecord, setwholesalesrecord] = useState<SalesRecord[]>([]);
  const [retailsalesrecord, setretailsalesrecord] = useState<SalesRecord[]>([]);
  const [wholesaleprod, setWholesaleprod] = useState<wProduct[]>([]);
  const [retailsalesprod, setretailsaleprod] = useState<rProduct[]>([]);
  const [Pendingpaymentsales, setPendingpaymentsales] = useState<SalesRecord[]>([]);
  const [DebtInfo, setDebtInfo] = useState<DebtRecord[]>([])
  const [showsalesAnalysis, setshowsalesAnalysis] = useState<boolean>(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleproductInfo = async () => {
    try {
      const response = await fetchProductsales();
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      setretailsaleprod(response.data.data.retailsale);
      setWholesaleprod(response.data.data.wholesale);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
  const handlesalesAnalysis = () => {
    setshowsalesAnalysis(true);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  const handleClose = () => {
    setshowsalesAnalysis(false);
  };
  useEffect(() => {
    const handleDebtRec = async ()=>{
      const response = await Debtinfo()
      setDebtInfo(response.data.data)

    }
    const handlereturnsalesdata = async () => {
      const response = await fetchNormalsellrecord();
      setAllrecord(response.data);
      setAllsales(response.data.data.Allcombined);
      setwholesalesrecord(response.data.data.Normalsaleswholereturn);
      setretailsalesrecord(response.data.data.Normalsalesretailreturn);
      setPendingpaymentsales(response.data.data.AllcombinedPending);
    };
    handleDebtRec()
    handleproductInfo();
    handlereturnsalesdata();
  }, []);
  useEffect(() => {
    document.body.style.overflow = isFormOpen ? "hidden" : "auto";
  }, [isFormOpen]);
  return (
    <div className="Wh-Rtsales-container">
      <div className="salesbar">
        <Accountbar />
      </div>
      <div className="sales-header">
        <h1 className="page-title">Product Sales Today</h1>
      </div>
      <div className="trigger-container">
        <div className="trigger-btn">
          <button type="submit" name="Whole-sales" onClick={handleOpenForm}>
            Open sales record
          </button>
          <button
            type="submit"
            name="Retail-ssales"
            onClick={handlesalesAnalysis}
          >
            Admin-sales-Analysis
          </button>
        </div>
        <div>
          <Search />
        </div>
      </div>
      <div className="whole-retail-analysis">
        <DayResult
          title_name="Total Retailsales Revenue"
          total_value={Allrecord?.data.totolRetailRevenue ?? 0}
          color={"rgb(29, 137, 23);"}
        />
        <DayResult
          title_name="Total Revenue"
          total_value={Allrecord?.data.totalRevenue ?? 0}
          color={"rgb(29, 137, 23);"}
        />
        <DayResult
          title_name="Total Wholesales Revenue"
          total_value={Allrecord?.data.totalWholeRevenue ?? 0}
          color={"rgb(29, 137, 23);"}
        />
      </div>
      <div className="resultTb-container">
        <Daysale_list
          Allcombined={Allsales}
          Normalsalesretailreturn={retailsalesrecord}
          Normalsaleswholereturn={wholesalerecord}
          Pendingsalesreturn={Pendingpaymentsales}
          AllDebtRecord={DebtInfo}
          
        />
      </div>
      {isFormOpen && (
        <SalesRecForm
          wholesales={wholesaleprod}
          retailsales={retailsalesprod}
          onClose={handleCloseForm}
        />
      )}
      {showsalesAnalysis && (
        <div className="AdminsalesAnalysis-container">
          <div className="AdminsalesAnalysis-container-arrange">
            <div className="AdminsalesAnalysis-container-arrange-close-btn">
            <div className="icon" onClick={handleClose}>
              <RiCloseFill color="white" size={30} fontWeight={500} />
            </div>
            </div>
            <AdminsalesAnaysis />
          </div>
        </div>
      )}
      <div>
        <Debtcompo/>
        
      </div>
    </div>
  );
}
