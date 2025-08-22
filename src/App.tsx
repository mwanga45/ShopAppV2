import { Routes, Route } from 'react-router-dom'
import Login from './auth/login'
import Layout from './layout'
import './App.css'

function App() {
  return (
   <div>
        <Routes>
          <Route path='/' element = {<Login/>} />
           <Route element={<Layout/>}/>
        </Routes>
   </div> 
  )
}

export default App
