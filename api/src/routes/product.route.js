import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct, countProducts, deleteProduct, getAllProducts, getProductById, getProductsByCategoryType, searchProducts, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

// Create a router instance
const router = express.Router();

// Define routes
router.route("/addProduct").post(
    upload.fields([
      {
        name: "productImage",
        maxCount: 1
      }
    ]),
    verifyJWT, addProduct
)


router.route("/category/:selectedCategory").get(getProductsByCategoryType)
router.route("/getProduct/:productId").get(getProductById)
router.route("/getProducts").get(searchProducts)
router.route("/getAllProducts").get(getAllProducts)

router.route("/updateProduct/:productId").patch(upload.single('productImage'),verifyJWT, updateProduct)
router.route("/deleteProduct/:productId").delete(verifyJWT, deleteProduct)
router.route("/countProduct").get(verifyJWT, countProducts);

export default router;
