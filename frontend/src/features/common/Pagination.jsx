import React, { useEffect, useState } from 'react'
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";

const Pagination = ({setPage,data,page}) => {



  
  const prevHandler = () => {
    if(data && data.length &&page>0){
      setPage(page-1)
    }

  }
 
  const nextHandler = () => {
      if(data && data?.length &&page>=0 && page< data?.length-1){
        setPage(page+1)
      }
  }
  return (
    <div className='text-white'>
      
      <div className='flex justify-between items-center flex-wrap'>
      
      </div>
      <div className='flex justify-between flex-wrap items-center px-10 py-5'>
     {page>0?<GrCaretPrevious onClick={prevHandler} className='hover:text-sky-600 text-[1.6rem] '/>:<div> </div>} 
     { data&& <div className='flex justify-between flex-wrap items-center'>
          {
            [...Array(data.length/1)].map((el,ind) => (
              <span key={ind} className={` hover:text-sky-600 cursor-pointer m-1 p-1 md:m-2 md:p-2 ${(ind)*1 === page?"bg-sky-600 border":''}`} onClick={() => setPage((ind)*1)}>{ind+1} </span>
            )) 
          }
        </div>}
        {page<(data.length - 1)?      <GrCaretNext onClick={nextHandler} className='hover:text-sky-600 text-[1.6rem]'/>
:<div> </div>} 

      </div>
      
    </div>
  )
}

export default Pagination
