import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeCartItem } from "../../redux/cart/cartSlice";

const ShoppingCard = ({ product }) => {

    const dispatch = useDispatch();

    const handleRemoveItem = (productId) => {
        dispatch(removeCartItem(productId));
    }

    const handleIncrementQuantity = (productId) => {
        dispatch(incrementQuantity({ productId }))
    }

    const handleDecrementQuantity = (productId) => {
        dispatch(decrementQuantity({ productId }));
      };
    

    const productQuantity = useSelector(state => {
        const item = state.cart.cartItems.find(item => item._id === product._id);
        return item ? item.quantity : 0;
    });

    
    const subtotal = product.price * productQuantity;
    
    const formattedSubtotal = subtotal ? subtotal.toFixed(2) : '0.00'; // Provide a default value if subtotal is null


    const getColorClass = (color) => {
        switch (color.trim().toLowerCase()) {
          case 'red':
            return 'bg-red-400';
          case 'blue':
            return 'bg-blue-400';
          case 'olive':
            return 'bg-green-600';
          default:
            return 'bg-gray-400'; // Default color if not found
        }
    };

  return (
    <div className="flex items-start max-sm:flex-col gap-8 py-6">
      <div className="h-52 shrink-0">
        <img
          src={product.productImage}
          className="w-full h-full object-contain rounded-md"
          alt="Product"
        />
      </div>
      <div className="flex items-start gap-6 max-md:flex-col w-full">
        <div>
          <h3 className="text-xl font-extrabold text-[#333] dark:text-white mb-6">
            {product.name}
          </h3>
          <div>
            <h6 className="text-md text-gray-500 dark:text-gray-50">
              Size: <strong className="ml-2">7.5</strong>
            </h6>
            <div className="flex flex-wrap gap-4 mt-4">
                {product.color[0].split(",").map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-12 h-12 border-2 border-white hover:border-gray-800 rounded-full shrink-0 
                    ${getColorClass(color)}
                    )}`}
                  ></button>
                ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-6">
            <button
              type="button"
              className="font-semibold text-gray-500 dark:text-gray-100 text-sm flex items-center gap-2 shrink-0"
              onClick={() => handleRemoveItem(product._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 fill-current inline"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                  data-original="#000000"
                ></path>
              </svg>
              Remove
            </button>
          </div>
        </div>
        <div className="md:ml-auto md:text-right">
          <div className="flex">
            <button
              type="button"
              className="bg-transparent py-2 font-semibold text-[#333] dark:text-gray-50"
              onClick={() => handleDecrementQuantity(product._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-current"
                viewBox="0 0 124 124"
              >
                <path
                  d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="bg-transparent mx-4 px-4 py-2 font-semibold text-[#333] dark:text-gray-50 text-md border"
            >
              {productQuantity}
            </button>
            <button
              type="button"
              className="bg-transparent py-2 font-semibold text-[#333] dark:text-gray-50"
              onClick={() => handleIncrementQuantity(product._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-current"
                viewBox="0 0 42 42"
              >
                <path
                  d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-bold text-[#333] dark:text-gray-50">
              <strike className="text-gray-500 dark:text-gray-50 mr-2 font-medium">$22.5</strike>
            </h4>
            <h4 className="text-lg font-bold text-[#333] dark:text-gray-50 mt-2">${formattedSubtotal}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;

