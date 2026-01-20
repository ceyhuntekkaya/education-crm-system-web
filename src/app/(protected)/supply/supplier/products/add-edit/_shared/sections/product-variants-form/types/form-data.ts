/**
 * Form data type for Product Variant form
 * ProductVariantCreateDto ve ProductVariantUpdateDto ile uyumlu
 */
export interface ProductVariantFormData {
  // Required field
  variantName: string;

  // Optional fields
  sku?: string;
  priceAdjustment?: number;
  stockQuantity?: number;
  isActive?: boolean;
}
