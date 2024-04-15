import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'



const Users = () => {
  const {allUsers} = useSelector(store => store.auth)
 
 
    // dispatch(getAllCandidates())
   
  return (
    <div className=''>
      <div className='bg-gray-200'>
      <h1 className='text-center font-semibold text-[1.6rem] p-2 m-2'> All Users</h1>
      {
        allUsers&&allUsers.map((ele,index) => (
          <div key={ele.email} >
            <p className='px-5 py-2 border border-[#151028] '> {ele.name}</p>
            
             </div>
        ))
      }
    
    </div>
    </div>
  )
}

export default Users
