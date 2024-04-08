import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCandidate, getAllCandidates } from '../features/candidates/candidatesApi';
import Load from './Load';
import toast,{Toaster} from "react-hot-toast"
const Edit = ({candidate}) => {
  // Ref for the form element
  
  const {loading} = useSelector(store => store.candidates)
  const dispatch = useDispatch()
  const [name, setName ] = useState(candidate.name)
  
  const [party, setParty] = useState(candidate.party);
  const [selectedState, setSelectedState] = useState(candidate.state);
  const [selectedConstituency, setSelectedConstituency] = useState(candidate.constituency);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if( !(name&&selectedConstituency&&party&&selectedState)){
        console.log('fields missing')
        return
    }
  const editedData = {
    id:candidate._id,
    name,
    state:selectedState,
    constituency:selectedConstituency,
    party
    
  }
console.log(editedData)
  dispatch(editCandidate(editedData))
  setTimeout(() => {
      dispatch(getAllCandidates())
  },500)

  
  };
  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    // Optionally, reset the selected constituency when the state changes
    setSelectedConstituency('');
  };
  const constituencyData = {
    Maharashtra: ['Mumbai North', 'Mumbai South', 'Pune', /* ... */],
    Karnataka: ['Bangalore North', 'Bangalore South', 'Mysore', /* ... */],
    Telangana:["Zaheerabad","Karimnagar"]
    // ... other states and their constituencies
  };
  

  const handleConstituencyChange = (event) => {
    const newConstituency = event.target.value;
    setSelectedConstituency(newConstituency);
    // Make API calls or perform other actions based on the selected state and constituency
  };
  return (
    
      <div className="bg-gray-200 rounded-lg p-6 w-96">
        {/* Cross icon (top-right corner) */}
        

        {/* Form */}
        <form onSubmit={handleSubmit} className='text-center'>
          {/* Name field */}
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            className="w-full p-2 mb-4 border rounded"
            onChange={(e) => setName(e.target.value)}
          />

          {/* Constituency field */}
         

          {/* Party field */}
          <input
            type="text"
            name="party"
            value={party}
            placeholder="Party"
            onChange={(e) => setParty(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          {/* History field */}
          
             <select
    id="stateSelect"
    className="w-full p-2 mb-4 border rounded"
    onChange={handleStateChange}
    value={selectedState}
  >
    {/* Populate options dynamically */}
    <option value="" disabled>Select State</option>
    {Object.keys(constituencyData).map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
      {selectedState && (
        <div className="">
         
          <select
            id="constituencySelect"
            className="w-full p-2 mb-4 border rounded"
            onChange={handleConstituencyChange}
            value={selectedConstituency}
          >
            <option value="" disabled>Select Constituency</option>
            {/* Populate constituency options based on selectedState */}
            {constituencyData[selectedState].map((constituency) => (
              <option key={constituency} value={constituency}>
                {constituency}
              </option>
            ))}
          </select>
        </div>
      )}

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {
  loading&&<>
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
     {/* Parent container */}
     <button
         className="absolute text-[2rem] top-2 right-2 px-3 text-white hover:text-gray-700"
         onClick={() => {
         setEdit(null)
         }}
       >
         ✕
       </button>

       <Load/>
 
 </div>
 </>

}
<Toaster/>
      </div>
   
  );
};

export default Edit;
