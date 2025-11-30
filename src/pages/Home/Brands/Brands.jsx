import React from "react";
import Marquee from "react-fast-marquee";
import amazonVector from "../../../assets/brands/amazon_vector.png"
import casio from "../../../assets/brands/casio.png"
import moonstar from "../../../assets/brands/moonstar.png"
import randstad from "../../../assets/brands/randstad.png"
import amazon from "../../../assets/brands/amazon.png"
import startPeople from "../../../assets/brands/start_people.png"
import start from "../../../assets/brands/start.png"

const Brands = () => {
    const brands = [amazonVector, casio,moonstar,start, randstad,amazon,startPeople]
  return (
    <div>
        <h2 className="lg:text-2xl text-xl text-center font-semibold mb-6 ">We've helped thousands of sales teams</h2>
      <Marquee autoFill={true} gradient={true} pauseOnHover={true} className="pb-8  lg:pb-12">
        <div className="flex   items-center">
            {
            brands.map((brand,indx) => (
                <div className="lg:h-7 mx-4 lg:mx-8 h-4" key={indx}>
                    <img
                src={brand}
                alt="brand"
                className="w-full h-full"
                />
                </div>
            ))
        }
        </div>
      </Marquee>
    </div>
  );
};

export default Brands;
