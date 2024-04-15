import React, { useEffect, useReducer, useRef, useState } from 'react'
import { addNewCandidate, getAllCandidates } from '../../features/candidates/candidatesApi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Load from '../../pages/Load';
import toast,{Toaster} from "react-hot-toast"
import { checkAuth } from '../../features/authentication/authApi';
const AddCandidate = () => {
  const [avatar, setAvatar] = useState(null)
  const name = useRef(null)
  const party = useRef(null);
  const constituency = useRef(null);
  const state = useRef(null)
  const {loading} = useSelector(store => store.candidates)
  
const dispatch = useDispatch()
  const formHandler = (e) => {
    e.preventDefault()
    if (!(name && party && constituency && history &&avatar )) {
      toast.error('Please enter all required fields.');
      return;
    }

    const formData ={
      name:name.current.value,
      
      party:party.current.value,
      constituency:constituency.current.value,
      state:state.current.value,
      avatar:avatar
    }

    
   
  
  dispatch(addNewCandidate(formData))

 name.current.value ='';
 party.current.value ='';
 constituency.current.value ='';
 state.current.value ='';
 setAvatar('')
  }

  const fileHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
        
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }
  
  
//  useEffect(() => {
//   dispatch(checkAuth())
// },[dispatch])
  return (
    <div className='flex justify-center items-center  bg-[#151028]'>
     <form onSubmit={formHandler} action="" className='bg-gray-200 p-10 w-[90%] md:w-[60%]  flex flex-col space-y-3'>
      <input className='p-2 rounded-md' ref={name} type="text" placeholder='Name' required/>
      <input  className='p-2 rounded-md'  ref={party} type="text" placeholder='Party' required/>
      <input className='p-2 rounded-md' ref={constituency} type="text" placeholder='Constituency' required/>
      <input className='p-2 rounded-md' ref={state} type="text" placeholder='State' required/>
      <label  for="fileInput">Upload a file (max 1 MB)</label>
      <input className='p-2 rounded-md' onChange={fileHandler} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
      <button className='p-2 rounded-md bg-sky-700 text-white' type='submit'>Add</button>
     </form>
   
     <Toaster/>
    </div>
  )
}

export default AddCandidate
