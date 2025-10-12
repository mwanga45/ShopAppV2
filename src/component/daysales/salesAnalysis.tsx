import "./daysales.css";
import { SiWikibooks } from "react-icons/si";
export const AdminsalesAnaysis = () => {
  return (
    <div className="salesAnaysis-main-container">
      <div className="salesAnalysis-title-container">
        <span className="analysis-first-title">Sales</span>
        <span className="analysis-second-title">
          Overview of Your sales Performance today{" "}
        </span>
      </div>
      <div className="product-sales-track-each">
         <span  style={{display:'flex',columnGap:'2px', cursor:"pointer", justifyContent:"center", alignItems:"center", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", width:'auto', height:"auto", padding:"10px" , borderRadius:'10px'}}>
            <span style={{height:'40px', width:"40px", display:'flex', justifyContent:"center", alignContent:"center", backgroundColor:"blueviolet", borderRadius:"50%",boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", border:"3px, solid,whitesmoke"}}><SiWikibooks color="white" fontWeight={700}/></span><span style={{color:'grey', fontWeight:"bolder", fontSize:"18px"}}>View sales Each</span>
         </span>
      </div>
      <div className="salesdayasanalysis-container">
        <div className="sales-analysis-graph-container"></div>
        <div className="salasAnalysis-card-container">
          <div className="business-card-comaparizone">
            <div className="first-card-comparizone">stock-in</div>
            <div className="second-card-comparizone">stock-out</div>
          </div>
          <div className="business-card-comaparizone">
            <div className="first-card-comparizone">profi comparizone today</div>
            <div className="second-card-comparizone">profit comparizone yesterday</div>
          </div>
        </div>
      </div>
      <div className="order-debt-record-deviation">
        <div className="today-debtor-list"></div>
        <div className="order-list-total-deviation">
          <div className="title-orderlist-deviatian-container">
            <span  className="title-orderlist-deviatian-title">Order Placement And Deviation from Profit </span>
            <span className="analysis-second-title">Overview deviation and Orderlist</span>
          </div>
          <div className="order-card-deviation"></div>
        </div>
      </div>
    </div>
  );
};
