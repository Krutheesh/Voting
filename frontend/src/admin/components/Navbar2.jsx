// Navbar.js

import React, { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import {useSelector,useDispatch} from "react-redux"
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { setIsSideBarOpen } from "../../features/authentication/authSlice";
const Navbar2 = () => {
  const dispatch = useDispatch()
  const [userOpen, setUserOpen] = useState(false)
  const { userInfo,isSidebarOpen } = useSelector((store) => store.auth);
  console.log(userInfo)
  const toggleSidebar = () => {
    dispatch(setIsSideBarOpen())
  };
const userToggle = () => {
   setUserOpen(!userOpen)
}
  return (
    <div className="bg-gray-800">
      <header className="flex justify-between items-center px-5 py-1">
        <div className="flex items-center">
          <div className="md:hidden" onClick={toggleSidebar}>
           {!isSidebarOpen && <RxHamburgerMenu className="text-blue-500 text-[1.6rem] md:hidden" />} 
          </div>
          <div className="md:hidden" onClick={toggleSidebar}>
          {isSidebarOpen&&<RxCross2 className="text-blue-500 text-[1.6rem] md:hidden" />}
          </div>
          <div className="">
            <h2 className="text-blue-500 text-[1.7rem] py-2 pl-5 font-semibold">
              Admin panel
            </h2>
          </div>
        </div>
        <div className="realtive">
          <button className="h-9 w-9 rounded-full bg-blue-500 text-white font-semibold" onClick={userToggle}>{userInfo?.name.slice(0,1).toUpperCase()}</button>
         {userOpen&& <div className="absolute z-40 p-5 w-[12rem] bg-white rounded-md  right-6 m-2">
           {userInfo && <ul className="space-y-2 text-gray-800">
              <li>
                {" "}
                <Link>Profile </Link>
              </li>
              <li>
                <Link to='/'>Home</Link>{" "}
              </li>
              <li>
                {" "}
                <Link>Logout</Link>
              </li>
            </ul>}
          </div>}
        </div>
      </header>
     
    </div>
  );
};

export default Navbar2;
