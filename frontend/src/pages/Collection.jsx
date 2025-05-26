import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter toggle functions
  const toggleCategory = (value) => {
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const toggleSubcategory = (value) => {
    setSubcategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  // Apply filters
  useEffect(() => {
    let results = [...products];

    // Search filter
    if (showSearch && search) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      results = results.filter(item => category.includes(item.category));
    }

    // Subcategory filter
    if (subcategory.length > 0) {
      results = results.filter(item => subcategory.includes(item.subCategory));
    }

    // Sorting
    if (sortType === 'low-high') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      results.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(results);
  }, [products, search, showSearch, category, subcategory, sortType]);

  const resetFilters = () => {
    setCategory([]);
    setSubcategory([]);
    setSortType('relavent');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with title and sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Title text1={'ALL'} text2={'COLLECTIONS'} />
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Mobile filter button */}
          {isMobile && (
            <button
              onClick={() => document.getElementById('filters').classList.toggle('hidden')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
            >
              <img src={assets.filter_icon} alt="Filters" className="w-5 h-5" />
              <span>Filters</span>
            </button>
          )}
          
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full md:w-auto"
            value={sortType}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar - always visible on desktop, toggleable on mobile */}
        <div 
          id="filters"
          className={`w-full md:w-72 bg-white p-5 rounded-lg shadow-sm ${isMobile ? 'hidden' : 'block'}`}
        >
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {['Men', 'Women', 'Kids'].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleCategory(item)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    category.includes(item)
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-4">Product Type</h3>
            <div className="space-y-2">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSubcategory(item)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    subcategory.includes(item)
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Reset All Filters
          </button>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filterProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products match your filters</p>
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;