import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

const fetchProducts = async (category) => {
    try {
      let url;
      if (category === 'All') {
        url = 'https://e-commerce-app-pearl-six.vercel.app/api/product/getAllProducts?categoryType=Men';
      } else {
        url = `https://e-commerce-app-pearl-six.vercel.app/api/product/getAllProducts?categoryName=${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setImages(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="py-10 dark:bg-[rgb(16,23,42)] ">
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          onClick={() => handleCategoryClick("All")}
        >
          All categories
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          onClick={() => handleCategoryClick("Jacket")}
        >
          Jacket
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          onClick={() => handleCategoryClick("Hoodie")}
        >
          Hoodie
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          onClick={() => handleCategoryClick("polo-t-shirt")}
        >
          Polo T-shirt
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          onClick={() => handleCategoryClick("Panjabi")}
        >
          Panjabi
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 px-16">
      {images.map((img) => (
          <Link key={img._id} to={`/product/${img._id}`}>
            <img className="h-80 w-80 rounded-lg" src={img.productImage} alt={img.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
