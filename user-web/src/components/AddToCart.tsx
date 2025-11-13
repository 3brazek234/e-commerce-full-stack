"use client";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/types";

function AddToCart({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <button 
        disabled={product?.stock === 0}
        className={`flex items-center gap-1 md:gap-2 justify-center ${className} ${clicked ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => setClicked(true)} className="bg-shop_light_green text-white px-2 md:px-4 py-2 rounded-md text-xs flex items-center gap-0.5 md:gap-1.5 w-full justify-center hover:bg-shop_dark_green hoverEffect">
        {product?.stock !== 0 ? (
          <span className="text-sm">Add to Cart</span>
        ) : (
          <span className="text-sm">Out of Stock</span>
        )}
        <ShoppingCart />

      </button>
    </div>
  );
}

export default AddToCart;
