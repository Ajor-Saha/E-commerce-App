import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { json, useParams } from "react-router-dom";

const EditPage = () => {
  const { productId } = useParams();
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
 
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    productImage: null,
    price: "",
    stock: "",
    categoryName: "",
    categoryType: "",
    color: "",
    size: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://e-commerce-app-pearl-six.vercel.app/api/product/getProduct/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        const {
          name,
          description,
          price,
          stock,
          category,
          productImage,
          color,
          size,
        } = data.data;
        setProductData({
          name,
          description,
          price,
          stock,
          productImage,
          categoryName: category.name,
          categoryType: category.type,
          color: Array.isArray(color) ? color.join(", ") : color,
          size: Array.isArray(size) ? size.join(", ") : size,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setProductData({
        ...productData,
        productImage: file, 
      });
      
    }
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      name,
      description,
      price,
      stock,
      categoryName,
      categoryType,
      color,
      size,
      productImage,
    } = productData;
    
    

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("stock", stock);
    data.append("category[name]", categoryName);
    data.append("category[type]", categoryType);
    data.append("color", color);
    data.append("size", size);
    data.append("productImage", productImage);

    try {
      const response = await fetch(`https://e-commerce-app-pearl-six.vercel.app/api/product/updateProduct/${productId}`, {
        method: "PATCH",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        body: data,
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setLoading(false);
        alert("Product updated successfully!");
        const {
          name,
          description,
          price,
          stock,
          category,
          productImage,
          color,
          size,
        } = responseData.data;
        setProductData({
          name,
          description,
          price,
          stock,
          productImage,
          categoryName: category.name,
          categoryType: category.type,
          color: Array.isArray(color) ? color.join(", ") : color,
          size: Array.isArray(size) ? size.join(", ") : size,
        });
      } else {
        throw new Error(
          responseData.message || "Failed to update product"
        );
      }
      
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Failed to update product: " + error.message);
    }

  }


  return (
    <div className="py-32 flex flex-col justify-center items-center dark:text-gray-50 dark:bg-gray-900">
      <h1 className="text-xl font-semibold">Edit Product</h1>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 dark:text-black">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input input-bordered input-accent w-80 md:w-96"
            value={productData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="textarea textarea-accent"
            placeholder="Product Description"
            onChange={handleChange}
            value={productData.description}
          ></textarea>
           {/* Display the productImage */}
          {productData.productImage && (
            <img
              src={productData.productImage}
              alt="Product Preview"
              className="w-20 h-20 rounded-full cursor-pointer"
            />
          )}
          <input
            type="file"
            name="productImage"
            accept="image/*"
            className="file-input file-input-bordered w-80 md:w-96"
            onChange={handleImageChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={productData.price}
          />
          <input
            type="number"
            name="stock"
            placeholder="Product Stock"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={productData.stock}
          />
          <input
            type="text"
            name="categoryName"
            placeholder="Product Category Name"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={productData.categoryName}
          />
          <input
            type="text"
            name="categoryType"
            placeholder="Product Category Type"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={productData.categoryType}
          />

          <input
            type="text"
            name="color"
            placeholder="Product Color"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={productData.color}
          />
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Product Size"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={productData.size}
          />
          <button type="submit" class="btn btn-neutral">
          {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
