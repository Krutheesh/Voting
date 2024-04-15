
import React, { useEffect } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Forms from './components/Form';
import { useSelector } from 'react-redux';
import ForgotPassword from './components/ForgotPassword';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Content from './components/Content';
import ResetPassword from './components/ResetPassword';
import Home from './pages/Home';
import Layout from './pages/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './admin/components/Dashboard';
import AddCandidate from './admin/components/AddCandidate';
import Users from './admin/components/Users';
import { ScrollTop } from './features/constants/ScrollTop';
import ProtectedAdmin from './components/ProtectedAdmin';
import { checkAuth } from './features/authentication/authApi';
import DashBoardData from './admin/components/DashBoardData';
import { getAllCandidates } from './features/candidates/candidatesApi';
const appRouter = createBrowserRouter([
  {
    path:'/login',
    element:<Forms/> 
  },
  {
    path:'/forgotpassword',
    element:<ForgotPassword/>
    },
    {
      path:'resetpassword/:token',
      element:<ResetPassword/>
    },
{
  path:'/',
  element:<Layout/>,
  children:[
{
  path:'/',
  element:<Home/>
},
{
  path:'/about',
  element:<About/>
},
{
  path:'/contact',
  element:<Contact/>
},


  ],
  
},{
  path:'/dashboard',
  element:  <Dashboard/>,
  

  children :[
    {
      
      path:'/dashboard',
       element:<ProtectedAdmin><DashBoardData/></ProtectedAdmin>,
     },
    {

      path:'/dashboard/addcandidate',
       element:<ProtectedAdmin><AddCandidate/></ProtectedAdmin>,
     },
     {
       path:'/dashboard/allusers',
       element:<ProtectedAdmin><Users/></ProtectedAdmin>
     },
    
   
  ]
  
}
])
const App = () => {
  const dispatch = useDispatch();
  
 useEffect(() => {
  dispatch(checkAuth())
  dispatch(getAllCandidates())
},[dispatch])
  return (
   
    <RouterProvider router={appRouter}>
      <ScrollTop/>
    <Layout/>
    
    </RouterProvider>
    
  )
}

export default App
