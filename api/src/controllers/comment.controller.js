import { Comment } from "../models/comment.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addComment = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const existProduct = await Product.findOne({ _id: productId });

  if (!existProduct) {
    throw new ApiError(400, "Product is not found");
  }

  const { content } = req.body;

  if (!content) {
    throw new ApiError(401, "Content field is required");
  }

  const comment = await Comment.create({
    content,
    productId,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment added successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  const userId = req.user._id;
  const comment = await Comment.findById({ _id: commentId });

  if (!comment) {
    throw new ApiError(401, "Comment not found");
  }

  if (comment.userId !== userId && !req.user.isAdmin) {
    throw new ApiError(401, "You are not allowed to delete this comment");
  }

  // Find the comment by its ID and delete it
  const deletedComment = await Comment.findByIdAndDelete({ _id: commentId });

  // If no comment is found, return a 404 error
  if (!deletedComment) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});

const getProductComment = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const existProduct = await Product.findById({ _id: productId });

  if (!existProduct) {
    throw new ApiError(400, "Product is not found");
  }

  const comments = await Comment.find({ productId }).sort({
    createdAt: -1,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, comments, "Comment retrieve successfully"));
});

const likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    throw new ApiError(401, "Comment not found");
  }

  const userIndex = comment.likes.indexOf(req.user._id);

  if (userIndex == -1) {
    comment.numberOfLikes += 1;
    comment.likes.push(req.user._id);
  } else {
    comment.numberOfLikes -= 1;
    comment.likes.splice(userIndex, 1);
  }

  await comment.save();

  return res
    .status(201)
    .json(new ApiResponse(200, comment, "Like to a comment successfully"));
});

const editComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  const comment = await Comment.findById({ _id: commentId });

  if (!comment) {
    throw new ApiError(401, "Comment not found");
  }

  if (comment.userId !== userId && !req.user.isAdmin) {
    throw new ApiError(401, "You are not allowed to edit this comment");
  }

  const editedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: req.body.content,
      },
    },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, editedComment, "comment edited successfully"));
});

const getAllComments = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(401, "You are not allowed");
  }
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 9; // Adjust perPage value as needed
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    // Query comments with pagination
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection }) // Sort based on date
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Count total number of comments
    const totalComments = await Comment.countDocuments();

    // Send response
    res.status(201).json({
      success: true,
      comments,
      totalComments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

export {
  addComment,
  deleteComment,
  getProductComment,
  likeComment,
  editComment,
  getAllComments
};
