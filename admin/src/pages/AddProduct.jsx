import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { backendUrl } from '../App';

const AddProduct = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestseller', bestseller);

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        toast.success('Product added successfully!');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setName('');
        setDescription('');
        setCategory('Men');
        setSubCategory('Topwear');
        setPrice('');
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error('Failed to add product.');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      toast.error('An error occurred while adding the product.');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <p className="font-semibold mb-2">Upload images</p>
          <div className="grid grid-cols-4 gap-4">
            {[image1, image2, image3, image4].map((img, idx) => (
              <label key={idx} className="cursor-pointer flex flex-col items-center">
                <img
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  alt={`upload-${idx + 1}`}
                  className="w-full h-32 object-cover border rounded"
                />
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      [setImage1, setImage2, setImage3, setImage4][idx](file);
                    }
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <p className="font-semibold mb-1">Product Name</p>
            <input
              type="text"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="font-semibold mb-1">Description</p>
            <textarea
              placeholder="Type here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold mb-1">Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <p className="font-semibold mb-1">Subcategory</p>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div>
              <p className="font-semibold mb-1">Price</p>
              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Sizes</p>
            <div className="flex flex-wrap gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div
                  key={size}
                  onClick={() => toggleSize(size.toLowerCase())}
                  className={`px-4 py-2 border rounded cursor-pointer transition-colors ${
                    sizes.includes(size.toLowerCase()) 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="bestseller" className="text-gray-700">Add to Best Seller</label>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;