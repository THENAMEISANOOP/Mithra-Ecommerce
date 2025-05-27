import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Title text1={'YOUR'} text2={'CART'} />
        <p className="text-gray-500 mt-2">Review your items before checkout</p>
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
          <button 
            onClick={() => navigate('/collection')}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {cartData.map((item, index) => {
                const productData = products.find(product => product._id === item._id);
                return (
                  <div key={index} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        className="w-24 h-24 rounded-lg object-cover border border-gray-100" 
                        src={productData.image[0]} 
                        alt={productData.name} 
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{productData.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-gray-900 font-medium">{currency}{productData.price}</span>
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">{item.size}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                          <input 
                            onChange={(e) => e.target.value === '' || e.target.value === '0'
                              ? null : updateQuantity(item._id, item.size, parseInt(e.target.value))}
                            className="w-16 px-3 py-2 text-center border-0 focus:ring-2 focus:ring-blue-500"
                            type="number" 
                            min={1} 
                            defaultValue={item.quantity} 
                          />
                        </div>
                        
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <CartTotal />
              
              <button
                onClick={() => navigate('/place-order')}
                className="w-full mt-6 px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>Place Order</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-500">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;