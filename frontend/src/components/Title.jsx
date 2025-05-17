import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex items-center gap-4 mb-4'>
        <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
          <span className='text-gray-400'>{text1}</span>
          <span className='text-gray-800'>{text2}</span>
        </h2>
        <span className='w-12 h-0.5 bg-gray-300'></span>
    </div>
  )
}

export default Title