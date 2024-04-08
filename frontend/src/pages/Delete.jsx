import React from 'react'

const Delete = () => {
  return (
    <div class="flex items-center justify-center h-screen backdrop-blur-md fixed top-0 w-full ">
     
      <div class="bg-gray-300 p-4 rounded-lg text-center shadow-md w-1/3">
       
        <p class="text-center text-gray-800">Are you sure you want to delete this?</p>
        <button class="mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
          Delete
        </button>
      </div>
       </div>
    
  )
}

export default Delete
