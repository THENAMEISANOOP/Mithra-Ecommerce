import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { motion, AnimatePresence } from 'framer-motion';

const Product = () => {
  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [zoomStyle, setZoomStyle] = useState({});

  const fetchProductData = () => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setMainImage(foundProduct.image?.[0] || '');
    }
  };

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.5)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Product Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="flex flex-row-reverse lg:flex-row gap-4 flex-1">
          {/* Thumbnail column - reduced size */}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1">
            {productData.image?.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer transition duration-200 ease-in-out ${
                  mainImage === item ? 'ring-2 ring-blue-500' : 'opacity-80 hover:opacity-100'
                } rounded-md overflow-hidden`}
                onClick={() => handleThumbnailClick(item)}
              >
                <img
                  src={item}
                  alt=""
                  className="w-12 h-12 md:w-14 md:h-14 object-cover"
                />
              </motion.div>
            ))}
          </div>
          
          {/* Main image container - with zoom effect */}
          <div 
            className="flex-1 w-full aspect-square rounded-2xl overflow-hidden shadow-xl bg-gray-100 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode='wait'>
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={productData.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover transition-transform duration-300 ease-out"
                style={zoomStyle}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {productData.name}
          </motion.h1>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <motion.img 
                  key={i}
                  src={assets.star_icon} 
                  alt="star" 
                  className="w-5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                />
              ))}
              <motion.img 
                src={assets.star_dull_icon} 
                alt="star dull" 
                className="w-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35 }}
              />
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pl-2 text-sm text-gray-600"
            >
              (122 reviews)
            </motion.p>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-blue-600"
          >
            {currency}
            {productData.price.toFixed(2)}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-gray-700 leading-relaxed"
          >
            {productData.description}
          </motion.p>

          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-medium text-gray-900">Select Size:</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes?.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSize(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ease-in-out ${
                    size === item
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.button 
            onClick={() => addToCart(productData._id, size)}
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            ADD TO CART
          </motion.button>

          <motion.div 
            className="p-4 bg-blue-50 rounded-lg mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Free Shipping</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description and Reviews Tabs */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews (122)
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'shipping'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Shipping & Returns
            </button>
          </nav>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="py-6"
          >
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                <p className="text-gray-700 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High-quality materials</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Eco-friendly production</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Designed for comfort</span>
                  </li>
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                <div className="mt-4 space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">2 days ago</span>
                      </div>
                      <h4 className="mt-1 font-medium text-gray-900">Great product!</h4>
                      <p className="mt-1 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900">Shipping Options</h4>
                    <ul className="mt-2 space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Free standard shipping on orders over $50</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Express shipping available</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Returns Policy</h4>
                    <ul className="mt-2 space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Easy returns within 30 days</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Free return shipping for defective items</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Related Products */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </motion.div>
    </motion.div>
  );
};

export default Product;