import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter(item => item.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Our <span className="text-amber-600">Best Sellers</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Customer favorites – these timeless pieces never go out of style.
            Loved by many, now available for you.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {bestSeller.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Best Seller Badge */}
              <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-[10px] px-2 py-1 font-semibold rounded shadow">
                BESTSELLER
              </div>
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
