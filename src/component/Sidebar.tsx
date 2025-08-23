import "./sidebar.css"
import { LuLayoutDashboard } from "react-icons/lu";
import { LuPackageOpen } from "react-icons/lu";
import { FaAppleWhole } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { SiShopware } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
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
        <p>< LuPackageOpen size={20}fontWeight={50} />Stock-details</p>
       </li>
       <li className="nav-name">
        <p><FaAppleWhole size={20} fontWeight={50} />Whole-sales</p>
       </li>
       <li className="nav-name">
        <p>< FaApple size={20} fontWeight={50}/>Retails-sales</p>
       </li>
       <li className="nav-name">
        <p><IoSettingsOutline fontWeight={50} size={20}/>Setting</p>
       </li>
      </ul>
    </div>
    </div>
  )
}