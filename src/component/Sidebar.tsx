import "./sidebar.css"
import React, { useState } from "react"
import { LuLayoutDashboard } from "react-icons/lu";
import { SiShopware } from "react-icons/si";
import { MdInventory } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { FaShoppingCart} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; 
import { FaUserShield } from "react-icons/fa6";

export const Sidebar:React.FC = ()=>{
  const Navigate = useNavigate()
  const location = useLocation(); 
  const [isOpen,setIsOpen] = useState<boolean>(true)
  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return(
    <div className={`nav-container ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="logo-container">
        <h2 className="brand-text">
          <span className="brand">ShoappV2</span> <SiShopware size={30} color="green"/>
        </h2>
        <button className="sidebar-toggle" onClick={()=> setIsOpen(prev=> !prev)} aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}>
          <span className="toggle-bar"/>
          <span className="toggle-bar"/>
          <span className="toggle-bar"/>
        </button>
      </div>
      <div className="navlist-container">
        <ul>
          <li 
            className={`nav-name ${isLinkActive('/dashboard') ? 'active-nav-link' : ''}`}
            onClick={()=> {Navigate('/dashboard')}}
            title="Dashboard"
          >
            <p>
              <LuLayoutDashboard size={20} fontWeight={50}/>
              <span className="link-label">Dashboard</span>
            </p>
          </li>
          <li 
            className={`nav-name ${isLinkActive('/admin-panel') ? 'active-nav-link' : ''}`}
            onClick={() => {Navigate("/admin-panel")}}
            title="Admin Activity"
          >
            <p>
              <MdAdminPanelSettings size={20} fontWeight={50} />
              <span className="link-label">Admin-Activity</span>
            </p>
          </li>
          <li 
            className={`nav-name ${isLinkActive('/overview') ? 'active-nav-link' : ''}`}
            onClick={()=> {Navigate("/overview")}}
            title="Overview"
          >
            <p>
              <GrOverview size={20} fontWeight={50} />
              <span className="link-label">Overview</span>
            </p>
          </li>
          <li 
            className={`nav-name ${isLinkActive('/sales') ? 'active-nav-link' : ''}`}
            onClick={()=> {Navigate("/sales")}}
            title="Today Sales"
          >
            <p>
              <FaShoppingCart size={20} fontWeight={50}/>
              <span className="link-label">Today-Sales</span>
            </p>
          </li>
          <li 
            className={`nav-name ${isLinkActive('/stock') ? 'active-nav-link' : ''}`}
            onClick={()=> {Navigate('/stock')}}
            title="Stock"
          >
            <p>
              <MdInventory fontWeight={50} size={20} />
              <span className="link-label">Stock</span>
            </p>
          </li>
        </ul>
      </div>
      <div className="nav-Account-container">
          <div>
            <div><FaUserShield color="blue"/></div>
            <div><span>issa mwanga</span><span>email,com</span></div>
          </div>
      </div>
    </div>
  )
}