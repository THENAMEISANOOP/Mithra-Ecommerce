import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    const {currency}=useContext(ShopContext)

  return (
    <Link 
      className='group block text-gray-800 hover:text-primary-600 transition-colors' 
      to={`/product/${id}`}
    >
        <div className='mb-4 overflow-hidden rounded-lg aspect-square bg-gray-50'>
            <img 
              src={image[0]}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              alt={name}
            />
        </div>
        <h3 className='font-medium text-sm md:text-base mb-1 group-hover:text-primary-600 line-clamp-2'>
          {name}
        </h3>
        <p className='text-gray-600 font-semibold'>
          {currency}{price}
        </p>
     </Link>
  )
}

export default ProductItem