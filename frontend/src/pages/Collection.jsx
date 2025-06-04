import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const NAVBAR_HEIGHT = 56; // px
const SEARCHBAR_HEIGHT = 48; // approx height of search bar container

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price);
        setFilterProducts(fpCopy);
        break;

      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price);
        setFilterProducts(fpCopy);
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div
      className="flex flex-col sm:flex-row gap-6 px-4 sm:px-10 pt-12"
      style={{ paddingTop: showSearch ? NAVBAR_HEIGHT + SEARCHBAR_HEIGHT + 16 : undefined }}
    >
      {/* Modern Filter Section */}
      <aside className="min-w-[240px]">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            {showFilter ? (
              <>
                <span>Hide</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </>
            ) : (
              <>
                <span>Show</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        <div
          className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300 ${
            showFilter ? 'block' : 'hidden sm:block'
          }`}
        >
          <div className="space-y-6">
            {/* Categories Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Categories</h3>
                {category.length > 0 && (
                  <button 
                    onClick={() => setCategory([])}
                    className="text-xs text-green-600 hover:text-green-800 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <label 
                    key={cat} 
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      category.includes(cat) ? 'bg-green-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        value={cat}
                        onChange={toggleCategory}
                        checked={category.includes(cat)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                        category.includes(cat) 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-300'
                      }`}>
                        {category.includes(cat) && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Product Type</h3>
                {subCategory.length > 0 && (
                  <button 
                    onClick={() => setSubCategory([])}
                    className="text-xs text-green-600 hover:text-green-800 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {['Topwear', 'Bottomwear', 'Winterwear'].map((subCat) => (
                  <label 
                    key={subCat} 
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      subCategory.includes(subCat) ? 'bg-green-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        value={subCat}
                        onChange={toggleSubCategory}
                        checked={subCategory.includes(subCat)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                        subCategory.includes(subCat) 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-300'
                      }`}>
                        {subCategory.includes(subCat) && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">{subCat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Apply Button */}
            <button
              onClick={() => setShowFilter(false)}
              className="w-full sm:hidden bg-green-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Right Side - unchanged */}
      <section className="flex-1 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="border-2 border-gray-300 rounded-md text-sm px-3 py-1 cursor-pointer"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-10">
              No products found matching the filters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Collection;