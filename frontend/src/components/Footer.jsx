import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const socialIcons = [
  { icon: <FaFacebookF />, alt: 'Facebook', href: 'https://facebook.com' },
  { icon: <FaTwitter />, alt: 'Twitter', href: 'https://twitter.com' },
  { icon: <FaInstagram />, alt: 'Instagram', href: 'https://instagram.com' },
  { icon: <FaLinkedinIn />, alt: 'LinkedIn', href: 'https://linkedin.com' },
]

const Footer = () => {
  const companyLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Delivery', path: '/delivery' },
    { name: 'Privacy Policy', path: '/privacy' }
  ]

  return (
    <footer className="bg-gray-50 mt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <img 
              src={assets.logo} 
              className="w-36 mb-6" 
              alt="Fashion Store Logo"
              loading="lazy"
            />
            <p className="text-gray-600 mb-6">
              Elevating your style with carefully curated fashion pieces. Our mission is to bring you the latest trends while maintaining timeless elegance.
            </p>
            
            <div className="flex gap-4">
              {socialIcons.map(({ icon, alt, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-rose-600 flex items-center justify-center"
                  aria-label={alt}
                >
                  <span className="text-lg">{icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-serif font-medium text-gray-900 mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href={link.path} 
                    className="text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-serif font-medium text-gray-900 mb-6">Get in Touch</h3>
            <address className="not-italic text-gray-600 space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+2255" className="hover:text-rose-600 transition-colors">+91 9656081913</a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@foreveryou.com" className="hover:text-rose-600 transition-colors">contact@MithraFashion.com</a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Mithra Fashion, Kollam Kerala</span>
              </div>
            </address>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} MithraFashion. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-rose-600 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-rose-600 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-rose-600 transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
