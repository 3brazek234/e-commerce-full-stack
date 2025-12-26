'use client';

import { useState } from 'react';
import 'swiper/css';

import type { Category } from '@/lib/types';

function HomeCategory({ categories }: { categories: Category[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? categories : categories?.slice(0, 6);

  return (
    <div className="relative overflow-hidden bg-shop_light_bg p-4 my-10">
      {/* bg */}
      <div className="relative">
        {/* header */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-emerald-700">
            Trending Now
          </div>
          <h2 className="mb-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
            Popular Categories
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
            Discover amazing products across our most loved categories
          </p>
        </div>

 

        {/* DESKTOP: grid */}
        <div>
          <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {displayed?.map((c) => (
              <div
                key={c.name}
                className="group relative overflow-hidden rounded-3xl border border-white/30 bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
       
                <h3 className="mx-3 mb-3 mt-2 line-clamp-2 text-center text-sm font-bold text-gray-800 transition-colors duration-300 group-hover:text-emerald-600">
                  {c.name}
                </h3>
                <div className="mb-4 flex justify-center">
                  <div className="h-1 w-8 rounded-full bg-shop_light_green transition-all duration-300 group-hover:w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default HomeCategory;
