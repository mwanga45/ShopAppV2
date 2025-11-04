import "./card.css";
import {
  FaChartLine,
  FaBoxes,
  FaShoppingCart,
  FaPercentage,
} from "react-icons/fa";
import { GiArmoredBoomerang } from "react-icons/gi";
import type { CardReportType } from "../../type.interface";
import type React from "react";
interface otherInfo {
  titleone?: string;
  titleTwo?: string;
}
export const CardReport: React.FC<CardReportType & otherInfo> = ({
//   mostSoldProductRetail,
//   mostSoldProductWholesales,
//   leastSoldProduct,
//   leastSoldProductRetails,
  titleTwo,
  titleone,
}) => {
  return (
    <div className="card-container">
      <div className="card-title">
        <FaChartLine className="card-icon" />
        <p className="fast-low">{titleone}</p>
      </div>
      <div className="product-class">
        <ul>
          <li className="prd-cls">
            <FaBoxes className="list-icon" />
            Whole sales
          </li>
          <li className="prd-cls">
            <FaShoppingCart className="list-icon" />
            Retails-sales
          </li>
        </ul>
      </div>
      <div className="percentage-remain">
        <p className="card-title">
          <FaPercentage className="card-icon" />
          {titleTwo}
        </p>
        <div className="product-class">
          <ul>
            <li className="prd-cls">Quantity sold for Retail</li>
            <li className="prd-cls">Quantity Sold for Wholesales</li>
          </ul>
        </div>
      </div>
      <div className="show-more">
        <div className="show-morebg">
          <GiArmoredBoomerang color="black" size={30} />
        </div>
      </div>
    </div>
  );
};
