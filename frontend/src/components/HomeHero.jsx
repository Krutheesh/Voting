import React from 'react'
import narendra from '../assets/alliances/narendra.png'
import Rahul from '../assets/alliances/Rahul.jpg'
import { FaUsers } from "react-icons/fa";
const HomeHero = () => {
  const arr=[
    {
      id:1,
      img:narendra,
      alliance:"NDA",
      majority :2
    },
    {
      id:2,
      img:Rahul,
      alliance:"INA",
      majority :1
    },{
      id:3,
      icon:<FaUsers className="  h-[10rem] w-[10rem]   rounded-full" />,
      alliance:"MISC",
      majority :0
    }
  ]
  return (
    <div className='flex justify-center items-center flex-wrap py-10'>

   {
    arr.map((group) => (
     
       <div
       key={group.id}
      className='border-2 border-[#6027fb] m-5 rounded-md '
     >
       <div  className=" flex md:flex-row flex-col  items-center justify-center    rounded-lg">

         <div
          
           className="text-center flex flex-col justify-center items-center   "
         >
           <div className={`rounded  bg-[#221b46]  p-5  border-[#6027fb] text-white`} >
             <div className={`flex  justify-center mx-auto my-3 items-center w-[15rem] h-[15rem] rounded-full   ${group.alliance.toUpperCase()=="NDA"? "bjp-color-radial" :group.alliance.toUpperCase()=="INA"?"congress-color-radial":group.alliance.toUpperCase()=="MISC"?"mis-color-radial ":"mis-color-radial "} `}>
              {group?.img&& <img
                 src={group.img}
                 alt=""
                 className="  h-[10rem] w-[10rem]   rounded-full"
               />}
                {group?.icon&& <p >{group.icon}</p>
 }
             </div>


             
             <h2 className='font-bold text-[1.6rem] bg-gradient-to-r from-blue-700 to-red-700 text-transparent bg-clip-text '>{group.alliance}</h2>
             {/* <h2 className="w-[70%] mx-auto">{group.history}</h2> */}
             <h2>Majority Constituencies : {group.majority}</h2>
             
           </div>
         </div>
       
       </div>
      
     </div>
    ))
   }
     
      
    </div>
  )
}

export default HomeHero
