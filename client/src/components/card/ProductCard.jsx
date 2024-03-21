import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cart/cartSlice";

const ProductCard = ({ product }) => {
  const productId = product._id;

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  const isProductInCart = cartItems.some((item) => item._id === productId);

  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 dark:text-gray-50 bg-white dark:bg-gray-800 shadow-md">
      <Link
        to={`/product/${productId}`}
        className="relative mx-3 mt-3 flex justify-center items-center h-72 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="object-cover"
          src={product.productImage}
          alt="product image"
        />
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to={`/product/${productId}`}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ${product.price}
            </span>
          </p>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            {/* Repeat the above SVG elements for each star */}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold dark:bg-yellow-400">
              5.0
            </span>
          </div>
        </div>
        <button
          onClick={addToCartHandler}
          disabled={isProductInCart}
          className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {isProductInCart ? 'Already in Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
