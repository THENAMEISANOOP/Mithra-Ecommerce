import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header with decorative elements */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-10"></div>
        <Title text1={'ABOUT'} text2={'US'} className="relative inline-block px-8 bg-white" />
      </div>

      {/* About Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-auto mb-2 rounded-xl shadow-lg object-cover"
            src={assets.about_img}
            alt="About us"
            style={{ maxHeight: '400px' }}
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-lg">
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-gray-900 text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a seamless
              shopping experience that exceeds expectations, from browsing and
              ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-10"></div>
        <Title text1={'WHY'} text2={'CHOOSE US'} className="relative inline-block px-8 bg-white" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: 'Quality Assurance',
            desc: 'We meticulously select and vet each product to ensure it meets our stringent quality standards.',
            icon: '✓'
          },
          {
            title: 'Convenience',
            desc: 'With our user-friendly interface and hassle-free ordering process, shopping has never been easier.',
            icon: '⌚'
          },
          {
            title: 'Exceptional Service',
            desc: 'Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.',
            icon: '❤️'
          },
        ].map(({ title, desc, icon }, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-8 flex flex-col gap-4 hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Newsletter - Full width with contrast background */}
      <div className="bg-gray-50 rounded-xl p-8 sm:p-12 mb-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Stay Updated</h3>
          <NewsletterBox />
        </div>
      </div>
    </div>
  );
};

export default About;