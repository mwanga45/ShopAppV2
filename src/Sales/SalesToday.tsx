import "./sales.css"
import { Accountbar } from "../component/account/Account"
import { Search } from "../component/search/Search"
import { DayResult } from "../component/daysales/Daysales"
import { Daysale_list } from "../component/daysales/Daysales"
import { SalesRecForm } from "../component/Form-comp/Form"
import { useEffect, useState } from "react"
import { fetchProductsales, fetchNormalsellrecord } from "./service/sales.api"
import type { SalesRecord, SalesSummaryResponse } from '../type.interface'
import type { wProduct } from "../type.interface"
import type { rProduct } from "../type.interface"
import { ResultComp } from "../component/result/Resultcomp"


export default function SalesToday() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [Allrecord , setAllrecord] = useState<SalesSummaryResponse>()
  const [Allsales, setAllsales] = useState<SalesRecord[]>([])
  const [wholesalerecord, setwholesalesrecord] = useState<SalesRecord[]>([])
  const [retailsalesrecord, setretailsalesrecord] = useState<SalesRecord[]>([])
  const [wholesaleprod, setWholesaleprod] = useState<wProduct[]>([])
  const [retailsalesprod, setretailsaleprod] = useState<rProduct[]>([])
  
  const handleOpenForm = () => {
    setIsFormOpen(true)
  }
  const handleproductInfo = async()=>{
    try{
      const response =  await fetchProductsales()
      if(!response.data.success){
       alert(response.data.message)
       return
      }
      setretailsaleprod(response.data.data.retailsale)
      setWholesaleprod(response.data.data.wholesale)
      
    }catch(err){
      console.error(err)
      alert(err)
    }
  }
  
  const handleCloseForm = () => {
    setIsFormOpen(false)
  }
  useEffect(()=>{
   const handlereturnsalesdata = async()=>{
    const response  = await fetchNormalsellrecord()
    setAllrecord(response.data)
    setAllsales(response.data.data.Allcombined)
    setwholesalesrecord(response.data.data.Normalsaleswholereturn)
    setretailsalesrecord(response.data.data.Normalsalesretailreturn)
   }
   handleproductInfo()
   handlereturnsalesdata()
  },[])
  return (
    <div className="Wh-Rtsales-container">
         <div className="salesbar">
           <Accountbar/>
       </div>
       <div className="sales-header">
        <h1 className="page-title">Product Sales Today</h1>
       </div>
       <div className="trigger-container">
        <div className="trigger-btn">
            <button type="submit" name="Whole-sales" onClick={handleOpenForm}>Whole-sales</button>
            <button type="submit" name="Retail-ssales">Retail-sales</button>
        </div>
        <div>
           <Search/>
        </div>
       </div>
       <div className="whole-retail-analysis">
           <DayResult title_name="Total sale" total_value="230000" color={"rgb(29, 137, 23);"}/>
           <DayResult title_name="Total generate" total_value="23000" color={"rgb(29, 137, 23);"}/>
       </div>
         <div className="resultTb-container">
            <Daysale_list Allcombined={Allsales} Normalsalesretailreturn={retailsalesrecord} Normalsaleswholereturn={wholesalerecord} />
         </div>
              <ResultComp
                  Total_pc_pkg_litre={0}
                  Revenue={0}
                  Net_profit={0}
                  Expected_Profit={0}
                  profit_deviation={""}
                  percentage_deviation={""}
                  percentage_discount={""}
                  paymentstatus={""}
                  product={{
                    product_name: "",
                  }}
                />
        {isFormOpen && (
          <SalesRecForm 
            wholesales={wholesaleprod} 
            retailsales={retailsalesprod} 
            onClose={handleCloseForm}
          />
        )}
    </div>
  )
}
