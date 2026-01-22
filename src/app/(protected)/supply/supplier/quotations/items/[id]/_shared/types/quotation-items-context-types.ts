import type { QuotationItemDto } from "@/types";

/**
 * 🔍 QUOTATION ITEMS CONTEXT TYPES
 */
export interface QuotationItemsContextValue {
  quotationId: number;
  rfqId: number | null;
  items: QuotationItemDto[];
  itemsListLoading: boolean;
  itemsListError: any;
  refetch: () => void;
}
