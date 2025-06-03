import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';

const ListProduct = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // No `success` field in your backend for listProducts
      if (response.data.products) {
        setList(response.data.products);
      } else {
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching product list");
    }
  };

  // Remove product by ID
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === "Product removed successfully.") {
        setList(list.filter((item) => item._id !== id));
        toast.success("Product removed");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-4">All Products List</p>
      <div className="grid grid-cols-5 font-bold border-b py-2">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>

      {list.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-5 items-center py-2 border-b text-sm"
        >
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <button
            onClick={() => removeProduct(item._id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
