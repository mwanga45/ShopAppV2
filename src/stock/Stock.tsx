import { Accountbar } from "../component/account/Account"
import { CiSearch } from "react-icons/ci";
import "./stock.css"
import {Stockcard} from "../component/stock-card/stockcard";
import StockSheet from "../component/stock-card/stocksheet"
import { RiCloseFill } from "react-icons/ri";
import { useState } from "react";
export default function Stock() {
  const [Showupdate, setShowupdate] = useState<boolean>(false)
  const handleShowUpdateForm:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.preventDefault()
    setShowupdate(!Showupdate)
  }
  return (
    <div className="stock-main-conatiner animated-enter">
           <div className="account">
               <Accountbar/>
            </div>   
        <div className="Sock-header">
          <h1 className="stpage-title">Stock  Analysis page</h1>
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
            <Stockcard onclick={handleShowUpdateForm}/>
            <Stockcard onclick={handleShowUpdateForm}/>
            <Stockcard onclick={handleShowUpdateForm}/>
            <Stockcard onclick={handleShowUpdateForm}/>
            <Stockcard onclick={handleShowUpdateForm}/>
            <Stockcard onclick={handleShowUpdateForm}/>
            <Stockcard onclick={handleShowUpdateForm}/>s
          </div> {Showupdate &&
                             <div className="pop-background">
                              <div className="close-poup-container">
                                  <div className="icon-close" onClick={()=>setShowupdate(!Showupdate)}>
                                  <RiCloseFill  size={30}/>
                                  </div>
                              </div>
                              <div className="content-container-component">
                                <StockSheet/>
                              </div>
                          </div>

          }

       </div>
    </div>
  )
}
