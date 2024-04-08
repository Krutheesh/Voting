import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { checkAuth, logout } from "../features/authentication/authApi";
import { Toaster } from "react-hot-toast";
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
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setSmProfile(!smProfile)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg 
               
                  className="block bg-red-600 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  >
                  <path
                   
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  >
                  <path
                   
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  >
                  <path
                   
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

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
                    <img
                     
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
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
                      to='/profile'
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
          </div>
        </div>

       {smProfile? <div className="md:hidden block" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
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
        </div>:<></>}
      </nav>
      <Toaster/>
    </div>
  );
};

export default Navbar;
