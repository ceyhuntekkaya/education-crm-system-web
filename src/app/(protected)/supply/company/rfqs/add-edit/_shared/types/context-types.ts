import type {
  RFQDto,
  RFQCreateDto,
  RFQUpdateDto,
  RFQItemCreateDto,
  RFQItemDto,
} from "@/types";

/**
 * RFQAddEditContext type
 * Quotations yapısı ile aynı mimari
 */
export interface RFQAddEditContextType {
  // Company ID
  companyId: number;

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

  // RFQ Item Actions
  postRFQItem: (rfqId: number, data: RFQItemCreateDto) => Promise<any>;
  rfqItemSubmitLoading: boolean;
  rfqItemSubmitError: string | null;

  // Selected category ID from main form
  selectedCategoryId: string | null;
  setSelectedCategoryId: (categoryId: string | null) => void;

  // Categories data
  categoriesData: any;
  categoriesLoading: boolean;

  // Suppliers data
  suppliersData: any;
  suppliersLoading: boolean;
}
