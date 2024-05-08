import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
export const addNewCandidate = createAsyncThunk(
  'candidates/add',async(formData, {rejectWithValue}) => {
    
       try {
        const data = await fetch("/api/v1/candidate/newcandidate",{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'content-type': 'application/json' },
    
        }
        )
        console.log(data)
        const json = await data.json()
        console.log(json)
        toast.success(json.message)
        return json.newCandidate;
       } catch (error) {
        
        if(error.response && error.response.data.message){
          toast.success(error.response.data.message)
          return rejectWithValue(error.response.data.message)
          
        }
        else{
          toast.success(error.message)
          return rejectWithValue(error.message)
        }
       }
  }
  )
  export const delCandidate = createAsyncThunk(
    'candidates/add',async(candidateData, {rejectWithValue}) => {
         try {
          const data = await fetch("/api/v1/candidate/delcandidate",{
          method: 'DELETE',
          body: JSON.stringify(candidateData),
          headers: { 'content-type': 'application/json' },
          }
          )
          console.log(data)
          const json = await data.json()
          console.log(json)
          toast.success(json.message)
          return 
         } catch (error) {
          
          if(error.response && error.response.data.message){
            console.log(error.response.data.message)
            return 
          }
          else{
            console.log(error.message)
            return 
          }
         }
    }
    )
  export const getAllCandidates = createAsyncThunk(
    "candidates/allcandidates",async() => {
      try {
        console.log("getallcandidae")
        const response = await fetch('/api/v1/candidate/getallcandidates',{
          method:"GET",
          headers:{'content-type':'application/json'}
        })
        const json= await response.json()
        console.log(json)
        return json.allCandidates
      } catch (error) {

        console.log(error)
        return error.message


      }
   
  })
  

  export const editCandidate = createAsyncThunk("candidates/edit",async(editedData) => {

    try {
      const data = await fetch("/api/v1/candidate/editcandidate",{
      method: 'PUT',
      body: JSON.stringify(editedData),
      headers: { 'content-type': 'application/json' },
  
      }
      )
      console.log(data)
      const json = await data.json()
      console.log(json)
      toast.success(json.message)
      return 
     } catch (error) {
      
      if(error.response && error.response.data.message){
        return rejectWithValue(error.response.data.message)
      }
      else{
        return rejectWithValue(error.message)
      }
     }



  })