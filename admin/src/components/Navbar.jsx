import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { assets } from "../assets/assets.js";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate(); // ✅ create navigate function

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setToken(""); // reset token in state
    navigate("/"); // ✅ navigate to root (or login route)
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-green shadow-sm">
      <img src={assets.logo} alt="Logo" className="h-10" />
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
