import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/User/Home'
import UserRoutes from './Routes/UserRoutes/UserRoute'

import './index.css'

import AdminRoutes from './Routes/AdminRoutes/adminRoute'


function App() {

  return (
    <Routes>
      <Route path='/*' element={<UserRoutes/>}/>
      <Route path='/admin/*' element={<AdminRoutes/>}/>
    </Routes>
  )
}

export default App
