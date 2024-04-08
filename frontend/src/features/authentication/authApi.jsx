import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const voteCandidate = createAsyncThunk("auth/vote" , async(userData) => {
  try {
    const response = await fetch("/api/v1/auth/vote",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        'content-type':'application/json'
      }
    })
    const data = await response.json()
  
    return 
  } catch (error) {
    console.log(error)
  }
})

export const getAllUsers = createAsyncThunk(
  "auth/allusers", 
async() => {
  try {
    const response = await fetch("/api/v1/auth/allusers",{
      method:"GET",
      headers:{
        'content-type':'application/json'
      }
    })
  const data = await response.json()
  console.log(data.allUsers)
  
    return data.allUsers
  } catch (error) {
     
    console.log(error)
return error.message
    
  }
})


export const login = createAsyncThunk("auth/login", async(userData,{rejectWithValue}) => {
  try {
    const response = await fetch("/api/v1/auth/login",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        'content-type':'application/json'
      }

    })
console.log(response)
    const json = await response.json()
  if(json.success){
    setTimeout(() => {
      toast.success("Login successfull")
    },1000)
    
    return json.user
  }
   toast.error(json.message)
    
    return json
  } catch (error) {
    if(error.response && error.response.data.message){
      console.log(error.response)
      return rejectWithValue(error.response.data.message)
    }
    else{
      console.log(error.message)
      return rejectWithValue(error.message)
    }
  }
})


export const register = createAsyncThunk("auth/register", async(userData, {rejectWithValue})  => {
  
  try {
    const response = await fetch('/api/v1/auth/register',{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        'content-type':'application/json'
      }
    });
    const json = await response.json();
    return json.newUser
    
  } catch (error) {
    if(error.response && error.response.data.message){
      return rejectWithValue(error.response.data.message)
    }
    else{
      return rejectWithValue(error.message)
    }
  }
})

export const checkAuth= createAsyncThunk("auth/authcheck", async()  => {
  
  try {
    const response = await fetch('/api/v1/auth/authcheck',{
      method:"GET",
      
      headers:{
        'content-type':'application/json'
      }
    });
    console.log(response)
    const json = await response.json()
    console.log(json)
  if(json.success){
    
    return json.user
  }
   
    
    return json
    
  } catch (error) {
    console.log(error, error.message)
    return error.message
  }
})



export const logout = createAsyncThunk('auth/logout', async() => {
  try {
    const response = await fetch('/api/v1/auth/logout',{
      method:"GET",
      
      headers:{
        'content-type':'application/json'
      }}
    )
    console.log(response)
    const json = await response.json()
  if(json.success){
    toast.success("logout successfull")
    window.location.replace("/")
    return json.user
  }
  toast.error("logout unsuccessful")
   
    
    return json
  } catch (error) {
    console.log(error, error.message)
    return error.message
  }
})