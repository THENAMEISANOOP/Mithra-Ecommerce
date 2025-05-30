import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const navItems = [
    { path: '/add', icon: assets.add_icon, label: 'Add Items' },
    { path: '/orders', icon: assets.order_icon, label: 'Orders' },
    { path: '/lists', icon: assets.order_icon, label: 'List Items' },
  ];

  return (
    <div className="w-48 bg-white shadow-md h-screen p-4 flex flex-col gap-4">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`
          }
        >
          <img src={item.icon} alt={item.label} className="h-5 w-5" />
          <p>{item.label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
