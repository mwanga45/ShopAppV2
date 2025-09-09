import { Routes, Route } from 'react-router-dom'
import Login from './auth/login'
import Layout from './Layout'
import './App.css'
import { Dashboard } from './Dashbord/dashbord'
import SalesToday from "./Sales/SalesToday"
import Stock from './stock/Stock'
import Overview from './overview/Overview'
// import { AnimatePresence } from "framer-motion";
function App() {
  // const location = useLocation();
  return (
   <div>
        {/* <AnimatePresence mode="wait"> */}
        <Routes /* location={location} key={location.pathname} */>
          <Route path='/' element = {<Login/>} />
           <Route element={<Layout/>}>
            <Route path='/dashboard'element= {<Dashboard/>}></Route>
            <Route path='/sales' element ={<SalesToday/>}></Route>
            <Route path='/stock' element = {<Stock/>}></Route>
            <Route path='/overview' element={<Overview/>}></Route>
            </Route>
        </Routes>
        {/* </AnimatePresence> */}
   </div> 
  )
}

export default App
