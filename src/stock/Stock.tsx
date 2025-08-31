import { Accountbar } from "../component/account/Account"
import "./stock.css"
export default function Stock() {
  return (
    <div className="stock-main-conatiner">
           <div className="account">
               <Accountbar/>
            </div>   
        <div className="sales-header">
          <h1 className="page-title">Stock  Analysis page</h1>
       </div>
    </div>
  )
}
