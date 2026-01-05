import type { RFQDto, RFQCreateDto, RFQUpdateDto } from "@/types";

/**
 * RFQAddEditContext type
 * Quotations yapısı ile aynı mimari
 */
export interface RFQAddEditContextType {
  // Current RFQ data
  rfq: RFQDto | null;
  rfqDetailLoading: boolean; // Sadece veri çekerken
  rfqSubmitLoading: boolean; // Form submit edilirken
  rfqError: string | null;

  // Edit mode state
  isEditing: boolean;
  rfqId: string | null;

  // Actions
  fetchRFQ: (() => void) | undefined;
  postRFQ: (data: RFQCreateDto) => Promise<RFQDto | null>;
  putRFQ: (data: RFQUpdateDto) => Promise<RFQDto | null>;
}
