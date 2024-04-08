import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import Candidate from "../models/candidateModel.js";
import sendEmail from "../utils/mailHelper.js";
import crypto from "crypto";
const cookieOptions = {
  expiresIn: 10000,
  httpOnly: true,
};
export const userVote = asyncHandler(async (req, res) => {
  const { email, candidate } = req.body;
  console.log("v0te----------", candidate, email);
  if (!email || !candidate) {
    console.log("Fields are missing");
    throw new Error("Fields missing");
  }
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new Error("User not found");
  }
  console.log(candidate._id);
  const existingCandidate = await Candidate.findOne({ _id: candidate._id });
  // console.log(existingCandidate)

  if (!existingCandidate) {
    throw new Error("candidate not found to vote");
  }

  if (existingCandidate._id.equals(existingUser?.votedCandidateId)) {
    throw new Error("already voted");
  }
  if (existingCandidate.constituency === existingUser.constituency) {
    if (existingUser?.votedCandidateId) {
      console.log(candidate._id);
      const oldCandidate = await Candidate.findOne({
        _id: existingUser.votedCandidateId,
      });
      console.log("old", oldCandidate);
      oldCandidate.votes--;
      await oldCandidate.save();
      existingUser.votedCandidateId = null;
      await existingUser.save();
    }

    existingCandidate.votes++;
    await existingCandidate.save();
    existingUser.isVoted = true;
    existingUser.votedCandidateId = existingCandidate._id;
    await existingUser.save();
    res
      .status(200)
      .json({ success: true, message: "voted recoreded successfull" });
  }
});
export const resetVote = asyncHandler(async (req, res) => {
  const { email, candidate } = req.body;
  if (!email || !candidate) {
    console.log("Fields are missing");
    throw new Error("Fields missing");
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("User not found");
  }
  const existingCandidate = await Candidate.findOne({ _id: candidate._id });
  if (!existingCandidate) {
    throw new Error("candidate not found to vote");
  }
  if (
    existingCandidate.constituency === existingUser.constituency &&
    existingUser.isVoted
  ) {
    existingCandidate.votes--;
    await existingCandidate.save;
    existingUser.isVoted = false;
    existingUser.votedCandidateId = null;
    existingUser.save();
    res.status(200).json({ success: true, message: "Reset vote successfull" });
  }
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, constituency, state } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    console.log("Fields are missing");
    throw new Error("Fields are missing");
  }
  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (existingUser) {
    throw new Error("User already exist");
  }
  const newUser = await User.create({
    name,
    email,
    password,
    state,
    constituency,
  });
  console.log(newUser);
  const token = newUser.getJwtToken();
  console.log(token);
  newUser.password = undefined;

  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    token,
    newUser,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    console.log("Fields are missing");
    throw new Error("Fields are missing");
  }
  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await existingUser.comparePassword(password);
  if (!isPasswordMatched) {
    throw new Error("incorrect password");
  }
  const token = existingUser.getJwtToken();

  res.cookie("token", token, cookieOptions);
  existingUser.password = undefined;
  res.status(200).json({
    success: true,
    token,
    user: existingUser,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  console.log("user details");
  const { user } = req;
  // console.log(user)
  const userDetails = await User.findById(user.id);

  if (!user) {
    throw new Error("User not found");
  }
  userDetails.password = undefined;
  res.status(200).json({
    success: true,
    userDetails,
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  console.log("user details");

  const allUsers = await User.find({});
  console.log(allUsers);

  res.status(200).json({
    success: true,
    allUsers,
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("email:", email);

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  console.log("__generating___");
  const resetToken = user.generateForgotPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `Your password reset token is as follow: \n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`;
  console.log(resetUrl, user.email);
  try {
    await sendEmail({
      email: user.email,
      subject: "password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.forgotPassword = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBefore: false });
    throw new Error(`${err.message}, ${err.code} error in mailing`);
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  console.log(password);
  console.log(resetToken);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log("----" + resetPasswordToken);
  const user = await User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  console.log("----" + user);
  if (!user) {
    throw new Error("user not found to reset password");
  }
  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();
  const token = user.getJwtToken();
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    user,
  });
});

export const checkAuth = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log("authe check -----", user);
  user.password = undefined;
  res.status(200).json({
    success: true,
    user,
  });
});
