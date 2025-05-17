import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Exchange Policy */}
        <div className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center'>
          <div className='flex justify-center mb-4'>
            <img 
              src={assets.exchange_icon} 
              className='w-12 h-12 object-contain' 
              alt="Easy Exchange" 
            />
          </div>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Easy Exchange</h3>
          <p className='text-gray-600 text-sm md:text-base'>
            We offer hassle-free exchange policy
          </p>
        </div>

        {/* Quality Policy */}
        <div className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center'>
          <div className='flex justify-center mb-4'>
            <img 
              src={assets.quality_icon} 
              className='w-12 h-12 object-contain' 
              alt="Premium Quality" 
            />
          </div>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Premium Quality</h3>
          <p className='text-gray-600 text-sm md:text-base'>
            We guarantee top-notch product quality
          </p>
        </div>

        {/* Support Policy */}
        <div className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center'>
          <div className='flex justify-center mb-4'>
            <img 
              src={assets.support_img} 
              className='w-12 h-12 object-contain' 
              alt="24/7 Support" 
            />
          </div>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>24/7 Support</h3>
          <p className='text-gray-600 text-sm md:text-base'>
            Our customer service is always available
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy