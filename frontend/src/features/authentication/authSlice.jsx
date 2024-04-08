import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, getAllUsers, login,register, voteCandidate } from "./authApi";
const initialState = {
  isLoading:null,
  userInfo:null,
  allUsers:null,
  isVoted:null,
}

export const userSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    
  },
  extraReducers:(builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading=true
    }).addCase(getAllUsers.fulfilled, (state,{payload}) => {
      state.isLoading=false;
      state.allUsers=payload
    }).addCase(getAllUsers.rejected, (state) => {
      state.isLoading=false
    }).addCase(login.pending, (state) => {
      state.isLoading=true
    }).addCase(login.fulfilled, (state,{payload}) => {
      state.isLoading=false;
      state.userInfo=payload
    }).addCase(login.rejected, (state) => {
      state.isLoading=false
    }).addCase(register.pending, (state) => {
      state.isLoading=true
    }).addCase(register.fulfilled, (state,{payload}) => {
      state.isLoading=false;
      state.userInfo=payload
    }).addCase(register.rejected, (state) => {
      state.isLoading=false
    }).addCase(checkAuth.pending, (state) => {
      // state.isLoading=true
    }).addCase(checkAuth.fulfilled, (state,{payload}) => {
      state.isLoading=false;
      state.userInfo=payload
    }).addCase(checkAuth.rejected, (state) => {
      state.isLoading=false
    }).addCase(voteCandidate.pending, (state) => {
      state.isLoading=true
    }).addCase(voteCandidate.fulfilled, (state,{payload}) => {
      state.isLoading=false;
      state.isVoted=payload
    }).addCase(voteCandidate.rejected, (state) => {
      state.isLoading=false
    })
  }
})



export default userSlice.reducer