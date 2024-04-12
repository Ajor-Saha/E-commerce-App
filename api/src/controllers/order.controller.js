import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllOrders = asyncHandler(async (req, res) => {
    // Get the user ID from the request
    const userId = req.user._id;
  
    // Find the user by ID
    const user = await User.findById({ _id:userId });
  
    // Check if the user exists
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    // Check if the user is an admin
    if (!user.isAdmin) {
      throw new ApiError(403, "Unauthorized access");
    }
  
    // Fetch all orders
    const orders = await Order.find();
  
    // Return orders as JSON response

    return res
    .status(201)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
    
});

 
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  
  const user = await User.findById({ _id:userId });
  if (!user || !user.isAdmin) {
    throw new ApiError(403, "Unauthorized access");
  }

  
  const { orderId } = req.params;

 
  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }

 
  const order = await Order.findById({ _id:orderId });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

 
  order.delivery_status = "shipped";

  
  await order.save();

  
  return res
    .status(201)
    .json(new ApiResponse(200, order, "Delivery status updated to shipped"));
});


const getClientOrders = asyncHandler(async (req, res) => {
  // Get the user ID from the request
  const userId = req.user._id;

  // Find the user by ID
  const user = await User.findById(userId);

  // Check if the user exists
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  
  const userEmail = user.email;
  
  // Fetch orders matching the user's email
  let orders = await Order.find({ "shipping.email": userEmail });

  // Populate product details for each order
  orders = await Promise.all(orders.map(async (order) => {
    // Populate product details for each product in the order
    const populatedProducts = await Promise.all(order.products.map(async (product) => {
      const productDetails = await Product.findById(product.productId);
      return {
        ...product.toJSON(),
        name: productDetails.name,
        productImage: productDetails.productImage,
      };
    }));

    return {
      ...order.toJSON(),
      products: populatedProducts,
    };
  }));

  return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
});


export {
    getAllOrders,
    updateDeliveryStatus,
    getClientOrders
}