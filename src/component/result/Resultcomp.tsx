import "./return.css";
import type { FetchLastRec } from "../../type.interface";
import type React from "react";
import { RiCloseFill } from "react-icons/ri";
export const ResultComp: React.FC<FetchLastRec> = ({
  Revenue,
  Total_pc_pkg_litre,
  Net_profit,
  Expected_Profit,
  profit_deviation,
  product,
  percentage_deviation,
  percentage_discount,
  paymentstatus,
  Onclick
}) => {


  return (
    <div className="return-data-main-container">
      <div style={{display:"flex", width:'100%', height:'auto', justifyContent:"space-between"}}>
        <span className="return-data-title">
          Sales of Product {product.product_name}{" "}
        </span>
        <div className="icon" onClick={Onclick}>
          <RiCloseFill color="white" size={30} fontWeight={500} />
        </div>
      </div>
      <div className="returned-info-details">
        <div className="act-retured-data-container">
          <span className="act-return-label">Product_name</span>
          <span className="act-retured-data">{product.product_name}</span>
        </div>
        <div className="act-retured-data-container">
          <span className="act-return-label">Total Pc</span>
          <span className="act-retured-data">{Total_pc_pkg_litre}</span>
        </div>

        <div className="act-retured-data-container">
          <span className="act-return-label">Expected Profit</span>
          <span className="act-retured-data">{Expected_Profit}</span>
        </div>
        <div className="act-retured-data-container">
          <span className="act-return-label">Net profit</span>
          <span className="act-retured-data">{Net_profit}</span>
        </div>

        <div className="act-retured-data-container">
          <span className="act-return-label">Profit Deviation</span>
          <span className="act-retured-data">{profit_deviation}</span>
        </div>
        <div className="act-retured-data-container">
          <span className="act-return-label">Percentage Discount</span>
          <span className="act-retured-data">{percentage_discount}</span>
        </div>

        <div className="act-retured-data-container">
          <span className="act-return-label">Parcentage deviation</span>
          <span className="act-retured-data">{percentage_deviation}</span>
        </div>
        <div className="act-retured-data-container">
          <span className="act-return-label">Payment Status</span>
          <span className="act-retured-data">{paymentstatus}</span>
        </div>
        <div className="act-retured-data-container">
          <span className="act-return-label">Total Revenue</span>
          <span className="act-retured-data">{Revenue}</span>
        </div>
      </div>
      <div className="stock-remain-retured"></div>
    </div>
  );
};
