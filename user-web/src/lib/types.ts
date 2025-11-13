// Category types based on Sanity schema and JSON data structure

export interface CategoryImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface CategorySlug {
  _type: "slug";
  current: string;
}

export interface Category {
  categoryId: string;      
  categoryName: string;   
  icon: string;           
}


export type CategoryList = Category[];

export interface CreateCategoryInput {
  title: string;
  slug: CategorySlug;
  description: string;
  range: number;
  featured: boolean;
  image: CategoryImage;
}

// Type for updating categories
export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  _id: string;
} 
// lib/types.ts

// تعريف نوع الصورة (image)
interface Image {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// تعريف نوع الـ slug
interface Slug {
  _type: string;
  current: string;
}

// تعريف نوع المتغيرات (variant)
interface Variant {
  _key: string;
  _type: string;
  color: string;
  storage: string;
  condition: string;
  quantity: number;
  available: boolean;
}
 interface CategoryProduc{
  categoryId: string;
  categoryName: string;
  icon: string;
 }

export interface Product {
  productId: string;         
  name: string;
  shortDescription: string;
  price: number;             
  mainImageUrl: string;      
  description?: string;
  category: CategoryProduc;
  images?: string;
  stock?: number;
  discountPercent?: number;
  createdAt?: string; 
  updatedAt?: string; 
}

export type ProductList = Product[];


// تعريف نوع الاستجابة الكاملة (قد تحتوي على result)
export interface SanityResponse {
  result: Product[];
}