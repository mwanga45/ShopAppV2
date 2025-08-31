import { color } from "chart.js/helpers";
import "./daysales.css"
import { SiMoneygram } from "react-icons/si";



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
            {salesData.map((item, index) => (
              <tr key={item.id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <td className="product-name">{item.productName}</td>
                <td className="product-id">{item.id}</td>
                <td className="product-category">{item.category}</td>
                <td className="product-type">{item.type}</td>
                <td className="product-pc">{item.pc}</td>
                <td className="total-generate">{item.totalGenerate} Tsh</td>
                <td className="profit-generated">{item.profitGenerated} Tsh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}