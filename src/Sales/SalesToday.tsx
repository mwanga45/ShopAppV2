import "./sales.css"
import { Accountbar } from "../component/account/Account"
import { Search } from "../component/search/Search"
import { DayResult } from "../component/daysales/Daysales"

export default function SalesToday() {
  return (
    <div className="Wh-Rtsales-container">
       <div className="salesbar">
           <Accountbar/>
       </div>
       <div className="sales-title">
        <p className="title">Product sales Today</p>
       </div>
       <div className="trigger-container">
        <div className="trigger-btn">
            <button type="submit" name="Whole-sales">Whole-sales</button>
            <button type="submit" name="Retail-ssales">Retail-sales</button>
        </div>
        <div>
           <Search/>
        </div>
       </div>
       <div className="whole-retail-analysis">
           <DayResult title_name="Total sale" total_value="230000"/>
           <DayResult title_name="Total generate" total_value="23000"/>
       </div>

    </div>
  )
}
