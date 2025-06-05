import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = {
    Men: ["Topwear", "Bottomwear", "Winterwear"],
    Women: ["Topwear", "Bottomwear", "Winterwear", ],
    Kids: ["Topwear", "Bottomwear", "Winterwear"]
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(backendUrl + "/api/product/add", formData, { 
        headers: { token } 
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImages([null, null, null, null]);
    setPrice('');
    setCategory("Men");
    setSubCategory("Topwear");
    setBestseller(false);
    setSizes([]);
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSizeClick = (size) => {
    setSizes(prev => 
      prev.includes(size) 
        ? prev.filter(item => item !== size) 
        : [...prev, size]
    );
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Add New Product</h2>
      
      <form onSubmit={onSubmitHandler} className='space-y-6'>
        {/* Image Upload Section */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Product Images</label>
          <p className='text-xs text-gray-500 mb-3'>Upload up to 4 images (First image will be the main display)</p>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {images.map((image, index) => (
              <label 
                key={index}
                htmlFor={`image-upload-${index}`}
                className={`relative cursor-pointer group ${!image ? 'border-2 border-dashed border-gray-300 rounded-lg' : ''}`}
              >
                <div className='aspect-square flex items-center justify-center overflow-hidden rounded-lg'>
                  {image ? (
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt={`Preview ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='p-4 text-center'>
                      <svg className='mx-auto h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                      </svg>
                      <span className='mt-2 block text-sm font-medium text-gray-600'>Image {index + 1}</span>
                    </div>
                  )}
                </div>
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100'>
                  <span className='text-white text-sm font-medium'>Change</span>
                </div>
                <input 
                  type="file" 
                  id={`image-upload-${index}`} 
                  hidden 
                  accept='image/*'
                  onChange={(e) => handleImageChange(index, e.target.files[0])} 
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 border-b pb-2'>Basic Information</h3>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Product Name*</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder='e.g. Cotton T-Shirt'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required 
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Description*</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder='Describe the product features, material, etc.'
              rows={4}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
            />
          </div>
        </div>

        {/* Category & Pricing */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 border-b pb-2'>Category & Pricing</h3>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Category*</label>
              <select 
                value={category} 
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory(categories[e.target.value][0]);
                }}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Sub Category*</label>
              <select 
                value={subCategory} 
                onChange={(e) => setSubCategory(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                {categories[category].map((subCat) => (
                  <option key={subCat} value={subCat}>{subCat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Price (₹)*</label>
              <div className='relative'>
                <span className='absolute left-3 top-2.5 text-gray-500'>₹</span>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder='0.00'
                  min="0"
                  step="0.01"
                  className='w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sizes & Options */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 border-b pb-2'>Sizes & Options</h3>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Available Sizes*</label>
            <div className='flex flex-wrap gap-2'>
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <button 
                  key={size} 
                  type='button'
                  onClick={() => handleSizeClick(size)}
                  className={`px-4 py-2 rounded-md border transition-all ${
                    sizes.includes(size) 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className='flex items-center'>
            <input 
              type="checkbox" 
              id='bestseller' 
              checked={bestseller} 
              onChange={() => setBestseller(prev => !prev)}
              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
            />
            <label htmlFor="bestseller" className='ml-2 block text-sm text-gray-700'>
              Mark as Bestseller
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className='flex justify-end space-x-3 pt-4'>
          <button
            type='button'
            onClick={resetForm}
            className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;