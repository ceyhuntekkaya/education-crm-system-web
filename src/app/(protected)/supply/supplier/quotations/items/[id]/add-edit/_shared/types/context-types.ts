import { QuotationItemDto, RFQItemDto } from "@/types";

/**
 * Quotation Item Add/Edit Context Type
 */
export interface QuotationItemAddEditContextType {
  // Quotation ID
  quotationId: number;
  rfqId: number | null;

  // Current item data
  item: QuotationItemDto | null;
  itemDetailLoading: boolean; // Sadece veri çekerken
  itemSubmitLoading: boolean; // Form submit edilirken
  itemError: string | null;

  // Edit mode state
  isEditing: boolean;
  itemId: string | null;

  // RFQ Items data
  rfqItems: RFQItemDto[];
  rfqItemsLoading: boolean;

  // Actions
  fetchItem: () => void;
  postItem: (data: any) => Promise<any>;
  putItem: (data: any) => Promise<any>;
}
