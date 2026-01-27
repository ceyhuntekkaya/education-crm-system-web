import type {
  QuotationDto,
  QuotationCreateDto,
  QuotationUpdateDto,
  RFQItemDto,
  QuotationItemDto,
  QuotationItemCreateDto,
  QuotationItemUpdateDto,
} from "@/types";

/**
 * QuotationAddEditContext type
 */
export interface QuotationAddEditContextType {
  // RFQ ID (quotation oluştururken gerekli)
  rfqId: number | null;

  // Supplier ID (quotation oluştururken gerekli)
  supplierId: number;

  // Current Quotation data
  quotation: QuotationDto | null;
  quotationDetailLoading: boolean; // Sadece veri çekerken
  quotationSubmitLoading: boolean; // Form submit edilirken
  quotationError: string | null;

  // RFQ Items data
  rfqItems: RFQItemDto[];
  rfqItemsLoading: boolean;
  rfqItemsError: string | null;

  // Quotation Items data
  quotationItems: QuotationItemDto[];
  quotationItemsLoading: boolean;
  quotationItemsError: string | null;
  quotationItemSubmitLoading: boolean;
  quotationItemSubmitError: string | null;
  totalItemsAmount: number; // Tüm itemların toplam fiyatı

  // Edit mode state
  isEditing: boolean;
  quotationId: string | null;

  // Actions
  fetchQuotation: (() => void) | undefined;
  postQuotation: (data: QuotationCreateDto) => Promise<QuotationDto | null>;
  putQuotation: (data: QuotationUpdateDto) => Promise<QuotationDto | null>;
  refetchQuotationItems: (() => void) | undefined;
  postQuotationItem: (
    quotationId: number,
    data: QuotationItemCreateDto,
  ) => Promise<any>;
  putQuotationItem: (
    itemId: number,
    data: QuotationItemUpdateDto,
  ) => Promise<any>;
  updateItemTotal: (itemKey: number | string, totalPrice: number) => void;
}
