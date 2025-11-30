import React from 'react'
import location from "../../../assets/location-merchant.png"
import liveTrack from "../../../assets/live-tracking.png"
import safeDelivery from "../../../assets/safe-delivery.png"

const Support = () => {
    const support = [
        {
            title:"Live Parcel Tracking",
            des:"Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            img:location
        },
        {
            title:"100% Safe Delivery",
            des:"We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            img:liveTrack
        },
        {
            title:"24/7 Call Center Support",
            des:"Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            img:safeDelivery
        },
    ]
  return (
    <div className='space-y-6 mx-2'>
      {support.map((sup,indx) => {
        return(
            <div data-aos="fade-up" data-aos-duration="3000" className='p-6 lg:p-8 border rounded-xl border-primary shadow-md bg-white grid items-center grid-cols-4' key={indx}>
                 <div className='col-span-1 border-r-4 pr-4 md:pr-8 border-dotted border-gray-500 w-full h-[100px] md:h-[180px] lg:h-[250px]'>
                   <img src={sup.img} alt="support" className='w-full h-full' />
                 </div>
                 
                 <div className='col-span-3 pl-4 md:pl-8'>
                    <h2 className='lg:text-2xl font-semibold mb-3 md:text-xl '>{sup.title}</h2>
                    <p className='md:text-sm text-gray-500 text-xs lg:text-base'>{sup.des}</p>
                 </div>
            </div>
        )
      })}
    </div>
  )
}

export default Support
