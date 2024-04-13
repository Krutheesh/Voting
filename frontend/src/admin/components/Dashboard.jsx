import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'
import Navbar from '../../components/Navbar'
import { useDispatch,useSelector } from 'react-redux'
import { checkAuth } from '../../features/authentication/authApi'
import Navbar2 from './Navbar2'

const Dashboard = () => {
  const dispatch = useDispatch();
  const {isSidebarOpen} = useSelector(store =>store.auth)
//  useEffect(() => {
//   dispatch(checkAuth())
// },[dispatch])
  return (
    <div className='bg-[#110d21] h-[100vh]'>
      
     
<Navbar2/>
     
      <div className='flex justify-between  '>
        <div className='hidden md:block  md:w-[25%] lg:w-[20%]  '>
<Sidebar/>
        </div>
        <div className='block md:hidden absolute w-[65%]  '>
    {
      
      isSidebarOpen&&<Sidebar/>}
        </div>
        <div className='w-[100%] md:w-[85%] md:p-10 p-2 '>

          <div className=' p-5'>
              <Outlet/>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard
