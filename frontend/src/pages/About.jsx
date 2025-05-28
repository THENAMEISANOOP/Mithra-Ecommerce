import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { FiAward, FiUsers, FiShoppingBag } from 'react-icons/fi';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <Title text1={'ABOUT'} text2={'US'} className="text-white" />
          <p className="max-w-2xl mx-auto mt-6 text-lg">
            Discover our story and what makes us the right choice for you
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img 
              src={assets.about_img} 
              alt="Our Team" 
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2023, we started as a small team with a big vision - to revolutionize the way people shop online. 
              What began as a passion project has grown into a trusted platform serving thousands of customers worldwide.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We believe in quality, transparency, and exceptional customer service. Every product in our collection is 
              carefully curated to ensure it meets our high standards before reaching your doorstep.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FiAward className="text-blue-500 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">5+ Years Experience</h3>
                <p className="text-gray-600 text-sm">Industry-leading expertise</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FiUsers className="text-blue-500 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">10,000+ Customers</h3>
                <p className="text-gray-600 text-sm">Happy clients worldwide</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FiShoppingBag className="text-blue-500 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">500+ Products</h3>
                <p className="text-gray-600 text-sm">Carefully curated collection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-24 bg-white rounded-xl shadow-md p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed">
            To provide exceptional quality products with unparalleled customer service, creating meaningful connections 
            between people and the items that enhance their lives. We strive to make every shopping experience enjoyable, 
            convenient, and memorable.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Team Member {item}</h3>
                  <p className="text-blue-500 mb-4">Position/Role</p>
                  <p className="text-gray-600 text-sm">
                    Brief description of team member's role and contributions to the company.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;