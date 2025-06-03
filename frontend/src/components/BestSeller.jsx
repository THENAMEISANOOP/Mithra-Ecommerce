import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products && products.length > 0) {
            // Changed from bestSeller to bestseller (lowercase s)
            const bestProduct = products.filter(item => item.bestseller);
            // console.log('Best products found:', bestProduct); // Debug log
            setBestSeller(bestProduct.slice(0, 5));
            setLoading(false);
        }
    }, [products]);

    return (
        <div className='container mx-auto px-4 py-12'>
            <div className='text-center mb-12'>
                <Title text1={'BEST'} text2={'SELLERS'}/>
                <p className='max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed'>
                    Discover our most popular products loved by customers.
                </p>
            </div>
            
            {loading ? (
                <div className="text-center py-8">Loading best sellers...</div>
            ) : bestSeller.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6'>
                    {bestSeller.map((item, index) => (
                        <ProductItem 
                            key={index} 
                            id={item._id}
                            name={item.name} 
                            image={item.image} 
                            price={item.price}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">No best sellers found</div>
            )}
        </div>
    )
}

export default BestSeller