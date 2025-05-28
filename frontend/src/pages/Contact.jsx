import React from 'react';
import { assets } from '../assets/assets';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Contact = () => {

  const onSubmitHandler = (e) => {
    e.preventDefault();
   
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg max-w-xl mx-auto">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div>
            <img
              src={assets.contact_img}
              alt="Contact Us"
              className="rounded-xl w-full shadow-xl object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form  onSubmit={onSubmitHandler}
            className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FiPhone className="text-purple-500 text-3xl mx-auto mb-2" />
            <h4 className="font-semibold text-lg">Phone</h4>
            <p className="text-gray-600 mt-1">+91 98765 43210</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FiMail className="text-purple-500 text-3xl mx-auto mb-2" />
            <h4 className="font-semibold text-lg">Email</h4>
            <p className="text-gray-600 mt-1">support@example.com</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FiMapPin className="text-purple-500 text-3xl mx-auto mb-2" />
            <h4 className="font-semibold text-lg">Location</h4>
            <p className="text-gray-600 mt-1">Kollam, Kerala, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
