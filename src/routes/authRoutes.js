import { Router } from "express";
import {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  getAllUsers,
  checkAuth,
  logout,
  userVote,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/allusers", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.post("/vote", userVote);
router.get("/logout", isLoggedIn, logout);
router.get("/authcheck", isLoggedIn, checkAuth);
router.get("/getProfile", isLoggedIn, getProfile);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:resetToken", resetPassword);

export default router;
