import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { ScrollTop } from '../features/constants/ScrollTop'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../features/authentication/authApi'
const Layout = () => {
  const dispatch = useDispatch();
  
 useEffect(() => {
  dispatch(checkAuth())
},[dispatch])
  return (
    <div className='bg-[#110d21] h-[100vh]'>

      <Navbar/>
      <Outlet/>
      
    </div>
  )
}

export default Layout
