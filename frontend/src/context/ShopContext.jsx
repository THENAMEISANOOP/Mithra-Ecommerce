import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error(error);
        toast.error("Error adding item to cart");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        } catch (error) {
          console.error(`Error processing item ${itemId} with size ${size}:`, error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    } else {
      cartData[itemId] = { [size]: quantity };
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.put(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        toast.error("Failed to update item quantity");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find(product => product._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        try {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {
          console.error(`Error calculating item ${itemId} with size ${size}:`, error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.products) {
        setProducts(response.data.products);
      } else {
        toast.error("No products found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && localToken) {
      setToken(localToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    setCartItems,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
