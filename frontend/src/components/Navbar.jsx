import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { checkAuth, logout } from "../features/authentication/authApi";
import { Toaster } from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userProfile, setUserProfile] = useState(false);
  const {userInfo} = useSelector(store => store.auth)
const [smProfile,setSmProfile] = useState(false)
useEffect(() => {
  dispatch(checkAuth())
},[dispatch])
const navBar= [{
  tag:"Home",
  link:'/'
},
{
  tag:"About Us",
  link:'/about'
},
{
  tag:"Contact Us",
  link:'/contact'
}]


console.log(smProfile)

console.log(userInfo)

const logoutHandler = () => {
  dispatch(logout())

}
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            
            <div className="flex  items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 md:block">
                <div className="flex space-x-4">
                  {
                    navBar.map(ele => (
                      <div key={ele.tag}>
                        <Link
                        to={ele.link}
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {ele.tag}
                  </Link>
                         </div>
                    ))
                  }
                  
                 
                  
                </div>
              </div>
            </div>
            <div className=" hidden md:absolute right-0  md:inset-y-0 md:flex md:items-center md:pr-2 ">
              

              <div className="relative ml-3">
                <div>
                  {userInfo?._id?<button
                    type="button"
                    className=" relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    onClick={() => setUserProfile(!userProfile)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <button className="h-9 w-9 rounded-full bg-blue-500 text-white font-semibold" >{userInfo?.name.slice(0,1).toUpperCase()}</button>

                  </button> : <div>
                    <span>
                      <Link to='/login' className="bg-blue-400 px-3 py-2 font-semibold rounded-xl">Login</Link>
                    </span>
                     </div>}
                </div>

                {userProfile ? (
                  <div
                    className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabindex="-1"
                  >

                    
                     
                      <>
                      <Link 
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => setUserProfile(!userProfile)}
                      // to='/profile'
                    >
                     Profile
                    </Link>
                   {userInfo.role === "admin"? <Link to='/dashboard'
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => setUserProfile(!userProfile)}
                    >
                      Dashboard
                    </Link>:<></>}
                     <button 
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={logoutHandler}
                    >
                     Logout
                    </button>
                    </>
                  
                   
                   
                   
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="md:hidden absolute  right-2 flex items-center ">
              <button
              
                className=" relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700  focus:outline-none "
              
                onClick={() => setSmProfile(!smProfile)}
              >
                

                {smProfile? <RxCross2 className="text-blue-500 text-[1.6rem] md:hidden" />:<RxHamburgerMenu className="text-blue-500 text-[1.6rem] md:hidden" />
}
              </button>
            </div>
          </div>
        </div>

       {smProfile? <div className="md:hidden sm:block" id="mobile-menu">
        <div className=" px-2 space-y-5 pt-2 pb-5">

        <div className="space-y-3" >
          {
                    navBar.map(ele => (
                      <div key={ele.tag} className="" >
                        <Link
                        to={ele.link}
                    className=" text-white rounded-md px-3  py-2 text-sm "
                  >
                    {ele.tag}
                  </Link>
                         </div>
                    ))
                  }
           
          </div>
          {/* ------------ */}
          <div className=" md:hidden flex items-center pr-2  ">
              

              <div className="relative ml-3">
                <div>
                  
                  {userInfo?._id?<div><div
                    type="button"
                    className=" relative flex  rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    onClick={() => setUserProfile(!userProfile)}
                  >
                   
                   
                              <p className="h-9 w-9 rounded-full bg-blue-500 flex justify-center items-center text-white font-semibold">{userInfo?.name.slice(0,1).toUpperCase()}</p>

                  </div>
                  
                  <div
                    className="  text-white mt-3 w-48 space-y-3 origin-top-right rounded-md bg-[] py-1    ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabindex="-1"
                  >

                    
                     
                      <>
                      <Link 
                      className="block px-4 text-sm "
                      onClick={() => setUserProfile(!userProfile)}
                      // to='/profile'
                    >
                     Profile
                    </Link>
                   {userInfo.role === "admin"? <Link to='/dashboard'
                      className="block px-4 text-sm "
                      onClick={() => setUserProfile(!userProfile)}
                    >
                      Dashboard
                    </Link>:<></>}
                     <button 
                      className="block px-4 text-sm "
                      onClick={logoutHandler}
                    >
                     Logout
                    </button>
                    </>
                  
                   
                   
                   
                  </div>
               
                  
                  
                  </div> : <div>
                    <span>
                      <Link to='/login' className="bg-blue-400 px-3 py-1 font-semibold rounded-md">Login</Link>
                    </span>
                     </div>}
                </div>

                
              </div>
            </div>
        </div>
          
          
        </div>:<></>}
      </nav>
      <Toaster/>
    </div>
  );
};

export default Navbar;
