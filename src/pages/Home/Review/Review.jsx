import React from "react";
import review from "@/assets/customer-top.png";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

const Review = () => {
  const swiperRef = useRef(null);
  const reviews = [
    {
      id: 1,
      name: "Rasel Ahmed",
      role: "CTO",
      content:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Awlad Hossin",
      role: "Senior Product Designer",
      content:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      id: 3,
      name: "Nasir Uddin",
      role: "CEO",
      content:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "Excellent experience with the product. The quality and customer service exceeded my expectations in every way.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 5,
      name: "Mike Chen",
      role: "Business Analyst",
      content:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
    },
  ];
  return (
    <div className="p-8 rounded-2xl lg:p-16">
      <div className="flex justify-center mb-6">
        <img src={review} alt="review" />
      </div>
      <h2 className="md:text-4xl   text-2xl text-center">
        What our customers are sayings
      </h2>
      <p className="max-w-[700px] mt-2 mb-8 mx-auto text-gray-600 text-center">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      <div className="relative pt-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: ".review-prev-btn",
            nextEl: ".review-next-btn",
          }}
          pagination={{
            el: ".review-pagination",
            clickable: true,
            bulletClass: "review-bullet",
            bulletActiveClass: "review-bullet-active",
          }}
          loop
          centeredSlides={true}
          className="pb-20"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              {({ isActive, isDuplicate }) => (
                <div
                  className={`transition-all duration-500 ${
                    isActive
                      ? "scale-100 opacity-100 mt-0"
                      : "scale-100 opacity-100 blur-xs mt-16 "
                  }`}
                >
                  <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-shadow">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-primary mb-4" />

                    {/* Review Content */}
                    <p className="text-slate-700 text-base leading-relaxed mb-6 min-h-24">
                      {review.content}
                    </p>

                    {/* Dotted Divider */}
                    <div className="border-t border-dashed border-slate-300 my-6"></div>

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-slate-200"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-900 text-base">
                          {review.name}
                        </h3>
                        <p className="text-slate-500 text-sm">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Controls - Bottom Center */}
        {/* Navigation Controls - Bottom Center */}
        <div className="flex items-center -pb-12 justify-center gap-8 mt-8">
          {/* Previous Button */}
          <button
            className="review-prev-btn bg-primary p-3 rounded-full cursor-pointer hover:bg-primary/80 text-white"
            aria-label="Previous review"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Pagination Dots — centered between buttons */}
          <div className="review-pagination flex items-center justify-center gap-2"></div>

          {/* Next Button */}
          <button
            className="review-next-btn bg-primary p-3 rounded-full cursor-pointer hover:bg-primary/80 text-white"
            aria-label="Next review"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Custom Pagination Styles */}
      <style jsx>{`
        :global(.review-bullet) {
          width: 8px;
          height: 8px;
          background-color: #cbd5e1;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 4px;
        }

        :global(.review-bullet-active) {
          background-color: #3b82f6;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Review;
