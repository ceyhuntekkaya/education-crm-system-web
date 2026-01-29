import { ProductVariantFormData } from "../types/form-data";

/**
 * Product Variant form initial values
 */
export const initialValues: ProductVariantFormData = {
  variantName: "",
  sku: "",
  priceAdjustment: 0,
  stockQuantity: 0,
  isActive: true,
};
