import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault()
        // Handle form submission logic here
    }

    return (
        <div className='bg-gray-50 rounded-lg p-8 md:p-10 max-w-4xl mx-auto my-12 shadow-sm'>
            <div className='text-center mb-6'>
                <p className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>
                    Subscribe now & get <span className='text-primary-600'>20% off</span>
                </p>
                <p className='text-gray-600 text-sm md:text-base max-w-2xl mx-auto'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ea, molestiae recusandae impedit animi illum iure aliquam rerum itaque.
                </p>
            </div>
            
            <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
                <input 
                    className='flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                    type="email" 
                    placeholder='Your email address'
                    required 
                />
                <button 
                    type='submit' 
                    className='px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors duration-200'
                >
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewsletterBox