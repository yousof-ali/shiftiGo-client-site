import React from "react";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const OurServices = () => {
  const services = 
  [
    {
      icon: FaShippingFast,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: FaGlobeAsia,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: FaWarehouse,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: FaBuilding,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: FaUndo,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ]



  return (
    <div className="bg-[#08373c] p-8 mx-2 rounded-2xl lg:p-16">
      <h2 className="md:text-4xl  text-white text-2xl text-center">
        Our Services
      </h2>
      <p className="max-w-[700px] mt-2 mb-8 mx-auto text-[#DADADA] text-center">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
            services.map((service,indx) => <ServiceCard key={indx} data={service}/>)
        }
      </div>
    </div>
  );
};

export default OurServices;
