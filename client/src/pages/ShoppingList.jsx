import React, { useEffect } from "react";
import ShoppingCard from "../components/card/ShoppingCard";
import { useDispatch, useSelector } from "react-redux";
import { calculatePrice } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import PayButton from "../components/utils/PayButton"

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { cartItems, subtotal, shippingCharges, tax, total } = useSelector(
    (state) => state.cart
  );
 // console.log(cartItems);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const payButtonCartItems = cartItems.map(({ _id, name, productImage, price, quantity }) => ({
    _id,
    name,
    productImage, // Pass productImage as image
    price,
    quantity,
  }));

  //console.log(payButtonProps);

  useEffect(() => {
    // Calculate prices whenever cartItems change
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  return (
    <div className="font-[sans-serif] py-20 mt-10 dark:bg-gray-900 bg-white">
      <div className="grid lg:grid-cols-3 gap-12 p-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 dark:text-white divide-y px-5 ml-20 mr-20 md:ml-0 md:mr-0 md:px-0">
          {cartItems.map((product, index) => (
            <ShoppingCard key={index} product={product} />
          ))}
        </div>

        <div className="lg:col-span-1 mt-12 lg:mt-0 dark:bg-gray-900 dark:text-white text-[#333]">
          <div className="p-6">
            <h3 className="text-xl font-extrabold mb-6">
              Order Summary
            </h3>
            <div className="flex justify-between items-center mb-6">
              <h6 className="text-md text-gray-500 dark:text-white">Subtotal</h6>
              <h6 className="text-md text-[#333] dark:text-white">
                ${subtotal ? subtotal.toFixed(2) : "0.00"}
              </h6>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h6 className="text-md ">Shipping</h6>
              <h6 className="text-md ">
                ${shippingCharges ? shippingCharges.toFixed(2) : "0.00"}
              </h6>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h6 className="text-md ">Tax</h6>
              <h6 className="text-md">
                ${tax ? tax.toFixed(2) : "0.00"}
              </h6>
            </div>
            <div className="flex justify-between items-center border-t pt-6">
              <h6 className="text-lg font-semibold">Total</h6>
              <h6 className="text-lg font-semibold ">
                ${total ? total.toFixed(2) : "0.00"}
              </h6>
            </div>
            {currentUser? (
              <PayButton cartItems={payButtonCartItems} />
            ) : (
              <button
                className="bg-[#333] text-white w-full py-3 mt-6 font-semibold text-center rounded-md"
                onClick={() => navigate("/login")}
              >
                Login to Check out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;

{
  /* <button
                type="button"
                className="bg-[#333] text-white w-full py-3 mt-6 font-semibold text-center rounded-md"
              >
                Proceed to checkout
              </button> */
}
