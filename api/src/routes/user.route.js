import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  changeCurrentPassword,
  changeProfiePicture,
  deleteUser,
  getUserById,
  getUsers,
  google,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// Create a router instance
const router = express.Router();

// Define routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/google").post(google);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/getUserById/:userId").get(getUserById);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), changeProfiePicture);
router.route("/getUsers").get(verifyJWT, getUsers);
router.route("/deleteUser/:userId").delete(verifyJWT, deleteUser);

export default router;
