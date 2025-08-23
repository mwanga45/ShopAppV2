import "./sidebar.css"
import { LuLayoutDashboard } from "react-icons/lu";
import { SiShopware } from "react-icons/si";
export const Sidebar = ()=>{
  return(
    <div className="nav-container">
    <div className="logo-container">
      <h2>ShoappV2 <SiShopware size={30}color="green"/> </h2>
    </div>
    <div className="navlist-container">
      <ul>
       <li className="nav-name">
        <p><LuLayoutDashboard size={20}fontWeight={50}/> Dashboard</p> 
       </li>
       <li className="nav-name">
        <p>Stock</p>
       </li>
       <li className="nav-name">
        <p>Whole-sales</p>
       </li>
       <li className="nav-name">
        <p>Retails-sales</p>
       </li>
       <li className="nav-name">
        <p>Setting</p>
       </li>
      </ul>
    </div>
    </div>
  )
}