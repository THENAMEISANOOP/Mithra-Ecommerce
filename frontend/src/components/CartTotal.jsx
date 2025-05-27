import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div>
      <div className="mb-6">
        <Title text1={'ORDER'} text2={'SUMMARY'} />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{currency}{getCartAmount()}.00</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{currency}{delivery_fee}.00</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="font-medium text-gray-900">Total</span>
          <span className="font-bold text-lg">
            {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;