import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between px-6 py-3 bg-white shadow-sm'>
      <img src={assets.logo} alt="Logo" className='h-10 w-auto object-contain' />
      <button
        onClick={() => setToken('')}
        className='bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-full text-xs sm:text-sm transition'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
