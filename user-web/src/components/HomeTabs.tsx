import React from "react";
 import Link from "next/link";
import { CategoryList } from "@/lib/types";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
  categories: CategoryList | undefined;
}
function HomeTabs({ selectedTab, onTabSelect, categories }: Props) {
  return (
    <div className="flex-row gap-5 between-row flex-wrap">
      <div className="flex gap-3.5">
        {categories?.slice(0, 4).map((item, index) => (
          <div key={index}>
            <button
              onClick={() => onTabSelect(item.categoryName)}
              className={`px-4 md-px-6 py-1.5 bg-shop_light_bg border text-black text-sm md:text-base font-semibold rounded-full ${selectedTab === item.categoryName ? "bg-shop-green" : ""} hover:bg-shop_light_green hover:text-white hoverEffect`}
            >
              {item.categoryName}
            </button>
          </div>
        ))}
        
      </div>
      
        <Link
        href={"/shop"}
        onClick={() => onTabSelect("all")}
        className={`px-4 md-px-6 py-1.5 bg-shop_light_bg border text-black text-sm md:text-base font-semibold rounded-full ${selectedTab === "all" ? "bg-shop-green" : ""} hover:bg-shop_light_green hover:text-white hoverEffect`}
      >
        See all
      </Link>
    </div>
  );
}

export default HomeTabs;
