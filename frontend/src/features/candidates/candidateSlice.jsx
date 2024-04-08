import { createSlice } from "@reduxjs/toolkit";
import { addNewCandidate, editCandidate, getAllCandidates } from "./candidatesApi";
const initialState = {
  totalCandidates : null,

  loading:true,
  error:null
}
const candidateSlice = createSlice({
name:"candidates",
initialState,
reducers:{
 
},
extraReducers:(builder) => {
  builder.addCase(addNewCandidate.pending, (state) => {
      state.loading = true;
      state.error = null;
  })
  .addCase(addNewCandidate.fulfilled,(state,{payload}) => {
    state.loading = false;
  
  })
  .addCase(addNewCandidate.rejected,(state) => {
    state.loading = false;
    state.error = null;
  }).addCase(getAllCandidates.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(getAllCandidates.fulfilled,(state,{payload}) => {
  state.loading = false;
  state.totalCandidates = payload
 
})
.addCase(getAllCandidates.rejected,(state) => {
  state.loading = false;
  state.error = null;
}).addCase(editCandidate.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(editCandidate.fulfilled,(state) => {
state.loading = false;


})
.addCase(editCandidate.rejected,(state) => {
state.loading = false;
state.error = null;
})
  
}

})

export const {} = candidateSlice.actions;
export default candidateSlice.reducer