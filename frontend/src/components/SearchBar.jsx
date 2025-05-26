import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // Auto focus input when shown
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return visible ? (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        showSearch ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between rounded-b-lg">
        <div className="flex items-center w-full md:w-3/5 border border-gray-300 rounded-full px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
          <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-2 opacity-60" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for collections..."
            className="w-full outline-none bg-transparent text-sm md:text-base"
          />
        </div>
        <button
          onClick={() => setShowSearch(false)}
          className="ml-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <img src={assets.cross_icon} alt="close" className="w-5 h-5" />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
