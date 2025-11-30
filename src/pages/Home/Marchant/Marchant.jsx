import { Button } from "@/components/ui/button";
import React from "react";
import location from "@/assets/location-merchant.png"

const Marchant = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="3000" className="bg-[#08373c] bg-no-repeat bg-[url('assets/be-a-merchant-bg.png')] mt-20 rounded-lg mx-2">
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 px-4 py-8 sm:p-8 md:p-14 lg:p-20">
            <div >
            <h2 className="text-gray-50 text-center font-semibold max-w-[650px] text-xl  sm:text-2xl lg:text-4xl ">
                Merchant and Customer Satisfaction is Our First Priority
            </h2>
            <p className="text-gray-300 py-4 lg:py-6 text-sm">
                We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex gap-4 mt-6 sm:mt-0 flex-col sm:flex-row items-center">
                <Button className={"rounded-full p-4"}>Become a Merchant</Button>
            <Button className={"bg-transparent p-4 hover:text-white rounded-full text-primary border border-primary"}>Earn with Profast Couier</Button>
            </div>
        </div>
        <div className="">
            <img className="w-full" src={location} alt="merchant" />
        </div>
        </div>

    </div>
  );
};

export default Marchant;
