import { cn } from "@/lib/utils";
import React from "react";

function Price({
  price,
  discount,
  className,
}: {
  price: number;
  discount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={`text-gray-600 ${discount && discount > 0 ? "line-through" : ""}`}
      >
        ${price.toFixed(2)}{" "}
      </span>

      <span className={`text-lg font-semibold text-shop_dark_green`}>
        ${((price * (100 - (discount || 0))) / 100).toFixed(2)}
      </span>
      {discount ? (discount > 0 && <span className="text-red-500">(-{discount}%)</span>) : null}
    </div>
  );
}

export default Price;
