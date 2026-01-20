/**
 * Form data type for Product Discount form
 * ProductDiscountCreateDto ve ProductDiscountUpdateDto ile uyumlu
 */
export interface ProductDiscountFormData {
  // Required field
  discountName: string;
  discountType:
    | "FIXED_AMOUNT"
    | "PERCENTAGE"
    | "FREE_MONTHS"
    | "BUY_X_GET_Y"
    | "TIERED"
    | "BUNDLE"
    | "NO_DISCOUNT";

  // Optional fields
  discountValue?: number;
  minQuantity?: number;
  maxQuantity?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}
