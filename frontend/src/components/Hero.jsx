import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
        {/* Hero Content (Left Side) */}
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-6 md:space-y-8 lg:space-y-10 order-2 md:order-1 pt-10 md:pt-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-px bg-primary-600"></div>
            <p className="text-sm font-medium tracking-wider text-primary-600 uppercase">
              Our Best Seller
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Latest Arrivals
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-md">
            Discover our newest collection of premium products designed for modern living.
          </p>

          <button className="group flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-300">
            <span className="font-semibold text-lg">Shop Now</span>
            <svg 
              className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Hero Image (Right Side) */}
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end">
          <img 
            src={assets.hero_img} 
            alt="Latest Arrivals" 
            className="w-full max-w-lg object-cover rounded-lg shadow-xl transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero