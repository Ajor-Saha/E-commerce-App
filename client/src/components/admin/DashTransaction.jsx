import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

const DashTransaction = () => {
  const [isAction, setIsAction] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/order/getAllOrders", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setOrders(data.data); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, [accessToken]); // Include accessToken in the dependency array
  
  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAction = (order) => {
    setIsAction(!isAction);
    setOrderDetail(order) 
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {isAction ? (
        <div className="py-20">
          <OrderCard orderDetail={orderDetail} />
          <button onClick={handleAction} className="mt-10 text-center bg-gray-600 px-10 py-2 rounded-md shadow-md text-white">back</button>
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-center text-lg font-bold py-1">All Orders</h2>

            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>FullName</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Aciton</Table.HeadCell>
              </Table.Head>
              
              <Table.Body className="divide-y">
              {currentOrders.map((order) => (
                  <Table.Row
                    key={order._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{order.shipping.email}</Table.Cell>
                    <Table.Cell>{order.shipping.name}</Table.Cell>
                    <Table.Cell>${order.total}</Table.Cell>
                    <Table.Cell>
                      {order.products.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0)}
                    </Table.Cell>
                    <Table.Cell>{order.delivery_status}</Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                        onClick={() => handleAction(order)}
                      >
                        manage
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              
            </Table>
          </div>
          <div className="flex justify-center mt-8">
            {/* Pagination Buttons */}
            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashTransaction;
