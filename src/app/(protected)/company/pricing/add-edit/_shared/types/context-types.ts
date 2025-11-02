import {
  SchoolPricingDto,
  SchoolPricingCreateDto,
  SchoolPricingUpdateDto,
} from "@/types";

export interface PricingAddEditContextType {
  // Current pricing data
  pricing: SchoolPricingDto | null;
  dataLoading: boolean; // Sadece data fetch için
  pricingError: string | null;

  // Form operations
  formLoading: boolean; // Sadece form submit için

  // Edit mode state
  isEditing: boolean;
  pricingId: string | null;

  // Actions
  fetchPricing: (() => void) | undefined;
  postPricing: (
    data: SchoolPricingCreateDto
  ) => Promise<SchoolPricingDto | null>;
  putPricing: (
    data: SchoolPricingUpdateDto
  ) => Promise<SchoolPricingDto | null>;
}
