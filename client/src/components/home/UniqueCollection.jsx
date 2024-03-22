import React, { useEffect, useState } from 'react'
import ImageCard from '../card/ImageCard'

const UniqueCollection = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/product/getAllProducts?categoryName=Unique");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white font-sans p-10 dark:bg-darkPurple dark:text-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold  inline-block font-serif">Unique Collection</h2>
            <p className="text-sm mt-6 dark:text-gray-200 font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-md:max-w-lg mx-auto">
          {products.map((product) => (
              <ImageCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
  )
}

export default UniqueCollection
