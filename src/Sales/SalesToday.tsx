import "./sales.css"
import { Accountbar } from "../component/account/Account"
import { Search } from "../component/search/Search"

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
        
       </div>

    </div>
  )
}
