import { QuotationDto, QuotationCreateDto, QuotationUpdateDto } from "@/types";
import { SelectOption } from "./hook-types";

/**
 * QuotationAddEditContext type
 * Social media PostAddEditContextType yapısı ile aynı mimari
 */
export interface QuotationAddEditContextType {
  // Current quotation data
  quotation: QuotationDto | null;
  quotationDetailLoading: boolean; // Sadece veri çekerken
  quotationSubmitLoading: boolean; // Form submit edilirken
  quotationError: string | null;

  // Edit mode state
  isEditing: boolean;
  quotationId: string | null;

  // Form options
  currencyOptions: SelectOption[];

  // Actions
  fetchQuotation: (() => void) | undefined;
  postQuotation: (data: QuotationCreateDto) => Promise<QuotationDto | null>;
  putQuotation: (data: QuotationUpdateDto) => Promise<QuotationDto | null>;
}
