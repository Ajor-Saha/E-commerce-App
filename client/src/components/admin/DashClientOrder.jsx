import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import avatar from "../../assets/avatar.jpeg";

const DashClientOrder = () => {
    const [orders, setOrders] = useState([]);
    const { currentUser, error, loading, accessToken } = useSelector((state) => state.user);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`https://e-commerce-app-pearl-six.vercel.app/api/order/getClientOrders`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data.data);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="table-auto flex flex-col  overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <h1 className='font-bold text-lg py-2 text-center'>Your Order History</h1>
            {orders.map((order, index) => (
                <div key={index} className='flex justify-center items-center mb-5'>
                    <Card className="w-80 lg:w-[500px] lg:px-5">
                        {order.products.map((product, productIndex) => (
                            <div key={productIndex} className='flex gap-3'>
                                <img src={product.productImage} alt={product.name} className='w-20 h-20' />
                                <p className='mt-5'>{product.name}</p>
                            </div>
                        ))}
                        <p><span className='font-semibold'>Total :</span> ${order.total}</p>
                        <p><span className='font-semibold'>Payment Status:</span> {order.payment_status}</p>
                        <p><span className='font-semibold'>Delivery Status:</span> {order.delivery_status}</p>
                        <div className='flex flex-col'>
                            <div className='font-semibold'>Shipping Address</div>
                            <div className='flex flex-wrap gap-5'>
                                <span>Country: {order.shipping.address.country}</span>
                                <span>City: {order.shipping.address.city}</span>
                                <span>Post Code: {order.shipping.address.postal_code}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default DashClientOrder;
