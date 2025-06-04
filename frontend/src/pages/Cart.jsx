import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
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
    }
  }, [cartItems, products]);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 max-w-[100vw] overflow-x-hidden mx-auto mt-8">
      {/* Title */}
      <div className="text-3xl font-semibold mb-6 select-none max-w-[1200px] mx-auto">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Empty Cart */}
      {cartData.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 animate-fadeInSlow">
          <FiShoppingCart className="text-6xl text-gray-400 mb-4 animate-pop" />
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white text-sm px-6 py-2 rounded-md hover:bg-gray-800 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      )}

      {/* Main Grid */}
      {cartData.length > 0 && (
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-5">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product?._id === item._id
              );

              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 p-4 rounded-md border border-gray-200 shadow-sm opacity-0 animate-fadeIn"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {/* Product Image */}
                  <img
                    src={productData.image?.[0] || assets.upload_area}
                    alt={productData.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-3 text-gray-700 text-xs sm:text-sm flex-wrap">
                      <span>
                        {currency}
                        {productData.price}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{`Size: ${item.size}`}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border rounded px-2 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="text-sm p-1 hover:scale-110 transition-transform"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="px-1 min-w-[20px] text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      className="text-sm p-1 hover:scale-110 transition-transform"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    aria-label="Remove item"
                    className="hover:scale-110 transition-transform"
                  >
                    <img src={assets.bin_icon} alt="Remove" className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart Total & Checkout */}
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md shadow-sm">
              <CartTotal />
            </div>
            <button
              onClick={() => navigate("/place-order")}
              className="w-full bg-black text-white text-sm sm:text-base py-2 sm:py-3 rounded-md hover:bg-gray-800 transition-all duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        @keyframes fadeInSlow {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
          animation-duration: 0.4s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 0.5s ease-out forwards;
        }
        .animate-pop {
          animation: pop 0.4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Cart;
