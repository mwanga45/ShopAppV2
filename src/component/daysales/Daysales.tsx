import { color } from "chart.js/helpers";
import "./daysales.css";
import { SiMoneygram } from "react-icons/si";
import React, { useState, useEffect } from "react";
import type { Result,SalesSummaryDatasales } from "../../type.interface";





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
    <div className="dayresult-contaier" style={{ background: `${color}`, minWidth:'200px' }}>
      <div>
        <p className="dayanalys">{title_name}</p>
      </div>
      <div>
        <p className="total_value">
          <SiMoneygram />
          {total_value.toLocaleString()}.Tsh
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
  const [loading, _] = useState<boolean>(false);
  const [error, ] = useState<string | null>(null);
  const [category, setcategory] = useState<string>('All');
  const [isswicheropen, setswicheropen] = useState<boolean>(false);


  useEffect(() => {
    const savedCategory =  localStorage.getItem('category')
    if(savedCategory){
      setcategory(savedCategory)
    }
  }, []);
  const handleopen = ()=>{
    setswicheropen(!isswicheropen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newcategory = e.target.value;
    setcategory(newcategory);
    localStorage.setItem('category', newcategory)
    setswicheropen(!isswicheropen)
    
  };
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
        <div className="filterby" onClick={()=> setcategory('All')}>
          <p>All</p>
        </div>
        <div className="filterby"  onClick={handleopen}>
          <p >Category</p>
        </div>
        <div className="select-input-category-choose">
          {isswicheropen && (
            <select
              name="category"
              value={category}
              onChange={handleChange}
            >
              <option value="wholesales">wholesales</option>
              <option value="retailsales">retailsales</option>
            </select>
          )}
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
                    <td className="product-type">
                      {Number(item.total_revenue).toLocaleString()}.Tsh
                    </td>
                    <td className="total-generate">
                      {Number(item.total_profit).toLocaleString()}.Tsh
                    </td>
                    <td className="product-pc">{item.total_quantity}</td>
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
                    <td className="product-type">
                      {Number(item.total_revenue).toLocaleString()}.Tsh
                    </td>
                    <td className="total-generate">
                      {Number(item.total_profit).toLocaleString()}.Tsh
                    </td>
                    <td className="product-pc">{item.total_quantity}</td>
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
                    <td className="product-type">
                      {Number(item.total_revenue).toLocaleString()}.Tsh
                    </td>
                    <td className="total-generate">
                      {Number(item.total_profit).toLocaleString()}.Tsh
                    </td>
                    <td className="product-pc">{item.total_quantity}</td>
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
