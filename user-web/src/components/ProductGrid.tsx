"use client";
import {  useState } from "react";
import HomeTabs from "@/components/HomeTabs";
import Container from "@/components/Container";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import type { Product } from "@/lib/types";
import useSWR from "swr";
import HomeCategory from "./HomeCategory";
import ShopByBrands from "./ShopByBrands";
const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(
    "Games"
  );

  const {data: swrProduct, isLoading} =useSWR('/products');
  const {data: categories, isLoading: categoriesLoading} = useSWR('/categories');
   const filteredProducts = swrProduct?.filter((product: Product) => product.category.categoryName === selectedTab);

  return (
    <Container className="my-10">
      <HomeTabs selectedTab={selectedTab} onTabSelect={setSelectedTab} categories={categories}/>
      {isLoading || categoriesLoading ? (
        <div className="flex flex-col justify-center items-center w-full min-h-80 gap-4 bg-gray-100 py-10">
          <div className="flex flex-col items-center space-x-2 text-blue-600">
            <Loader2 className="animate-spin w-5 h-6" />
            <p>Loading products...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-10">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product, index: number) => (
              <AnimatePresence key={index}>
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No products found for category: {selectedTab}
            </div>
          )}
        </div>
      )}
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
