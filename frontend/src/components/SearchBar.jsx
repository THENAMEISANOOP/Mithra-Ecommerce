import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAVBAR_HEIGHT = 56; // must match navbar height when scrolled

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  // Close search bar if navigated away from /collection
  useEffect(() => {
    if (location.pathname !== "/collection") {
      setShowSearch(false);
    }
  }, [location, setShowSearch]);

  return (
    <AnimatePresence>
      {showSearch && location.pathname === "/collection" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-[56px] left-0 right-0 z-40 bg-white shadow-sm"
          style={{ padding: "0.5rem 0" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-3 pl-5 pr-12 text-gray-700 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                type="text"
                placeholder="Search our collection..."
                aria-label="Search collection"
                autoFocus
              />
              {/* Search icon */}
              <img
                src={assets.search_icon}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-70"
                alt="Search"
              />
              {/* Close button */}
              <button
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-rose-600 focus:outline-none"
                style={{ fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1, userSelect: 'none' }}
                type="button"
              >
                &times;
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
