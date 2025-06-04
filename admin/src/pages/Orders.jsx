import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiHome, FiDollarSign, FiPhone, FiCalendar } from 'react-icons/fi';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusOptions = [
    { value: "Order Placed", label: "Order Placed", icon: <FiClock className="mr-1" /> },
    { value: "Packing", label: "Packing", icon: <FiPackage className="mr-1" /> },
    { value: "Shipped", label: "Shipped", icon: <FiTruck className="mr-1" /> },
    { value: "Out for delivery", label: "Out for Delivery", icon: <FiTruck className="mr-1" /> },
    { value: "Delivered", label: "Delivered", icon: <FiCheckCircle className="mr-1" /> }
  ];

  const fetchAllOrders = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(`Order status updated to ${event.target.value}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      case 'Packing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Out for delivery': return 'bg-orange-100 text-orange-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <img src={assets.parcel_icon} alt="No orders" className="w-20 h-20 mx-auto opacity-50" />
            <p className="mt-4 text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="mx-3 text-gray-300">|</span>
                    <span className="text-sm font-medium">Order ID: {order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-500 mr-1" />
                    <span className="font-medium">{currency}{order.amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FiPackage className="mr-2" /> Order Items ({order.items.length})
                    </h3>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <div>
                            <span className="text-gray-800">{item.name}</span>
                            {item.size && (
                              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                                {item.size}
                              </span>
                            )}
                          </div>
                          <span className="text-gray-600">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FiHome className="mr-2" /> Customer Details
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city}, {order.address.state} {order.address.zipcode}
                      </p>
                      <p>{order.address.country}</p>
                      <div className="flex items-center mt-2">
                        <FiPhone className="mr-2 text-gray-500" />
                        <span>{order.address.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Order Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className={order.payment ? 'text-green-600' : 'text-yellow-600'}>
                          {order.payment ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Order Status:</span>
                        <select
                          onChange={(e) => statusHandler(e, order._id)}
                          value={order.status}
                          className={`px-3 py-1 rounded text-sm ${getStatusColor(order.status)} border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;