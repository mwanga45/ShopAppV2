import { Accountbar } from "../component/account/Account"
import { CiSearch } from "react-icons/ci";
import "./stock.css"
import {Stockcard} from "../component/stock-card/stockcard";
import {Stocksheet} from "../component/stock-card/stocksheet"
import { RiCloseFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { StockCardResult } from "./stockservice";

  export interface Stockprops {
      product_id: number,
      product_name: string,
      user_id: number,
      fullname: string,
      last_add_stock: number,
      last_stock: number,
      UpdateAt: string,
      percentageRemain: number
      product_category: string
      //  requestFn?: () => void;
}
export default function Stock() {
  const [Showupdate, setShowupdate] = useState<boolean>(false)
  const [Carddata, setCarddata] =  useState<Stockprops[]>([])
  const [selectedStock, setSelectedStock] = useState<Stockprops | null>(null)
  const handleShowUpdateForm:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.preventDefault()
    setShowupdate(!Showupdate)
  }
  useEffect(()=>{
    const handlecardData = async()=>{
    try{
    const response = await StockCardResult()
    if (!response.data.success){
      alert(response.data.message)
    }
    setCarddata(response.data.data)
   }catch(err){
    console.error("Something went")
    alert("Something went wrong")
   }
    }
    handlecardData()
  },[])
  function handlecardData(): (() => void) | undefined {
    throw new Error("Function not implemented.");
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
        {Carddata ? (
  <div className="card-stock-list">
    {Carddata.map((s) => (
      <Stockcard
        key={s.product_id}
        onclick={(e)=>{ handleShowUpdateForm(e); setSelectedStock(s); }}
        product_id={s.product_id}
        product_name={s.product_name}
        UpdateAt={s.UpdateAt}
        last_add_stock={s.last_add_stock}
        last_stock={s.last_stock}
        fullname={s.fullname}
        user_id={s.user_id}
        percentageRemain={s.percentageRemain || 0}  product_category={s.product_category }  />
    ))}
  </div>
) : (
  <div className="card-stock-list">
    <p>Please No stock info is available</p>
  </div>
)}
          {Showupdate && selectedStock &&
                             <div className="pop-background">
                              <div className="close-poup-container">
                                  <div className="icon-close" onClick={()=>setShowupdate(!Showupdate)}>
                                  <RiCloseFill  size={30}/>
                                  </div>
                              </div>
                              <div className="content-container-component">
                                <Stocksheet {...selectedStock}/>
                              </div>
                          </div>

          }

       </div>
    </div>
  )
}
