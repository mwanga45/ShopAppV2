import { Outlet } from "react-router-dom"
import { Sidebar } from "./component/Sidebar"
import "./layout.css"

export default function Layout() {
  return (
    <div className="layout-container">
      <div className="sidebar-fixed">
        <Sidebar/>
      </div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}