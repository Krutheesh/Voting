import React from 'react'
import { Link } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import {useDispatch, useSelector} from 'react-redux'
import { setIsSideBarOpen } from '../../features/authentication/authSlice';
const Sidebar = () => {
  const dispatch = useDispatch()
  
  const sidebarHadler = () => {
      dispatch(setIsSideBarOpen())
  }
  return (
    <div className='h-[89vh] bg-gray-800 opacity-85 shadow-lg text-white'>
      <ul className='flex flex-col w-[80%] p-5 mx-auto space-y-5  '>
        <li >
        
          <Link className='flex items-center justify-start space-x-3' onClick={sidebarHadler}> <MdDashboard className='text-[1.6rem] ' /> <h3>Dashboard</h3></Link>
        </li>
        <li >
          <Link to='/dashboard/addcandidate' onClick={sidebarHadler}  className='flex items-center justify-start space-x-3'> <IoPerson  className='text-[1.6rem] '/> <h3>Add Candidate</h3></Link>
        </li>
        <li >
          <Link to='/dashboard/allusers'  onClick={sidebarHadler} className='flex items-center justify-start space-x-3'>
          <FaUsers className='text-[1.6rem] ' />
         <h3> Users</h3>
            
            </Link>
        </li>
        <li>
          <Link>Stats </Link>
        </li>
        <li>
          <Link>Settings</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
