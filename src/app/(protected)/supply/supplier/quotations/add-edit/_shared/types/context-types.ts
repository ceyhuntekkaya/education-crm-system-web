import type {
  QuotationDto,
  QuotationCreateDto,
  QuotationUpdateDto,
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

  // Edit mode state
  isEditing: boolean;
  quotationId: string | null;

  // Actions
  fetchQuotation: (() => void) | undefined;
  postQuotation: (data: QuotationCreateDto) => Promise<QuotationDto | null>;
  putQuotation: (data: QuotationUpdateDto) => Promise<QuotationDto | null>;
}
