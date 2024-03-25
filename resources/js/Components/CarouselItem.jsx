import React from 'react'

const CarouselItem = ({image,name}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img className='w-[8rem] h-[8rem] lg:h-[12rem] lg:w-[12rem] rounded-full object-cover object-center' src={image} alt="" />
        <span className='py-3 font-semibold text-xl text-gray-600'>{name}</span>

    </div>
  )
}

export default CarouselItem
