import "./dash.css"
import { Search } from "../component/search/Search"
export const Dashboard = () =>{
    return(
      <div className="dash-container">
        <div className="account-part">
          <div>
            <Search/>
          </div>
        </div>
      
      </div>
    )
} 