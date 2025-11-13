import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "@/assets/left.png";
import Title from "./Text";
const ShopByBrands = () => {
    const timer = `14/08/2025`;
     const calculateTime = () => {
        const date = new Date(timer);
        const diff = date.getTime() - new Date().getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     console.log(days, hours);
        return {
            days,
            hours,
        }
    }

  return (
    <div className="bg-shop_light_bg flex gap-8 rounded-md h-82 ">
      <div className="w-full">
        <Image
          src={img}
          alt="brand1"
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col align-center justify-center gap-2 bg-shop_light_green p-4 text-white">
        <Title>Deals of the Month</Title>
        <p>
          it is a long fact that a reader will be distracted by the readable
          content of a page when looking at its layout. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        </p>
        <div className="flex gap-2">
          
         </div>
        <button className="px-6 py-2 bg-shop_light_pink text-shop_light_green rounded-md">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ShopByBrands;
