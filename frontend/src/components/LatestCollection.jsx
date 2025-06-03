import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const[latestProducts,setLatestProducts]=useState([])

    useEffect(()=>{
      setLatestProducts(products.slice(0,10))
    },[products])

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='text-center mb-12'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, cupiditate tempore! Modi ipsam commodi vitae mollitia labore repellat alias est itaque!
        </p>
      </div>
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {latestProducts.map((item,index)=>(
          <ProductItem 
            key={index} 
            id={item._id} 
            image={item.image} 
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection