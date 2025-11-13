import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavoriteButton = () => {
  return (
     <Link href="/cart" className="group relative">
       <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
       <span className='absolute -top-2 -right-1 bg-shop_light_green text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-xs font-semibold'>0</span>
     </Link>
  );
};

export default FavoriteButton;
