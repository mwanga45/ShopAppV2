import "./sidebar.css"
import { LuLayoutDashboard } from "react-icons/lu";
import { SiShopware } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { FaShoppingCart} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Sidebar = ()=>{
  const Navigate = useNavigate()
  return(
    <div className="nav-container">
    <div className="logo-container">
      <h2>ShoappV2 <SiShopware size={30}color="green"/> </h2>
    </div>
    <div className="navlist-container">
      <ul>
       <li className="nav-name" onClick={()=> {Navigate('/dashboard')}}>
        <p><LuLayoutDashboard size={20}fontWeight={50}/> Dashboard</p> 
       </li>
       <li className="nav-name" onClick={() => {Navigate("/admin-panel")}}>
        <p>< MdAdminPanelSettings size={20}fontWeight={50} />Admin-Activity</p>
       </li>
       <li className="nav-name" onClick={()=> {Navigate("/overview")}}>
        <p><GrOverview  size={20} fontWeight={50} />Overview</p>
       </li>
       <li className="nav-name" onClick={()=> {Navigate("/sales")}}>
        <p>< FaShoppingCart size={20} fontWeight={50}/>Today-Sales</p>
       </li>
       <li className="nav-name" onClick={()=> {Navigate('/stock')}}>
        <p><IoSettingsOutline fontWeight={50} size={20} />Stock</p>t
       </li>
      </ul>
    </div>
    </div>
  )
}