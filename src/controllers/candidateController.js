import asyncHandler from "../utils/asyncHandler.js";
import Candidate from "../models/candidateModel.js";
import User from "../models/userModel.js"
import cloudinary from 'cloudinary'
export const addNewCandidate = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, party, constituency,  state,avatar } = req.body;
  console.log(name, party, constituency,  state,avatar);
  const isCandidateExist = await Candidate.findOne({ party, constituency });
  console.log(isCandidateExist);
  if (isCandidateExist) {
    throw new Error(
      "Candidates with same party in same constituency is not allowed "
    );
  }
  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 1020,
    crop: "scale",
  });
  console.log(myCloud);
 
    const newCandidate = await Candidate.create({
      name,
      party,
      constituency,
      state,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      },
    });
 

  res.status(200).json({
    sucess: true,
    message:"Candidate added successfully",
    newCandidate,
  });
});
export const deleteCandidate = asyncHandler(async (req, res) => {
  const  {candidate, email}  = req.body;
  console.log(candidate)
  console.log(email)
  const isCandidateExist = await Candidate.findOne({ _id:candidate._id });
  // console.log(isCandidateExist);
  if (!isCandidateExist) {
    throw new Error("Candidates does not exist ");
  }
 const isUser = await User.findOne({email})
 console.log(isUser)
 if(!isUser){
  throw new Error("user not found")
 }
 console.log("amskldjflj",isUser?.votedCandidateId)
 if(isUser?.votedCandidateId?.equals(candidate._id)){
  isUser.isVoted = false
  isUser.votedCandidateId =null
  await isUser.save();
 }
console.log("hello")
  const deletedCandidate = await Candidate.findByIdAndDelete(candidate._id);
  res.status(200).json({
    sucess: true,
    message:"candidate deleted successfully",
    deletedCandidate,
  });
});

export const editCandidate = asyncHandler(async (req, res) => {
  const { id, name, party, constituency,state} = req.body;
  console.log(name)
  const isCandidateExist = await Candidate.findOne({ _id: id });

  if (!isCandidateExist) {
    throw new Error("Candidates does not exist ");
  }

  const updateCandidate = await Candidate.findByIdAndUpdate(
    id,
    { $set: { name, party, constituency ,state} },
    { new: true }
  );
  res.status(200).json({
    sucess: true,
    message:'successfully updated',
    updateCandidate,
  });
});

export const getAllCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.aggregate([
    {
        $group: {
            _id: '$constituency',
            candidates: { $push: '$$ROOT' }
        }
    }
]);


  
  res.status(200).json({
    sucess: true,
    allCandidates:candidates
  });
});



