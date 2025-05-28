import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t border-gray-200 py-8 px-4 md:px-8">
      <div className="text-2xl mb-6">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 md:p-6 rounded-xl shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
          >
            {/* Product Info */}
            <div className="flex gap-4 w-full lg:w-auto">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <p className="font-semibold text-lg">{item.name}</p>
                <div className="text-sm text-gray-600 mt-1 space-y-1">
                  <p>
                    <span className="font-medium text-gray-800">{currency}{item.price}</span>
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Date: <span className="text-gray-700">25, July 2024</span>
                </p>
              </div>
            </div>

            {/* Status + Button */}
            <div className="flex flex-col lg:items-end gap-2 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <p className="text-green-700 text-sm">Ready To Ship</p>
              </div>
              <button className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition duration-300">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
