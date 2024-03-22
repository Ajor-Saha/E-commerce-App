import { Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.jpeg";
import { useSelector } from "react-redux";

const OrderCard = ({ orderDetail }) => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [status, setStatus] = useState("Processing");
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = [];
        for (const product of orderDetail.products) {
          const response = await fetch(
            `https://e-commerce-app-pearl-six.vercel.app/api/product/getProduct/${product.productId}`
          ); // Assuming you have an endpoint to fetch product details by productId
          const data = await response.json();
          if (data) {
            productDetails.push({
              product: data.data, // Product details fetched from backend
              quantity: product.quantity, // Quantity from orderDetail
            });
          }
        }
        setOrderedProducts(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [orderDetail]);

  //console.log(orderDetail);

  const handleProcessStatus = async () => {
    try {
      // Send a PATCH request to update the order status
      const response = await fetch(
        `https://e-commerce-app-pearl-six.vercel.app/api/order/updateDelivery/${orderDetail._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include access token in the request headers
          },
        }
      );

      if (response.ok) {
        // If the request is successful, update the local status state
        setStatus("Shipped");
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div>
        <Card className="max-w-lg">
          <h1 className="text-center font-bold text-lg">ORDER ITEMS</h1>
          {orderedProducts.map((orderedProduct, index) => (
            <div key={index} className="flex items-center gap-2">
              <img
                src={orderedProduct.product.productImage}
                alt={orderedProduct.product.name}
                className="w-24"
              />
              <div className="flex flex-row gap-4 mt-5">
                <span>{orderedProduct.product.name}</span>
                <span>
                  {orderedProduct.quantity}x{orderedProduct.product.price} = $
                  {orderedProduct.quantity * orderedProduct.product.price}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
      <div>
        <Card className="max-w-lg">
          <h1 className="text-center font-bold text-lg">ORDER INFO</h1>
          <div className="flex flex-col">
            <h3 className="font-semibold">User Info</h3>
            <span>Name: {orderDetail.shipping.name}</span>
            <span>Email: {orderDetail.shipping.email}</span>
            <span>Phone: {orderDetail.shipping.phone}</span>
            <span>
              Address: {orderDetail.shipping.address.line1},{" "}
              {orderDetail.shipping.address.city},{" "}
              {orderDetail.shipping.address.country} -{" "}
              {orderDetail.shipping.address.postal_code}
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold">Amount Info</h3>
            <span>Subtotal: ${orderDetail.subtotal}</span>
            <span>Shipping Charges: $0.00</span>{" "}
            {/* Assuming shipping charges are not included */}
            <span>Tax: $0</span>
            <span>Total: ${orderDetail.total}</span>
          </div>
          <div>
            <h3 className="font-semibold">Status Info</h3>
            <span>
            Status: <span className="text-red-600">{status}</span>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Button
              className="px-4 py-1 lg:px-8 lg:py-2 text-black dark:text-white dark:bg-blue-500 bg-blue-500"
              onClick={handleProcessStatus}
            >
              Proess Status
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderCard;
