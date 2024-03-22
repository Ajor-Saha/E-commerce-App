import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const { description, name, price, stock, color, size, category } = req.body;

  // Validate required fields
  if ([description, name, price, stock].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "All fields are required");
  }

  const productImageLocalPath = req.files?.productImage[0]?.path;

  if (!productImageLocalPath) {
    throw new ApiError(401, "ProductImage file is required");
  }

  const productImage = await uploadOnCloudinary(productImageLocalPath);

  if (!productImage) {
    throw new ApiError(401, "productImage file is required");
  }


  // Create the product object
  const newProduct = await Product.create({
    name,
    description,
    productImage: productImage.url,
    price,
    stock,
    category,
    owner: req.user._id,
    color: color || [],
    size: size || [],
  });

  const createdProduct = await Product.findById(newProduct._id);

  return res
    .status(201)
    .json(new ApiResponse(200, createdProduct, "Product add successfully"));
});

const getProductsByCategoryType = asyncHandler(async (req, res) => {
  const { selectedCategory } = req.params;

  // Query products with matching category type
  const products = await Product.find({ "category.type": selectedCategory });

  if (!products) {
    throw new ApiError(401, "No product found");
  }

  // Return products
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        products,
        `Products with category type '${selectedCategory}' fetched successfully`
      )
    );
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById({ _id: productId });

  if (!product) {
    throw new ApiError(401, "Product not found");
  }

  // Return product
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        product,
        `Product with ID '${productId}' fetched successfully`
      )
    );
});

const getAllProducts = asyncHandler(async (req, res) => {
  // const userId = req.user._id;
  // const user = await User.findById({ _id: userId });

  // if (!user) {
  //   throw new ApiError(404, "User not found");
  // }

  // if (!user.isAdmin) {
  //   throw new ApiError(403, "Unauthorized access");
  // }

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const query = {};

    // Filter by category name
    if (req.query.categoryName) {
      query["category.name"] = req.query.categoryName;
    }

    // Filter by category type
    if (req.query.categoryType) {
      query["category.type"] = req.query.categoryType;
    }

    // Query all products with pagination
    const products = await Product.find(query)
      .sort({ createdAt: sortDirection }) // Sort based on date
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Count total number of products matching the query
    const totalProducts = await Product.countDocuments(query);

    // Send response
    res.status(201).json({
      success: true,
      products,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
  }
});

const searchProducts = asyncHandler(async (req, res) => {
  try {
    // Extract search parameters from query string and convert to lowercase
    const { searchTerm, sort, category } = req.query;

    const query = {};
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { 'category.name': { $regex: searchTerm, $options: 'i' } }
      ];
    }
    if (category) {
      query['category.name'] = category;
    }

    let products;

    // If no query parameters are provided, fetch all products
    if (Object.keys(query).length === 0) {
      products = await Product.find();
    } else {
      products = await Product.find(query);
    }


    if (sort) {
      if (sort === 'asc') {
        products = products.sort((a, b) => a.createdAt - b.createdAt);
      } else if (sort === 'desc') {
        products = products.sort((a, b) => b.createdAt - a.createdAt);
      }
    }
    const totalProducts = products.length;

    res.status(201).json({
      success: true,
      products: products,
      totalProducts
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const updateProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isAdmin) {
    throw new ApiError(403, "Unauthorized access");
  }

  const { productId } = req.params;
  const existProduct = await Product.findById({ _id: productId });
  const { description, name, price, stock, color, size } = req.body;

  // Check if any required fields are missing
  if (!existProduct) {
    throw new ApiError(401, "Product Id is not found");
  }

  // Initialize an empty object to store the update fields
  const updateFields = {};

  // Check and update each field if provided
  if (description !== undefined) updateFields.description = description;
  if (name !== undefined) updateFields.name = name;
  if (price !== undefined) updateFields.price = price;
  if (stock !== undefined) updateFields.stock = stock;
  if (color !== undefined) updateFields.color = color;
  if (size !== undefined) updateFields.size = size;

  let productImage;
  if (
    req.files &&
    Array.isArray(req.files.productImage) &&
    req.files.productImage.length > 0
  ) {
    const productImageLocalPath = req.files.productImage[0].path;
    const uploadedProductImage = await uploadOnCloudinary(
      productImageLocalPath
    );
    if (!uploadedProductImage) {
      throw new ApiError(400, "Error while uploading productImage");
    }
    productImage = uploadedProductImage.url;
    updateFields.productImage = productImage; // Include productImage if it's provided
  }

  // Check if any fields are provided for update
  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(401, "No fields provided for update");
  }

  // Update the product details
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: updateFields },
    { new: true } // Return the updated document
  );

  // If no product is found, return a 404 error
  if (!updatedProduct) {
    throw new ApiError(401, "Product not found");
  }

  // Return the updated product as a response
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        "Product details updated successfully"
      )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  // Check if the user is an admin
  const userId = req.user._id;
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if (!user.isAdmin) {
    throw new ApiError(401, "Unauthorized access");
  }

  // Extract productId from the request parameters
  const { productId } = req.params;

  // Check if productId is provided
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  // Find the product by ID and delete it
  const deletedProduct = await Product.findByIdAndDelete({ _id: productId });

  // If no product is found with the given ID, return a 404 error
  if (!deletedProduct) {
    throw new ApiError(404, "Product not found");
  }

  // Return a success message

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});


const countProducts = asyncHandler(async(req, res) => {
  const user = await User.findById({ _id:req.user._id });
  if (!user) {
    throw new ApiError(401, "user not found");
  }

  if (!user.isAdmin) {
    throw new ApiError(401, "Unauthorized request")
  }

  try {
    const menProducts = await Product.find({ 'category.type': 'Men' });
    const womenProducts = await Product.find({ 'category.type': 'Women' });
    const kidsProducts = await Product.find({ 'category.type': 'Kids' });

    const totalProducts = menProducts.length + womenProducts.length + kidsProducts.length;

    const menProductsCount = menProducts.length;
    const womenProductsCount = womenProducts.length;
    const kidsProductsCount = kidsProducts.length;

    const menPercentage = Math.round((menProductsCount / totalProducts) * 100);
    const womenPercentage = Math.round((womenProductsCount / totalProducts) * 100);
    const kidsPercentage = Math.round((kidsProductsCount / totalProducts) * 100);


    res.status(200).json({
      success: true,
      counts: {
        men: menPercentage,
        women: womenPercentage,
        kids: kidsPercentage
      }
    });
  } catch (error) {
    console.error("Error counting products:", error);
    throw new ApiError(500, "Internal server error");
  }

})

export {
  addProduct,
  getProductsByCategoryType,
  getAllProducts,
  searchProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  countProducts
};
