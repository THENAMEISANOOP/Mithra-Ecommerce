import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [zoomImage, setZoomImage] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-12 px-4 sm:px-8 max-w-7xl mx-auto" // Increased top padding
    >
      {/*----------- Product Data-------------- */}
      <div className="flex gap-8 xl:gap-12 flex-col lg:flex-row">
        {/*---------- Product Images------------- */}
        <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
          {/* Thumbnails Column */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:h-[400px] sm:w-[70px] w-full snap-x snap-mandatory">
            {productData.image.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                key={index}
                className="flex-shrink-0 sm:w-full cursor-pointer snap-start"
                onClick={() => setImage(item)}
              >
                <img
                  src={item}
                  className={`w-20 h-20 sm:w-full sm:h-20 object-cover rounded-md border ${
                    image === item ? "border-green-500 border-2" : "border-gray-200"
                  }`}
                  alt=""
                />
              </motion.div>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="w-full sm:w-[calc(100%-86px)] relative">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="cursor-zoom-in flex justify-center"
              onClick={() => setZoomImage(!zoomImage)}
            >
              <img 
                src={image} 
                className="w-full max-w-md h-auto max-h-[400px] object-contain rounded-lg shadow-sm" 
                alt=""
              />
            </motion.div>
            
            <AnimatePresence>
              {zoomImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
                  onClick={() => setZoomImage(false)}
                >
                  <motion.img
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    src={image}
                    className="max-w-full max-h-screen object-contain"
                    alt=""
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1 lg:max-w-md mt-4 sm:mt-0">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-bold text-2xl sm:text-3xl mb-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(4)].map((_, i) => (
                <img src={assets.star_icon} alt="" className="w-4" key={i} />
              ))}
              <img src={assets.star_dull_icon} alt="" className="w-4" />
              <span className="text-gray-600 ml-2">(122 reviews)</span>
            </div>
            
            <motion.p 
              className="text-2xl sm:text-3xl font-bold mb-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currency}
              {productData.price}
            </motion.p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              {productData.description}
            </p>
            
            <div className="mb-8">
              <p className="font-medium mb-3">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSize(item)}
                    className={`px-5 py-2 rounded-full border ${
                      item === size 
                        ? "bg-green-100 border-green-500 text-green-700" 
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                    key={index}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!token) {
                  toast.error("Please login to add items to your cart");
                  return;
                }
                if (!size) {
                  toast.warning("Please select a size");
                  return;
                }
                addToCart(productData._id, size);
              }}
              className="w-full bg-black text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md mb-8"
            >
              ADD TO CART
            </motion.button>
            
            <div className="space-y-3 text-sm text-gray-600 border-t pt-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>100% Original product</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>Cash on delivery available</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>Easy 7-day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className="mt-12 mb-16"> {/* Reduced margin for better spacing */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 font-medium ${
              activeTab === "description" 
                ? "text-green-600 border-b-2 border-green-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-medium ${
              activeTab === "reviews" 
                ? "text-green-600 border-b-2 border-green-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews (122)
          </button>
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 text-gray-700 leading-relaxed"
        >
          {activeTab === "description" ? (
            <>
              <p className="mb-4">
                Our premium product combines cutting-edge technology with elegant design to deliver 
                an unparalleled user experience. Each component is carefully crafted using 
                sustainable materials and undergoes rigorous quality testing.
              </p>
              <p className="mb-4">
                The ergonomic design ensures maximum comfort during extended use, while the 
                advanced features provide functionality that adapts to your lifestyle.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>High-quality, durable materials</li>
                <li>Eco-friendly manufacturing process</li>
                <li>12-month warranty included</li>
              </ul>
            </>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <div className="text-4xl font-bold">4.2</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center mb-1">
                      <div className="w-10 text-sm">{stars} star</div>
                      <div className="flex-1 mx-2 h-2.5 bg-gray-200 rounded-full">
                        <div className="h-2.5 bg-yellow-400 rounded-full" style={{ width: `${stars * 20}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b pb-6 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-3">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="font-medium">John D.</div>
                      <div className="text-gray-400 text-sm ml-auto">2 weeks ago</div>
                    </div>
                    <p className="text-gray-600">This product exceeded my expectations. The quality is outstanding and it's very comfortable to use.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* --------- display related products ---------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </motion.div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;