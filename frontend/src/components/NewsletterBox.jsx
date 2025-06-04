import React, { useState } from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    // Simple email regex for validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    // Simulate backend submission
    console.log('Subscribed with:', email)
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50 to-amber-50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-3"
        >
          Subscribe now & get <span className="text-rose-600">20% off</span> your first order
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Join our fashion community and be the first to know about new arrivals, exclusive offers, and style tips.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-100 text-green-700 py-3 px-6 rounded-full inline-block"
          >
            Thank you for subscribing!
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={onSubmitHandler}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-grow px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-rose-600 transition-colors shadow-lg hover:shadow-rose-200 whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </motion.form>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-sm text-red-600"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default NewsletterBox
