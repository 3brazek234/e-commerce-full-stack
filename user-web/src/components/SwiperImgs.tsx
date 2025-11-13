"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "@/assets/01.jpg";
import img2 from "@/assets/02.jpg";
import img3 from "@/assets/03.jpg";
import img4 from "@/assets/04.jpg";
import img5 from "@/assets/05.jpg";
import img6 from "@/assets/06.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Import required modules
import { EffectCards } from "swiper/modules";
import Image from "next/image";

function SwiperImgs() {
  const svgImages = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="w-4/5 max-w-md mx-auto py-8">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {svgImages.map((svg, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-white rounded-lg shadow-lg"
          >
            <Image
              src={svg}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperImgs;
