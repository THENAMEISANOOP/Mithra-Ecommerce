import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const {setShowSearch,getCartCount} = useContext(ShopContext);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img 
                        src={assets.logo}
                        className="h-10 md:h-12 transition-all duration-300 hover:opacity-90"
                        alt="Website Logo"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `text-gray-700 hover:text-primary-600 transition-colors duration-200 ${isActive ? 'text-primary-600 font-medium' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/collection" 
                        className={({ isActive }) => 
                            `text-gray-700 hover:text-primary-600 transition-colors duration-200 ${isActive ? 'text-primary-600 font-medium' : ''}`
                        }
                    >
                        Collection
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            `text-gray-700 hover:text-primary-600 transition-colors duration-200 ${isActive ? 'text-primary-600 font-medium' : ''}`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => 
                            `text-gray-700 hover:text-primary-600 transition-colors duration-200 ${isActive ? 'text-primary-600 font-medium' : ''}`
                        }
                    >
                        Contact
                    </NavLink>
                </nav>

                {/* Action Icons */}
                <div className="flex items-center space-x-6">
                    <button className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className="w-5 h-5" alt="Search" />
                    </button>

                    <div className="relative">
                        <button 
                            onClick={() => setProfileDropdown(!profileDropdown)}
                            className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                        >
                            <Link to="/login"><img src={assets.profile_icon} className="w-5 h-5" alt="Profile" /></Link>
                        </button>
                        {profileDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link 
                                    to="/profile" 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setProfileDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link 
                                    to="/orders" 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setProfileDropdown(false)}
                                >
                                    Orders
                                </Link>
                                <button 
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        // Handle logout logic
                                        setProfileDropdown(false);
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <Link 
                        to="/cart" 
                        className="relative text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                        <img src={assets.cart_icon} className="w-5 h-5" alt="Cart" />
                        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {getCartCount() || 0}
                        </span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setVisible(true)}
                        className="md:hidden text-gray-600 hover:text-primary-600"
                    >
                        <img src={assets.menu_icon} className="w-6 h-6" alt="Menu" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {visible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                        <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-lg">
                            <div className="flex flex-col h-full">
                                {/* Close Button */}
                                <div className="flex items-center justify-between p-4 border-b">
                                    <img 
                                        src={assets.logo} 
                                        className="h-8" 
                                        alt="Logo" 
                                    />
                                    <button 
                                        onClick={() => setVisible(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Mobile Navigation Links */}
                                <nav className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) => 
                                            `block py-2 px-4 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
                                        }
                                        onClick={() => setVisible(false)}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink 
                                        to="/collection" 
                                        className={({ isActive }) => 
                                            `block py-2 px-4 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
                                        }
                                        onClick={() => setVisible(false)}
                                    >
                                        Collection
                                    </NavLink>
                                    <NavLink 
                                        to="/about" 
                                        className={({ isActive }) => 
                                            `block py-2 px-4 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
                                        }
                                        onClick={() => setVisible(false)}
                                    >
                                        About
                                    </NavLink>
                                    <NavLink 
                                        to="/contact" 
                                        className={({ isActive }) => 
                                            `block py-2 px-4 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
                                        }
                                        onClick={() => setVisible(false)}
                                    >
                                        Contact
                                    </NavLink>
                                </nav>

                                {/* Mobile Footer */}
                                <div className="p-4 border-t">
                                    <div className="flex items-center space-x-4">
                                        <button className="text-gray-600 hover:text-primary-600">
                                            <img src={assets.search_icon} className="w-5 h-5" alt="Search" />
                                        </button>
                                        <Link 
                                            to="/profile" 
                                            className="text-gray-600 hover:text-primary-600"
                                            onClick={() => setVisible(false)}
                                        >
                                            <Link to="/login"><img src={assets.profile_icon} className="w-5 h-5" alt="Profile" /></Link>
                                        </Link>
                                        <Link 
                                            to="/cart" 
                                            className="relative text-gray-600 hover:text-primary-600"
                                            onClick={() => setVisible(false)}
                                        >
                                            <img src={assets.cart_icon} className="w-5 h-5" alt="Cart" />
                                            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                                10
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;