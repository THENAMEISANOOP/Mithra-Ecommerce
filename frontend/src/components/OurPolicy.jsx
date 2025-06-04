import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const policyItems = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    description: "Hassle-free exchanges within 14 days"
  },
  {
    icon: assets.quality_icon,
    title: "7 Days Returns",
    description: "Free returns within 7 days of purchase"
  },
  {
    icon: assets.support_img,
    title: "24/7 Support",
    description: "Dedicated customer care always available"
  }
]

const OurPolicy = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {policyItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-rose-100 rounded-full">
                <img 
                  src={item.icon} 
                  className="w-10 h-10 object-contain"
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy
