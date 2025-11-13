import Link from "next/link";
import Title from "./Text";
import SwiperImgs from "./SwiperImgs";

export default function Banner() {
  return (
    <div className="py-7 md-py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
      <div className="flex flex-col items-start justify-center gap-5 space-y-2.5 md:space-y-4 ">
        <Title>
          Grab Upto 50% off on <br /> Selected headphones
        </Title>
        <Link href={"/shop"}>
          <button className="bg-shop_dark_green/90 text-white/90 hover:text-white hover:bg-shop_btn_dark_green py-2 px-5 rounded-md hoverEffect">
            Shop Now
          </button>
        </Link>
      </div>
      <div className="overflow-hidden w-full lg:w-1/2">
        <SwiperImgs />
      </div>
    </div>
  );
}
