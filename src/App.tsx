import { Routes, Route } from 'react-router-dom'
import Login from './auth/login'
import Layout from './Layout'
import './App.css'
import { Dashboard } from './Dashbord/dashbord'

function App() {
  return (
   <div>
        <Routes>
          <Route path='/' element = {<Login/>} />
           <Route element={<Layout/>}>
            <Route path='/dashboard'element= {<Dashboard/>}></Route>
            </Route>
        </Routes>
   </div> 
  )
}

export default App
