import { Accountbar } from "../component/account/Account"
import { CiSearch } from "react-icons/ci";
import "./stock.css"
import Stockcard from "../component/stock-card/stockcard";
export default function Stock() {
  return (
    <div className="stock-main-conatiner">
           <div className="account">
               <Accountbar/>
            </div>   
        <div className="sales-header">
          <h1 className="page-title">Stock  Analysis page</h1>
       </div>
       <div className="stock-content-main">
        <p className="filter-title">Filter by</p>
       <div className="filter-container">
          <div className="filter-by-category">
            <button name="">All</button>
             <button name="">Type</button>
            <button name="">Category</button>
          </div>
          <div className="filter-by-name">
             < CiSearch/>
            <input type="text" name="search" placeholder="seach by name" />
          </div>
        </div>
           <div className="card-stock-list">
            <Stockcard/>
            <Stockcard/>
            <Stockcard/>
            <Stockcard/>
             <Stockcard/>
              <Stockcard/>
               <Stockcard/>
          </div>        
       </div>
    </div>
  )
}
