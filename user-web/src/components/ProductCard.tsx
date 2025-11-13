import Image from "next/image";
import AddToWishllist from "./AddToWishllist";
import Title from "./Text";
import AddToCart from "./AddToCart";
import type { Product } from "@/lib/types";
import Container from "./Container";
const ProductCard = ({ product }: { product: Product }) => {
  // console.log("ProductCard", product);
  return (
<Container>
<div className=" text-sm border-[1px] border_dark_blue/20 rounder-md bg-white group ">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.mainImageUrl && (
          <Image
            src={product?.mainImageUrl}
            alt="productImage"
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain rounded-t-md group-hover:scale-105 bg-shop_light_bg overflow-hidden hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}
        <AddToWishllist product={product} />
      </div>
      <div className="p-3">
        <Title className="mt-2 text-lg font-semibold line-clamp-2">
          {product.name}
        </Title>
        {/* price */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-shop_light_text">price:</p>
          <p className="text-sm text-shop_light_text">${product.price}</p>
        </div>
        {product.category && (
          <p className="text-sm text-gray-500">Category: {product.category.categoryName}</p>
        )}{" "}
      </div>
      <div className="flex items-center p-3 border-t border-gray-200">
        <span className="text-sm text-gray-500">In Stock:</span>
        <span
          className={` ${product?.stock !== 0 ? "text-gray-500" : "text-red-500"} px-3`}
        >
          {product.stock}
        </span>
      </div>

      <div className="p-3 border-t border-gray-200 w-full">
        <AddToCart product={product} className="w-full" />
      </div>
    </div>
</Container>  
  );
};
export default ProductCard;
