import { cn } from "@/lib/utils";
import  Link  from "next/link";

export default function Logo({ className, spanDesign }: { className?: string, spanDesign?: string }) {
  return (
    <Link href="/" className="inline-flex">
      <h2 className={cn("text-2xl text-shop_dark_green flex items-center space-x-2 t uppercase hover:text-shop_light_green hoverEffect group font-sans font-bold", className)}>
      Shopcar 
        <span className={cn("text-shop_light_green group-hover:text_shop_dark_green hoverEffect:", spanDesign)}>t</span>
      </h2>
    </Link>
  );
} 
// export const metadata = {
//   title: "ShopEasy",
//   description: "Your one-stop shop for all your needs",
// };