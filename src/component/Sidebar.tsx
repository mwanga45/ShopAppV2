import "./sidebar.css"
import { LuLayoutDashboard } from "react-icons/lu";
import { SiShopware } from "react-icons/si";
import { MdInventory } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { FaShoppingCart} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation

export const Sidebar = ()=>{
  const Navigate = useNavigate()
  const location = useLocation(); // Get current location

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return(
    <div className="nav-container">
    <div className="logo-container">
      <h2>ShoappV2 <SiShopware size={30}color="green"/> </h2>
    </div>
    <div className="navlist-container">
      <ul>
       <li 
         className={`nav-name ${isLinkActive('/dashboard') ? 'active-nav-link' : ''}`}
         onClick={()=> {Navigate('/dashboard')}}
       >
        <p><LuLayoutDashboard size={20}fontWeight={50}/> Dashboard</p> 
       </li>
       <li 
         className={`nav-name ${isLinkActive('/admin-panel') ? 'active-nav-link' : ''}`}
         onClick={() => {Navigate("/admin-panel")}}
       >
        <p>< MdAdminPanelSettings size={20}fontWeight={50} />Admin-Activity</p>
       </li>
       <li 
         className={`nav-name ${isLinkActive('/overview') ? 'active-nav-link' : ''}`}
         onClick={()=> {Navigate("/overview")}}>
        <p><GrOverview  size={20} fontWeight={50} />Overview</p>
       </li>
       <li 
         className={`nav-name ${isLinkActive('/sales') ? 'active-nav-link' : ''}`}
         onClick={()=> {Navigate("/sales")}}>
        <p>< FaShoppingCart size={20} fontWeight={50}/>Today-Sales</p>
       </li>
       <li 
         className={`nav-name ${isLinkActive('/stock') ? 'active-nav-link' : ''}`}
         onClick={()=> {Navigate('/stock')}}>
        <p><MdInventory  fontWeight={50} size={20} />Stock</p>
       </li>
      </ul>
    </div>
    </div>
  )
}