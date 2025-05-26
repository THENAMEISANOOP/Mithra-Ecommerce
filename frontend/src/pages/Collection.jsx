import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);

  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  const [sortType, setSortType] = useState('relavent');

  // Category filter toggle
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Subcategory filter toggle
  const toggleSubcategory = (e) => {
    const value = e.target.value;
    if (subcategory.includes(value)) {
      setSubcategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubcategory((prev) => [...prev, value]);
    }
  };

  // Apply category & subcategory filters
  const applyFilters = () => {
    let productsCopy = [...products];

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // Handle sorting
  const sortProducts = () => {
    let fpCopy = [...products];

    if (category.length > 0 || subcategory.length > 0) {
      fpCopy = [...filterProducts];
    }

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setCategory([]);
    setSubcategory([]);
    setSortType('relavent');
    setFilterProducts(products);
  };

  useEffect(() => {
    if (category.length > 0 || subcategory.length > 0) {
      applyFilters();
    } else {
      setFilterProducts(products);
    }
  }, [category, subcategory, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className='flex flex-col md:flex-row p-4 gap-4'>
      
      <button
        onClick={() => setShowFilter(!showFilter)}
        className='flex md:hidden justify-between items-center cursor-pointer font-semibold text-lg p-3 bg-white border rounded'
      >
        {showFilter ? 'block' : 'hidden'}
        <img
          className={`transition-transform ${showFilter ? 'rotate-180' : ''}`}
          src={assets.dropdown_icon}
          alt='toggle'
        />
      </button>

      {/* Filter Panel */}
      <div
        className={`w-full md:w-1/4 ${
          showFilter ? 'block' : 'hidden'
        } md:block sticky top-4 h-fit bg-white z-10 border rounded p-4`}
      >
        {/* Category */}
        <div className='border-b pb-3 mb-4'>
          <p className='font-semibold mb-2'>Categories</p>
          <div className='flex flex-col gap-2'>
            {['Men', 'Women', 'Kids'].map((item) => (
              <label key={item} className='cursor-pointer flex items-center'>
                <input
                  type='checkbox'
                  value={item}
                  checked={category.includes(item)}
                  onChange={toggleCategory}
                  className='mr-2'
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory */}
        <div className='border-b pb-3 mb-4'>
          <p className='font-semibold mb-2'>Type</p>
          <div className='flex flex-col gap-2'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
              <label key={item} className='cursor-pointer flex items-center'>
                <input
                  type='checkbox'
                  value={item}
                  checked={subcategory.includes(item)}
                  onChange={toggleSubcategory}
                  className='mr-2'
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full'
        >
          Reset Filters
        </button>
      </div>

      {/* Right Side: Products */}
      <div className='flex-1'>
        <div className='flex justify-between items-center mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border px-3 py-1 rounded'
            value={sortType}
          >
            <option value='relavent'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;