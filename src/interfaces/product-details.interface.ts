export interface ProductDetails {
  launchedAt: Date;
  title: string;
  description: string;
  specifications: string;
  manufacturer: string;
  websites: string;
  category: string;
}

export const productDetailProperties = [
  'launchedAt',
  'title',
  'description',
  'specifications',
  'manufacturer',
  'websites',
  'category',
] as const;

// Only allow using these keys as product detail keys
export type ProductDetailProperties = (typeof productDetailProperties)[number];
