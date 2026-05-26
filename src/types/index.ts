// ============================================================
// Legacy Vault — Global TypeScript Interfaces
// ============================================================

/** Represents a product in the catalog */
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: ProductCategory;
  subCategory: string;
  imageUrl: string;
  images: string[];
  stock: number;
  description: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  discount: number;
  weight: number;
}

/** Product category types */
export type ProductCategory =
  | "Extended Art Print"
  | "Acrylic Display Case"
  | "Accessories";

/** A single item in the shopping cart */
export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

/** User authentication state */
export interface User {
  id: string;
  name: string;
  email: string;
}

/** Category display data for the home page */
export interface CategoryDisplay {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  href: string;
  productCount: number;
}

/** Article / blog post */
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  isPublished: boolean;
}

/** Event / "Pokemon of The Month" section */
export interface FeaturedEvent {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productIds: string[];
}
