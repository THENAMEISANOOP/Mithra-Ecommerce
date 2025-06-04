import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      to={`/product/${id}`}
      aria-label={`View details of ${name}`}
    >
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={image[0]}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="pt-3 pb-1 px-2">
        <p className="text-sm font-semibold truncate" title={name}>
          {name}
        </p>
        <p className="text-sm font-medium text-rose-600">
          {currency}{price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
