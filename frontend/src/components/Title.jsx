import React from 'react'
import { motion } from 'framer-motion'

const Title = ({ text1, text2, align = 'left' }) => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex ${alignmentClasses[align]} mb-8`}
    >
      <div className="inline-flex items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
          <span className="text-gray-700">{text1}</span>{' '}
          <span className="text-rose-600">{text2}</span>
        </h2>
        <div className="hidden sm:block w-16 h-1 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 shadow-md"></div>
      </div>
    </motion.div>
  )
}

export default Title
