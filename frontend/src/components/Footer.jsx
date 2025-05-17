import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-12 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img src={assets.logo} alt="Company Logo" className="h-10" />
            </Link>
            <p className="text-sm text-gray-600">
              Your one-stop shop for premium fashion and accessories. We deliver quality products worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition">
                <FaPinterest className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gray-900 font-semibold text-lg">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>Men's Collection</span></Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>Women's Collection</span></Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>Kids' Collection</span></Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>New Arrivals</span></Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-gray-900 font-semibold text-lg">Help</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>FAQs</span></Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>Shipping Info</span></Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>Returns</span></Link></li>
              <li><Link to="#" className="hover:text-primary-600 transition flex items-center gap-2"><span>Privacy Policy</span></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-gray-900 font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-600 mt-1 flex-shrink-0" />
                <span>123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary-600" />
                <span>support@yourstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6 border-t border-gray-200 pt-6">
          <img src={assets.razorpay_logo} alt="Razorpay" className="h-6" />
          <img src={assets.stripe_logo} alt="Stripe" className="h-6" />
          <span className="text-xs text-gray-500">Credit/Debit Cards</span>
          <span className="text-xs text-gray-500">PayPal</span>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Mithra FashionStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;