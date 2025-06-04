import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with decorative elements */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-10"></div>
        <Title 
          text1={'CONTACT'} 
          text2={'US'} 
          className="relative inline-block px-8 bg-white text-3xl sm:text-4xl"
        />
      </div>

      {/* Contact Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-auto rounded-xl shadow-lg object-cover"
            src={assets.contact_img}
            alt="Our store location"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Our Store
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Mithra Fashion <br />
                Kollam Kerala
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Information
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Tel: +91 9656081913 <br />
                Email: MithraFashion@gmail.com
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Careers at Forever
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Learn more about our teams and job openings.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 rounded-xl p-8 sm:p-12">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Stay Connected</h3>
          <NewsletterBox />
        </div>
      </div>
    </div>
  );
};

export default Contact;