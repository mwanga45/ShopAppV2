import { Routes, Route } from 'react-router-dom'
import Login from './auth/login'
import Layout from './Layout'
import './App.css'
import { Dashboard } from './Dashbord/dashbord'
import SalesToday from "./Sales/SalesToday"
import Stock from './stock/Stock'
import Overview from './overview/Overview'
function App() {
  return (
   <div>
        <Routes>
          <Route path='/' element = {<Login/>} />
           <Route element={<Layout/>}>
            <Route path='/dashboard'element= {<Dashboard/>}></Route>
            <Route path='/sales' element ={<SalesToday/>}></Route>
            <Route path='/stock' element = {<Stock/>}></Route>
            <Route path='/overview' element={<Overview/>}></Route>
            </Route>
        </Routes>
   </div> 
  )
}

export default App
