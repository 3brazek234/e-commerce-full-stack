"use client";
import {  useState } from "react";
import HomeTabs from "@/components/HomeTabs";
import Container from "@/components/Container";

import type { CategoryList, Product } from "@/lib/types";
import useSWR from "swr";
import HomeCategory from "./HomeCategory";
import ShopByBrands from "./ShopByBrands";
const ProductGrid = ( {categories}: CategoryList) => {
  const [selectedTab, setSelectedTab] = useState(
    "Games"
  );

  const {data: swrProduct, isLoading} =useSWR('/products');
   const filteredProducts = swrProduct?.filter((product: Product) => product.category.categoryName === selectedTab);

  return (
    <Container className="my-10">
      <HomeTabs selectedTab={selectedTab} onTabSelect={setSelectedTab} categories={categories}/>
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-shop_light_green text-white rounded-md hover:bg-shop_light_green hoverEffect">
          Load More
        </button>
      </div>
      <HomeCategory categories={categories}/>
      <ShopByBrands/>
    </Container>
  );
};
export default ProductGrid;
