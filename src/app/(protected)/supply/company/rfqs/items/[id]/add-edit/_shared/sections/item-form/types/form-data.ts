/**
 * RFQ Item form data type
 */
export interface RFQItemFormData {
  categoryId?: number | string; // Autocomplete string döndürür ama API number bekler
  itemName: string;
  specifications?: string;
  quantity: number;
  unit?: string;
}
