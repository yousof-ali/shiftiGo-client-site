import React from 'react'

const ServiceCard = ({data}) => {
    const {description,title,icon} = data
    const Icon = icon
  return (
    <div data-aos="zoom-in-up"  data-aos-duration="3000" className='lg:p-8 group duration-500  hover:bg-primary space-y-4 text-center flex flex-col p-6 rounded-2xl bg-white'>
        <div className='bg-gray-200 h-18 w-18 mx-auto flex items-center justify-center rounded-full'>
            <Icon className={"text-primary"} size={32}/>
        </div>
      <h2 className='text-xl group-hover:text-white  text-primary font-semibold'>{title}</h2>
      <p className='text-sm group-hover:text-gray-100 lg:text-base text-[#606060]'>{description}</p>
    </div>
  )
}

export default ServiceCard
