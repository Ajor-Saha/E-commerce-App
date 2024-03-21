import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/cart/cartSlice";

const PremiumCard = ({ product }) => {
  const productId = product._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const addToCartHandler = () => {
    dispatch(addToCart(product));
    navigate('/shoppingList')
  };

  const isProductInCart = cartItems.some((item) => item._id === productId);

  return (
    <div className="card dark:dark:bg-[rgb(16,23,42)] card-compact w-80 h-100 bg-base-100 shadow-xl">
      <figure>
        <Link to={`/product/${productId}`}>
          <img src={product.productImage} alt="Shoes" />
        </Link>
      </figure>
      <div className="card-body">
        <Link to={`/product/${productId}`}>
          <h2 className="card-title">{product.name}</h2>
        </Link>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions flex justify-between">
          <span className="mt-2 text-lg font-semibold">${product.price}</span>
          <button
            onClick={addToCartHandler}
            disabled={isProductInCart}
            className="btn btn-primary"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
