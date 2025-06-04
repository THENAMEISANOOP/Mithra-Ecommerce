import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Added for mobile menu toggle
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.success("Logged out successfully");
  };

  const navLinks = [
    { path: "/", name: "HOME" },
    { path: "/collection", name: "COLLECTION" },
    { path: "/about", name: "ABOUT" },
    { path: "/contact", name: "CONTACT" },
  ];

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] py-3 border-b border-gray-300"
          : "bg-transparent py-5"
      }
    `}
        style={{ height: scrolled ? 56 : 72 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.img
              src={assets.logo}
              className="w-36 md:w-40"
              alt="Fashion Logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className="relative group">
                {({ isActive }) => (
                  <>
                    <span
                      className={`text-sm uppercase tracking-wider transition-colors ${
                        isActive
                          ? "text-rose-600"
                          : "text-gray-700 hover:text-rose-500"
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full ${
                        isActive ? "w-full" : ""
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Icons Group */}
          <div className="flex items-center gap-6">
            {/* Search button: opens search and goes to collection */}
            <button
              onClick={() => {
                setShowSearch(true);
                navigate("/collection");
                setShowMobileMenu(false); // Close mobile menu if open
              }}
              className="p-1 hover:scale-110 transition-transform"
              aria-label="Search"
            >
              <img src={assets.search_icon} className="w-5" alt="Search" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button
                onClick={() => (token ? null : navigate("/login"))}
                className="p-1 hover:scale-110 transition-transform"
                aria-label="Profile"
              >
                <img src={assets.profile_icon} className="w-5" alt="Profile" />
              </button>

              {token && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right scale-0 group-hover:scale-100 transition-transform duration-200">
                  <div className="bg-white rounded-md shadow-lg py-1 z-50">
                    {/* <button
                      onClick={() => {
                        navigate("/profile");
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                    >
                      My Profile
                    </button> */}
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => {
                if (token) {
                  navigate("/cart");
                  setShowMobileMenu(false);
                } else {
                  toast.error("Please login to access your cart");
                }
              }}
              className="p-1 relative hover:scale-110 transition-transform"
              aria-label="Cart"
            >
              <img src={assets.cart_icon} className="w-5" alt="Cart" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setShowSearch(false); // hide search if open
                setShowMobileMenu(!showMobileMenu); // toggle mobile menu
              }}
              className="p-1 md:hidden hover:scale-110 transition-transform"
              aria-label="Menu"
            >
              <img src={assets.menu_icon} className="w-5" alt="Menu" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 py-4 space-y-4 fixed top-[72px] left-0 right-0 z-40">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                `block text-sm font-medium uppercase ${
                  isActive ? "text-rose-600" : "text-gray-700 hover:text-rose-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {token && (
            <>
              {/* <button
                onClick={() => {
                  navigate("/profile");
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left text-sm text-gray-700 hover:text-rose-500"
              >
                My Profile
              </button> */}
              {/* <button
                onClick={() => {
                  navigate("/orders");
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left text-sm text-gray-700 hover:text-rose-500"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left text-sm text-gray-700 hover:text-rose-500"
              >
                Logout
              </button> */}
            </>
          )}

          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMobileMenu(false);
              }}
              className="block w-full text-left text-sm text-gray-700 hover:text-rose-500"
            >
              Login
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
