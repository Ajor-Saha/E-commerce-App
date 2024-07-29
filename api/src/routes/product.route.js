import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct, countProducts, deleteProduct, getAllProducts, getProductById, getProductsByCategoryType, searchProducts, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import multer from "multer";

// Create a router instance
const router = express.Router();
const storage = new multer.memoryStorage();
const uploads = multer({ storage });
// Define routes
router.route("/addProduct").post(verifyJWT, uploads.single("productImage"), addProduct)


router.route("/category/:selectedCategory").get(getProductsByCategoryType)
router.route("/getProduct/:productId").get(getProductById)
router.route("/getProducts").get(searchProducts)
router.route("/getAllProducts").get(getAllProducts)

router.route("/updateProduct/:productId").patch(uploads.single("productImage"), verifyJWT, updateProduct)
router.route("/deleteProduct/:productId").delete(verifyJWT, deleteProduct)
router.route("/countProduct").get(verifyJWT, countProducts);

export default router;
