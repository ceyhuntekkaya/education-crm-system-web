/**
 * Quotation Item form data type
 */
export interface QuotationItemFormData {
  rfqItemId?: number;
  itemName: string;
  specifications?: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  discountAmount?: number;
  totalPrice: number;
  deliveryDays?: number;
  notes?: string;
}
