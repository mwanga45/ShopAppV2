import { color } from "chart.js/helpers";
import "./daysales.css";
import { SiMoneygram } from "react-icons/si";
import React, { useState, useEffect } from "react";
import type {SalesSummaryDatasales } from "../../type.interface";

interface ProductInfo {
  id: string;
  product_name: string;
  product_category: string;
  product_type: string;
  purchase_price: string;
  wholesales_price: string;
}

interface SaleItem {
  id: string;
  Total_pc_pkg_litre: string;
  TotalGenerated: string;
  TotalProfit: string;
  productId: string;
  product: ProductInfo;
}

type Result = {
  title_name: string;
  total_value: string;
  color: any;
};

// Sample data for the table
const salesData: SaleItem[] = [
  {
    id: "sale_001",
    Total_pc_pkg_litre: "15",
    TotalGenerated: "2300000",
    TotalProfit: "450000",
    productId: "prod_001",
    product: {
      id: "prod_001",
      product_name: "Palet Starter",
      product_category: "Electronics",
      product_type: "Premium",
      purchase_price: "1850000",
      wholesales_price: "2300000",
    },
  },
  {
    id: "sale_002",
    Total_pc_pkg_litre: "8",
    TotalGenerated: "1800000",
    TotalProfit: "320000",
    productId: "prod_002",
    product: {
      id: "prod_002",
      product_name: "Basic Palet",
      product_category: "Electronics",
      product_type: "Standard",
      purchase_price: "1480000",
      wholesales_price: "1800000",
    },
  },
  {
    id: "sale_003",
    Total_pc_pkg_litre: "12",
    TotalGenerated: "3200000",
    TotalProfit: "680000",
    productId: "prod_003",
    product: {
      id: "prod_003",
      product_name: "Premium Palet",
      product_category: "Electronics",
      product_type: "Premium",
      purchase_price: "2520000",
      wholesales_price: "3200000",
    },
  },
  {
    id: "sale_004",
    Total_pc_pkg_litre: "5",
    TotalGenerated: "4500000",
    TotalProfit: "1200000",
    productId: "prod_004",
    product: {
      id: "prod_004",
      product_name: "Enterprise Palet",
      product_category: "Electronics",
      product_type: "Enterprise",
      purchase_price: "3300000",
      wholesales_price: "4500000",
    },
  },
];

export const Daysales = () => {
  return (
    <div className="sales-container">
      <p className="head">Day Revenue</p>
      <p className="Amount">
        {" "}
        <SiMoneygram color="black" size={20} />
        2300000 Tsh
      </p>
    </div>
  );
};

export const DayResult = ({ title_name, total_value }: Result) => {
  return (
    <div className="dayresult-contaier" style={{ background: `${color}` }}>
      <div>
        <p className="dayanalys">{title_name}</p>
      </div>
      <div>
        <p className="total_value">
          <SiMoneygram />
          {total_value}.Tsh
        </p>
      </div>
    </div>
  );
};

export const Daysale_list: React.FC<SalesSummaryDatasales> = ({
  Allcombined,
  Normalsalesretailreturn,
  Normalsaleswholereturn,

}) => {
  const [sales, setSales] = useState<SaleItem[]>(salesData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setcategory] = useState('All')

  useEffect(() => {}, []);

  if (loading) {
    return <div className="daylist-container">Loading sales data...</div>;
  }

  if (error) {
    return (
      <div className="daylist-container" style={{ color: "red" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="daylist-container">
      <div className="filter-list-container">
        <div className="filterby">
          <p>All</p>
        </div>
        <div className="filterby">
          <p>Category</p>
        </div>
        <div className="filterby">
          <p>Type</p>
        </div>
      </div>

      <div className="table-container">
        <table className="sales-table">
          <thead>
            <tr className="table-header">
              <th>Product Name</th>
              <th>ID</th>
              <th>Category</th>
              <th>Revenue</th>
              <th>Total profit</th>
              <th>PC</th>
              <th>Seller</th>
            </tr>
          </thead>
          <tbody>
            {category === "All" ? (
              Allcombined && Allcombined.length > 0 ? (
                Allcombined.map((item, index) => (
                  <tr
                    key={item.product_id}
                    className={`table-row ${index % 2 === 0 ? "even" : "odd"}`}
                  >
                    <td className="product-name">{item.product_name}</td>
                    <td className="product-id">{item.product_id}</td>
                    <td className="product-category">
                      {item.product_category}
                    </td>
                    <td className="product-type">{item.total_revenue}.Tsh</td>
                    <td className="product-pc">{item.total_profit}.Tsh</td>
                    <td className="total-generate">
                      {item.total_quantity} Tsh
                    </td>
                    <td className="profit-generated">{item.seller}</td>
                  </tr>
                ))
              ) : (
                <tr className="table-row">
                  <td colSpan={7}>No Any Sales Today</td>
                </tr>
              )
            ) : category === "retailsales" ? (
              Normalsalesretailreturn && Normalsalesretailreturn.length > 0 ? (
                Normalsalesretailreturn.map((item, index) => (
                  <tr
                    key={item.product_id}
                    className={`table-row ${index % 2 === 0 ? "even" : "odd"}`}
                  >
                    <td className="product-name">{item.product_name}</td>
                    <td className="product-id">{item.product_id}</td>
                    <td className="product-category">
                      {item.product_category}
                    </td>
                    <td className="product-type">{item.total_revenue}.Tsh</td>
                    <td className="product-pc">{item.total_profit}.Tsh</td>
                    <td className="total-generate">
                      {item.total_quantity} Tsh
                    </td>
                    <td className="profit-generated">{item.seller}</td>
                  </tr>
                ))
              ) : (
                <tr className="table-row">
                  <td colSpan={7}>No any Retail Sales Today</td>
                </tr>
              )
            ) : category === "wholesales" ? (
              Normalsaleswholereturn && Normalsaleswholereturn.length > 0 ? (
                Normalsaleswholereturn.map((item, index) => (
                  <tr
                    key={item.product_id}
                    className={`table-row ${index % 2 === 0 ? "even" : "odd"}`}
                  >
                    <td className="product-name">{item.product_name}</td>
                    <td className="product-id">{item.product_id}</td>
                    <td className="product-category">
                      {item.product_category}
                    </td>
                    <td className="product-type">{item.total_revenue}.Tsh</td>
                    <td className="product-pc">{item.total_profit}.Tsh</td>
                    <td className="total-generate">
                      {item.total_quantity} 
                    </td>
                    <td className="profit-generated">{item.seller}</td>
                  </tr>
                ))
              ) : (
                <tr className="table-row">
                  <td colSpan={7}>No any Wholesale Sales Today</td>
                </tr>
              )
            ) : (
              <tr className="table-row">
                <td colSpan={7}>Invalid Category Selected</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
