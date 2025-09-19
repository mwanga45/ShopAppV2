import "./sales.css"
import { Accountbar } from "../component/account/Account"
import { Search } from "../component/search/Search"
import { DayResult } from "../component/daysales/Daysales"
import { Daysale_list } from "../component/daysales/Daysales"
import Form from "../component/Form-comp/Form"
import { useState } from "react"

export default function SalesToday() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  
  const handleOpenForm = () => {
    setIsFormOpen(true)
  }
  
  const handleCloseForm = () => {
    setIsFormOpen(false)
  }
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
            <Daysale_list/>
         </div>
        {isFormOpen && (
          <div className="form-popup">
            <Form onClose={handleCloseForm} isOpen={isFormOpen} />
          </div>
        )}
    </div>
  )
}
