import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'
import Navbar from '../../components/Navbar'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../../features/authentication/authApi'
const Dashboard = () => {
  const dispatch = useDispatch();
  
//  useEffect(() => {
//   dispatch(checkAuth())
// },[dispatch])
  return (
    <div className='bg-[#110d21]'>
      <Navbar/>
      <div className='flex justify-between  '>
        <div className='w-[30%] md:w-[15%]'>
<Sidebar/>
        </div>
        <div className='w-[70%] md:w-[85%] p-10  '>

          <div className=' p-5'>
              <Outlet/>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard
