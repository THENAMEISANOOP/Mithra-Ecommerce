import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { MdShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <div className="text-2xl mb-6 pt-12">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 gap-4 text-gray-600">
          <MdShoppingBag className="text-6xl text-gray-400" />
          <p className="text-lg font-medium">You don’t have any orders yet.</p>
          <button
            onClick={() => navigate("/collection")}
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition-all"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 bg-white flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="flex gap-4">
                <img
                  className="w-20 h-20 object-cover rounded"
                  src={item.image[0]}
                  alt={item.name}
                />
                <div className="text-sm">
                  <p className="font-semibold text-base">{item.name}</p>
                  <p className="text-gray-600 mt-1">
                    Price: {currency}
                    {item.price} | Quantity: {item.quantity} | Size: {item.size}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Date: {new Date(item.date).toDateString()}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Payment: {item.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:w-48">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <p className="text-sm">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
