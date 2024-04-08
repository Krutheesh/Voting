import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='h-[88dvh] shadow-lg'>
      <ul className='flex flex-col   p-5 space-y-5 bg-white '>
        <li>
          <Link>Dashboard</Link>
        </li>
        <li >
          <Link to='/dashboard/addcandidate'>Add Candidate</Link>
        </li>
        <li >
          <Link to='/dashboard/allusers'>All Users</Link>
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
