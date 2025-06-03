import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl =   import.meta.env.VITE_BACKEND_URL ;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate= useNavigate();

  const addToCart = async (itemId, size) => {
    if(!size) {
        toast.error("Please select Product Size");
        return;
    }
    
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
  let totalCount = 0;
  for (const items in cartItems) {
    for (const item in cartItems[items]) {
      try {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      } catch (error) {
        console.error(`Error processing item ${items} with size ${item}:`, error);
      }
    }
  }
  return totalCount;
};

const updateQuantity = async (itemId,size,quantity)=>{
    
    let cartData = structuredClone(cartItems);
    
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
}

  const getCartAmount = () => {
    let totalAmount=0;
    for(const items in cartItems){
        let itemInfo=products.find( (product) => product._id === items);
        for(const item in cartItems[items]){
            try{
                if(cartItems[items][item]>0){
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
                }catch(error){
                    console.error(`Error processing item ${items} with size ${item}:`, error);
                }

        }
    }
    return totalAmount 
  }

 const getProductsData = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/product/list`);
    console.log("Fetched Products:", response.data.products);
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
console.log("Backend URL is:", backendUrl);


  useEffect(()=>{
    getProductsData();
  },[ ])

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
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
