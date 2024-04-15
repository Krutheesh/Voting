import React, {useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { ImUsers } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['NDA','INA',"MISC"],
  datasets: [
    {
      label: 'Total number of Votes',
      data: [30,20,2],
      backgroundColor: [
        'orange',
        'green',
        'white'
      ],
      borderColor: [
        'orange',
        'green',
        'white'
      ],
     
      borderWidth: 1,
    },
  ],
};
export const options = {
  legend:{
    labels:{
      borderColor:"red",
      fontSize:0
    }
  }
}
const DashBoardData = () => {
 
const {totalCandidates} = useSelector(store => store.candidates)
const {allUsers} = useSelector(store => store.auth)


 const votedUsers = allUsers?.length && allUsers.filter(ele => ele.isVoted === true)
 console.log(votedUsers)
  return (
    <div className=''>
      <div className='flex justify-center md:justify-between items-center  flex-wrap'>
        
        <div className='bg-blue-700 p-5 md:w-[30%] rounded m-2 flex flex-col justify-center items-center'>
          <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-gray-300 p-2 md:text-[1.2rem]'>Total Candidates</h2>

          <ImUsers className='text-[2rem] text-gray-300 ' />
          </div>
          <p  className=" md:text-5xl text-3xl font-bold bg-gradient-to-r from-pink-500  to-purple-500 text-transparent bg-clip-text">{totalCandidates?.length}</p>
        </div>
        <div className='bg-blue-700 m-2 p-5 md:w-[30%] rounded flex flex-col justify-center items-center'>
          <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-gray-300 p-2 md:text-[1.2rem]'>Total Users</h2>

          <FaUsers className='text-[2rem] text-gray-300 ' />
          </div>
          <p  className=" md:text-5xl text-3xl font-bold bg-gradient-to-r from-gray-400  to-purple-500 text-transparent bg-clip-text">{allUsers?.length}</p>
        </div>

        <div className='bg-blue-700 m-2 p-5 md:w-[30%] rounded flex flex-col justify-center items-center'>
          <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-gray-300 p-2 md:text-[1.2rem]'>Total Voters</h2>

          <FaUsers className='text-[2rem] text-gray-300 ' />
          </div>
          <p  className=" md:text-5xl text-3xl font-bold bg-gradient-to-r from-orange-400  to-green-500 text-transparent bg-clip-text">{votedUsers?.length}</p>
        </div>
        
      </div>
      <div>
      <Pie data={data} options={options} className='mx-auto p-[3rem]' />
      </div>
    </div>
  )
}

export default DashBoardData
