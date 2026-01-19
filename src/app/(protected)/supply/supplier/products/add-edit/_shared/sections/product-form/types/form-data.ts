/**
 * Form data type for Product form
 * ProductCreateDto ve ProductUpdateDto ile uyumlu
 */
export interface ProductFormData {
  // Required fields (CREATE için)
  supplierId: number;
  categoryId: number;
  name: string;
  basePrice: number;

  // Optional fields
  sku?: string;
  description?: string;
  technicalSpecs?: string;
  status?: "ACTIVE" | "PASSIVE" | "OUT_OF_STOCK" | "DISCONTINUED";
  stockTrackingType?: "UNLIMITED" | "LIMITED";
  stockQuantity?: number;
  minStockLevel?: number;
  currency?:
    | "TRY"
    | "USD"
    | "EUR"
    | "GBP"
    | "CHF"
    | "CAD"
    | "AUD"
    | "JPY"
    | "CNY"
    | "RUB"
    | "SAR"
    | "AED"
    | "QAR"
    | "KWD"
    | "BHD";
  taxRate?: number;
  minOrderQuantity?: number;
  deliveryDays?: number;
  mainImageUrl?: string;
}
