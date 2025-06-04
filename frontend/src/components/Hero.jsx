import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[100vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-rose-50 to-amber-50 rounded-3xl overflow-hidden shadow-xl h-[90vh] md:h-[80vh]">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 p-6 md:p-10 order-2 md:order-1 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto md:mx-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-rose-600"></div>
                <span className="text-sm tracking-wider text-rose-600 font-semibold">
                  NEW COLLECTION
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6 playfair-display">
                Elegant Styles <span className="text-rose-600">For Every</span> Occasion
              </h1>

              <Link
                to="/collection"
                className="inline-block btn-primary transition-all duration-300 hover:scale-105"
              >
                Discover Now
              </Link>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2 order-1 md:order-2 h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full"
            >
              <img
                src={assets.heroright}
                alt="Fashion Model"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent md:hidden"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
