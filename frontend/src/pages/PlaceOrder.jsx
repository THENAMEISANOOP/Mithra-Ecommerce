import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            setCartItems({});
            navigate("/orders");
          }
        } catch (err) {
          toast.error("Payment verification failed.");
        }
      },
    };
    new window.Razorpay(options).open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [];

      Object.entries(cartItems).forEach(([productId, sizeObj]) => {
        Object.entries(sizeObj).forEach(([size, quantity]) => {
          if (quantity > 0) {
            const item = products.find((p) => p._id === productId);
            if (item) {
              orderItems.push({
                ...item,
                size,
                quantity,
              });
            }
          }
        });
      });

      if (orderItems.length === 0) {
        toast.warning("Your cart is empty.");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let response;

      if (method === "cod") {
        response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          toast.success("Order placed successfully!");
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      }

      if (method === "razorpay") {
        response = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          initPay(response.data.order);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Order placement failed.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 p-4 min-h-[80vh]"
    >
      {/* Left Side: Delivery Info */}
      <div className="flex flex-col gap-3 w-full sm:max-w-[400px]">
        <div className="text-lg sm:text-xl my-2 pt-12">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-2">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First name" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last name" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
        </div>
        <input required name="email" type="email" value={formData.email} onChange={onChangeHandler} placeholder="Email address" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
        <div className="flex gap-2">
          <input required name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
          <input name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
        </div>
        <div className="flex gap-2">
          <input required name="zipcode" type="number" value={formData.zipcode} onChange={onChangeHandler} placeholder="Zipcode" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
          <input required name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
        </div>
        <input required name="phone" type="number" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" className="border border-gray-300 rounded py-1 px-3 w-full text-sm" />
      </div>

      {/* Right Side: Payment + Total */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="mt-4 sm:mt-0 flex flex-col gap-6 sm:min-w-[400px] pt-12"
      >
        <CartTotal />

        <div>
          <div className="text-lg sm:text-xl mb-3">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>
          <div className="flex flex-col gap-3">
            {["razorpay", "cod"].map((type) => (
              <motion.div
                key={type}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setMethod(type)}
                className={`flex items-center gap-2 border rounded p-2 px-3 cursor-pointer text-sm transition-all duration-200 ${
                  method === type ? "border-green-400 bg-green-50" : "border-gray-300"
                }`}
              >
                <motion.div
                  layout
                  className={`min-w-3 h-3 rounded-full border ${
                    method === type ? "bg-green-500 border-green-500" : "border-gray-400"
                  }`}
                />
                {type === "razorpay" && <img src={assets.razorpay_logo} className="h-4 mx-2" alt="razorpay" />}
                {type === "cod" && (
                  <p className="text-gray-500 text-xs font-medium mx-2">CASH ON DELIVERY</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="w-full text-end mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-black text-white px-12 py-2 text-xs sm:text-sm rounded transition"
            >
              PLACE ORDER
            </motion.button>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default PlaceOrder;
