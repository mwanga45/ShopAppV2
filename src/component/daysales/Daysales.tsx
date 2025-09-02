import { color } from "chart.js/helpers";
import "./daysales.css"
import { SiMoneygram } from "react-icons/si";
import { useState, useEffect } from 'react';
import { fetchWholeSales } from '../../Sales/service/sales.api';

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

type Result ={
  title_name:string
  total_value:string
  color:any
}

// Sample data for the table
const salesData = [
  {
    id: "001",
    productName: "Palet Starter",
    category: "Electronics",
    type: "Premium",
    pc: 15,
    totalGenerate: "2,300,000",
    profitGenerated: "450,000"
  },
  {
    id: "002", 
    productName: "Basic Palet",
    category: "Electronics",
    type: "Standard",
    pc: 8,
    totalGenerate: "1,800,000",
    profitGenerated: "320,000"
  },
  {
    id: "003",
    productName: "Premium Palet",
    category: "Electronics", 
    type: "Premium",
    pc: 12,
    totalGenerate: "3,200,000",
    profitGenerated: "680,000"
  },
  {
    id: "004",
    productName: "Enterprise Palet",
    category: "Electronics",
    type: "Enterprise", 
    pc: 5,
    totalGenerate: "4,500,000",
    profitGenerated: "1,200,000"
  }
];

export const Daysales = ()=>{
    return(
      <div className="sales-container">
        <p className="head">Today Sales</p>
        <p className="Amount"> <SiMoneygram color="black" size={20}/>2300000 Tsh</p>
      </div>
    ) 
}

export const DayResult = ({title_name, total_value}:Result)=>{
  return(
    <div className="dayresult-contaier" style={{background:`${color}`}}>
      <div>
        <p className="dayanalys">{title_name}</p>
      </div>
      <div>
        <p className="total_value"><SiMoneygram/>{total_value}.Tsh</p>
      </div>

    </div>
  )
}

export const Daysale_list = () =>{
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSales = async () => {
      try {
        const data = await fetchWholeSales();
        setSales(data);
      } catch (err) {
        setError("Failed to fetch sales data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  if (loading) {
    return <div className="daylist-container">Loading sales data...</div>;
  }

  if (error) {
    return <div className="daylist-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return(
    <div className="daylist-container">
      <div className="filter-list-container">
        <div className="filterby"><p>All</p></div>
        <div className="filterby"><p>Category</p></div>
        <div className="filterby"><p>Type</p></div>
      </div>
      
      <div className="table-container">
        <table className="sales-table">
          <thead>
            <tr className="table-header">
              <th>Product Name</th>
              <th>ID</th>
              <th>Category</th>
              <th>Type</th>
              <th>PC</th>
              <th>Total Generate</th>
              <th>Profit Generated</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((item, index) => (
              <tr key={item.id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <td className="product-name">{item.product.product_name}</td>
                <td className="product-id">{item.productId}</td>
                <td className="product-category">{item.product.product_category}</td>
                <td className="product-type">{item.product.product_type}</td>
                <td className="product-pc">{item.Total_pc_pkg_litre}</td>
                <td className="total-generate">{item.TotalGenerated} Tsh</td>
                <td className="profit-generated">{item.TotalProfit} Tsh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}