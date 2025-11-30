import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

import bannarImage1 from "../../../assets/banner/banner1.png"
import bannarImage2 from "../../../assets/banner/banner2.png"
import bannarImage3 from "../../../assets/banner/banner3.png"

const Bannar = () => {
  return (
    <div>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        <div>
          <img src={bannarImage1} />
        </div>
        <div>
          <img src={bannarImage2} />
        </div>
        <div>
          <img src={bannarImage3}/>
        </div>
      </Carousel>
    </div>
  );
};

export default Bannar;
