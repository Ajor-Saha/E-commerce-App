import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addComment,
  deleteComment,
  editComment,
  getAllComments,
  getProductComment,
  likeComment,
} from "../controllers/comment.controller.js";

// Create a router instance
const router = express.Router();

router.route("/addComment/:productId").post(verifyJWT, addComment);
router.route("/getProductComment/:productId").get(getProductComment);
router.route("/likeComment/:commentId").put(verifyJWT, likeComment);
router.route("/editComment/:commentId").patch(verifyJWT, editComment);
router.route("/deleteComment/:commentId").delete(verifyJWT, deleteComment);
router.route("/getAllComment").get(verifyJWT, getAllComments);

export default router;
