import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const navItems = [
    { label: "Add Items", to: "/add", icon: assets.add_icon },
    { label: "List Items", to: "/list", icon: assets.order_icon },
    { label: "Orders", to: "/orders", icon: assets.order_icon }
  ]

  return (
    <div className='w-[18%] min-h-screen bg-white border-r border-gray-200'>
      <div className='flex flex-col gap-3 pt-8 px-4 text-sm'>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                isActive ? "bg-black text-white" : "hover:bg-gray-100 text-gray-800"
              }`
            }
          >
            <img src={item.icon} alt={item.label} className='w-5 h-5' />
            <span className='hidden md:inline'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
