"use client";
import { useState } from "react";
import HomeTabs from "@/components/HomeTabs";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "motion/react";
import type { CategoryList, Product } from "@/lib/types"; // تأكد من المسار
import useSWR from "swr";
import HomeCategory from "./HomeCategory";
import ShopByBrands from "./ShopByBrands";
import ProductSkeleton from "./ProductSkeleton"; // هنعمله تحت

// 1. تصحيح تعريف الـ Type للـ Props
interface ProductGridProps {
  categories: CategoryList; // أو Category[] حسب تعريفك
}

const ProductGrid = ({ categories }: ProductGridProps) => {
  // 2. جعل التاب الافتراضي هو "All" أو أول قسم عندك لضمان وجود داتا
  const [selectedTab, setSelectedTab] = useState(categories[0]?.name || "All");

  // 3. Server-side Filtering: ابعت اسم القسم للباك اند يرجعلك المنتجات بتاعته بس
  // لو التاب "All" هات كله، لو غير كده هات بالفلتر
  const apiUrl = selectedTab === "All" 
    ? '/products' 
    : `/products?category=${selectedTab}`;

  const { data: products, isLoading } = useSWR(apiUrl);

  return (
    <Container className="my-10">
      <HomeTabs 
        selectedTab={selectedTab} 
        onTabSelect={setSelectedTab} 
        categories={categories} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        
        {/* 4. حالة التحميل: عرض Skeleton */}
        {isLoading ? (
           Array.from({ length: 8 }).map((_, i) => (
             <ProductSkeleton key={i} />
           ))
        ) : products && products.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {products.map((product: Product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={product._id} // 5. استخدم ID فريد مش index
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          // 6. حالة عدم وجود منتجات (Empty State)
          <div className="col-span-full text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-shop_light_green text-white rounded-md hover:bg-shop_light_green/90 transition-colors">
          Load More
        </button>
      </div>
      
      <HomeCategory categories={categories} />
      <ShopByBrands />
    </Container>
  );
};

export default ProductGrid;