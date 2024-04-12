import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getAllOrders, getClientOrders, updateDeliveryStatus } from "../controllers/order.controller.js";

// Create a router instance
const router = express.Router();

router.route("/getAllOrders").get(verifyJWT, getAllOrders)
router.route("/updateDelivery/:orderId").patch(verifyJWT, updateDeliveryStatus)
router.route("/getclientOrders").get(verifyJWT, getClientOrders);

export default router;
