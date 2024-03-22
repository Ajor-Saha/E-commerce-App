import React, { useState } from "react";
import { useSelector } from "react-redux";

const DashAddProduct = () => {
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryName: "",
    categoryType: "",
    color: "",
    size: "",
    productImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    const colorArray = formData.color.split(",").map((c) => c.trim());
    const sizeArray = formData.size.split(",").map((s) => s.trim());

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category[name]", formData.categoryName);
    data.append("category[type]", formData.categoryType);
    data.append("color", JSON.stringify(colorArray));
    data.append("size", JSON.stringify(sizeArray));
    data.append("productImage", formData.productImage);

    try {
      const response = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/product/addProduct", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: data,
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        setLoading(false);
        alert("Product added successfully!");
        
        // Optionally, you can reset the form here
        setFormData({
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
      } else {
        throw new Error(responseData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 mb-10 dark:text-gray-900 mx-auto">
      <h1 className="text-center dark:text-gray-50 mb-5 text-lg font-semibold">
        Add New Product
      </h1>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input input-bordered input-accent w-80 md:w-96"
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="textarea textarea-accent"
            placeholder="Product Description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <input
            type="file"
            name="productImage"
            className="file-input file-input-bordered w-80 md:w-96"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={formData.price}
          />
          <input
            type="number"
            name="stock"
            placeholder="Product Stock"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={formData.stock}
          />
          <input
            type="text"
            name="categoryName"
            placeholder="Product Category Name"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={formData.categoryName}
          />
          <input
            type="text"
            name="categoryType"
            placeholder="Product Category Type"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={formData.categoryType}
          />

          <input
            type="text"
            name="color"
            placeholder="Product Color"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={formData.color}
          />
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Product Size"
            className="input input-bordered input-accent w-80 md:w-96"
            onChange={handleChange}
            value={formData.size}
          />
          <button type="submit" className="btn btn-neutral" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashAddProduct;
