import React, { useEffect, useState } from "react";
import NewProductCard from "../card/NewProductCard";
import Skeleton from "../card/Skeleton";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/product/getAllProducts?page=1");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-10 dark:bg-darkPurple">
      <h1 className="text-center font-semibold text-lg bg-newarrival py-8 dark:text-gray-800 font-serif">NEW ARRIVAL</h1>
      <div className="font-[sans-serif] bg-gray-100 dark:bg-darkPurple mt-5">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
              <>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                
              </>
            ) : (
              // Render products once data is fetched
              products.map((product) => (
                <NewProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
