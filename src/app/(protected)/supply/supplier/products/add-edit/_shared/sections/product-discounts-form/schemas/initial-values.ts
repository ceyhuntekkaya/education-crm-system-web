import { ProductDiscountFormData } from "../types/form-data";

/**
 * Initial values for Product Discount form
 * ProductDiscountCreateDto'ya uygun
 */
export const initialValues: ProductDiscountFormData = {
  // Required fields
  discountName: "",
  discountType: "PERCENTAGE",

  // Optional fields
  discountValue: 0,
  minQuantity: 0,
  maxQuantity: 0,
  startDate: "",
  endDate: "",
  isActive: true,
};
