import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Delivery Information */}
        <div className="lg:w-3/5">
          <div className="bg-white rounded-md shadow-xs p-5">
            <div className="mb-5">
              <Title text1={'DELIVERY'} text2={'INFORMATION'} size="sm" />
              <p className="text-gray-500 text-sm mt-1">Enter your shipping details</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Street Address</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">State/Province</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">ZIP Code</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div className="lg:w-2/5 space-y-4">
          <div className="bg-white rounded-md shadow-xs p-5">
            <CartTotal compact />
          </div>
          
          <div className="bg-white rounded-md shadow-xs p-5">
            <div className="mb-4">
              <Title text1={'PAYMENT'} text2={'METHOD'} size="sm" />
              <p className="text-gray-500 text-xs mt-1">Select your payment option</p>
            </div>
            
            <div className="space-y-2">
              <div 
                className={`p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                  method === 'stripe' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setMethod('stripe')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      method === 'stripe' ? 'border-blue-400 bg-blue-400' : 'border-gray-300'
                    }`}>
                      {method === 'stripe' && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span>Credit/Debit Card</span>
                  </div>
                  <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                </div>
              </div>
              
              <div 
                className={`p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                  method === 'razorpay' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setMethod('razorpay')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      method === 'razorpay' ? 'border-blue-400 bg-blue-400' : 'border-gray-300'
                    }`}>
                      {method === 'razorpay' && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span>Razorpay</span>
                  </div>
                  <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                </div>
              </div>
              
              <div 
                className={`p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                  method === 'cod' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setMethod('cod')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === 'cod' ? 'border-blue-400 bg-blue-400' : 'border-gray-300'
                  }`}>
                    {method === 'cod' && (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/orders')}
              className="w-full mt-4 px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
            
            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure payment processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;