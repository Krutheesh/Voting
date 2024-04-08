import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkAuth, getAllUsers } from '../../features/authentication/authApi'

const Users = () => {
  const {allUsers} = useSelector(store => store.auth)
  const dispatch = useDispatch()
 
 useEffect(() => {
  dispatch(getAllUsers())
  // dispatch(checkAuth())
  console.log("hello")
 },[dispatch])
    // dispatch(getAllCandidates())
   
  return (
    <div className='bg-gray-200'>
      <h1 className='text-center font-semibold text-[1.6rem] p-5 m-5'> All Users</h1>
      {
        allUsers&&allUsers.map((ele,index) => (
          <div key={ele.email} >
            <p className='px-5 py-2 border border-[#151028] '> {ele.name}</p>
            
             </div>
        ))
      }
    
    </div>
  )
}

export default Users
