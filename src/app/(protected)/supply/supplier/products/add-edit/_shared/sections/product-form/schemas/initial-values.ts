import { ProductFormData } from "../types/form-data";

/**
 * Initial values for Product form
 * ProductCreateDto'ya uygun
 */
export const initialValues: ProductFormData = {
  // Required fields - supplierId context'ten gelecek
  supplierId: 0,
  categoryId: "", // String olmalı - FormAutocomplete için
  name: "",
  basePrice: 0,

  // Optional fields
  sku: "",
  description: "",
  technicalSpecs: "",
  status: "ACTIVE", // Default status
  stockTrackingType: "UNLIMITED", // Default tracking type
  stockQuantity: 0,
  minStockLevel: 0,
  currency: "TRY", // Default currency
  taxRate: 0,
  minOrderQuantity: 1,
  deliveryDays: 0,
  mainImageUrl: "",
};
