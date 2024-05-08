import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'
import Navbar from '../../components/Navbar'
import { useDispatch,useSelector } from 'react-redux'
import { checkAuth, getAllUsers } from '../../features/authentication/authApi'
import Navbar2 from './Navbar2'

const Dashboard = () => {
  const dispatch = useDispatch();
  const {isSidebarOpen} = useSelector(store =>store.auth)
//  useEffect(() => {
//   dispatch(checkAuth())
// },[dispatch])
useEffect(() => {
  dispatch(getAllUsers())
  // dispatch(checkAuth())
  console.log("hello")
 },[dispatch])
  return (
    <div className='bg-[#110d21] '>
      
     <div className='md:fixed w-full'>
     <Navbar2/>
     </div>
      <div className='hidden md:block md:w-full md:h-[15vh]'>
      
      </div>
     
      <div className='flex justify-between  '>
        <div className='hidden md:block md:fixed md:w-[25%] md:top-[4rem] md:bg-gray-700 lg:w-[20%]  '>
<Sidebar/>
        </div>
        <div className='hidden md:block md:w-[25%] md:bg-gray-700 lg:w-[20%] '>

        </div>
        <div className='block md:hidden absolute w-[65%]  '>
    {
      
      isSidebarOpen&&<Sidebar/>}
        </div>
        <div className='w-[100%] md:w-[85%] '>
       
          <div className='p-10 min-h-[100vh] bg-[#151028] '>
         
              <Outlet/>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard
