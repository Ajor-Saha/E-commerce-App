import React from "react";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const { _id } = useSelector((state) => state.user.currentUser);
  //console.log(cartItems);
  const handleCheckout = () => {
    fetch("https://e-commerce-app-pearl-six.vercel.app/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        userId: _id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          console.log(data.url);
          window.location.href = data.url;
        } 
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <button
        className="bg-[#333] text-white w-full py-3 mt-6 font-semibold text-center rounded-md"
        onClick={() => handleCheckout()}
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default PayButton;
