import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import addProduct from "./pages/AddProduct.jsx";
import orders from "./pages/Orders";
import listProduct from "./pages/ListProduct.jsx";

import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔗 Set your backend URL here
export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

 export const currency='$';

const AddProduct = addProduct;
const Orders = orders;
const ListProduct = listProduct;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  

  

  return (
    <div className="bg-gray-100 min-h-screen font-outfit">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-gray-300" />
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              <Routes>
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/lists" element={<ListProduct token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
