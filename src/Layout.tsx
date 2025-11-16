import { Outlet } from "react-router-dom"
import { Sidebar } from "./component/Sidebar"
import { CheckCapitalInfo } from "./layout"
import CapitalForm from "./component/TranscactionComponet/capital_management"
import "./layout.css"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

export default function Layout() {
  const [ShowCapitalform, setShowCapitalform] = useState<boolean>(false)
  useEffect(()=>{
  const handleCapitalmanagement = async()=>{
    const response = await CheckCapitalInfo()
    if(!response.data.success){
      setShowCapitalform(true)
      toast.success(response.data.message)
      return
    }
    console.log(response.data.success)
    setShowCapitalform(true)
  }
  
  
  handleCapitalmanagement()
},[])
  return (
    <div className="layout-container">
      <ToastContainer/>
      <div className="sidebar-fixed">
        <Sidebar/>
      </div>
      <main className="main-content">
        {
        ShowCapitalform === false ?
        <CapitalForm/>: <Outlet/>
}
      </main>
    </div>
  )
}