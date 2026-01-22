import { QuotationItemFormData } from "../types/form-data";

/**
 * Quotation Item form initial values
 */
export const initialValues: QuotationItemFormData = {
  rfqItemId: undefined,
  itemName: "",
  specifications: "",
  quantity: 1,
  unit: "",
  unitPrice: 0,
  discountAmount: 0,
  totalPrice: 0,
  deliveryDays: undefined,
  notes: "",
};
