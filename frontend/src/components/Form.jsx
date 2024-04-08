import React, { useState, useRef } from "react";
import Load from "./Load";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../features/authentication/authSlice";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { login, register } from "../features/authentication/authApi";
const Forms = () => {
  // console.log("form")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo} = useSelector(store => store.auth)
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [selectedState, setSelectedState] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [load, setLoad] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const constituency = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrMessage(null);
  };
  console.log(isSignInForm)
  const formHandler = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (isSignInForm) {
      if(!(email.current.value && password.current.value) ){
        alert("email or password missing")
        setLoad(false)
        return
      }
      const userInfo = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log('login')
      dispatch(login(userInfo));
     
    } else {
     console.log(name.current.value, email.current.value,password.current.value, selectedConstituency )
      if(!( name.current.value && email.current.value && password.current.value &&selectedConstituency&&selectedConstituency)){
        alert("name oremail or password  or constituency or missing")
        setLoad(false)
        return
      }
      const userInfo = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        state:selectedState,
        constituency: selectedConstituency
      };
      console.log("register")
        dispatch(register(userInfo))
     
     
    }
 
    setLoad(false);
  
  };

  if(userInfo?._id){
   navigate('/')
   
    
  }
  
  console.log("load",load)
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
    <>
      <div className="relative flex  justify-center ">
        <div className="w-full h-full absolute bg-black opacity-40 "></div>
        <div className=" w-full bg-cover ">
          {/* <img className=" h-[100vh] md:h-full  " src={''} alt="bg-logo" /> */}
        </div>
        <div className="absolute top-[6rem] ">
          <form
            onSubmit={formHandler}
            action=""
            className=" rounded-md w-[25rem] p-10 flex flex-col justify-center text-white  bg-black bg-opacity-80 "
          >
            <h2 className="font-semibold text-[2rem] p-2 py-4 m-2 text-white">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h2>
            {!isSignInForm ? (
              <>
              <input
                ref={name}
                type="name"
                className=" p-2 m-2 bg-gray-700 outline-none rounded-md"
                placeholder="Full Name"
                required
              />
             <select
    id="stateSelect"
    className="  p-2 m-2 bg-gray-700 outline-none rounded-md focus:ring focus:ring-opacity-50"
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
            className="  p-2 m-2 bg-gray-700 outline-none rounded-md focus:ring w-[95%] focus:ring-opacity-50 "
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
      </>
            ) : (
              ""
            )}
            <input
              ref={email}
              type="email"
              className=" p-2 m-2 bg-gray-700 outline-none rounded-md"
              placeholder="Enter Email or Phone number"
              required
            />
            <input
              ref={password}
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              className=" p-2 m-2 bg-slate-700 outline-none rounded-md"
              placeholder="Enter Password"
              required
            />
            {errMessage ? (
              <p className=" p-2 m-2   text-red-600 font-semibold ">
                {errMessage}
              </p>
            ) : (
              ""
            )}

            {load ? (
              <Ring />
            ) : (
              <button
                type="submit"
                className=" p-2 m-2  outline-none rounded-md bg-blue-600 text-white font-semibold "
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </button>
            )}
            <p className="text-white text-right px-2 cursor-pointer hover:text-gray-600">
              <Link to="/forgotpassword">forgot password ?</Link>
            </p>
            {load ? null : (
              <p className="text-gray-600 p-2 m-2 cursor-pointer">
                {isSignInForm ? "New to Netflix?" : "Already a Member?"}{" "}
                <span className="text-white" onClick={toggleSignInForm}>
                  {" "}
                  {isSignInForm ? "Sign Up" : "Sign In"}
                </span>
              </p>
            )}
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Forms;
