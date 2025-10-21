import { SchoolPricingDto, SchoolPricingCreateDto } from "@/types";

export interface PricingAddEditContextType {
  // Current pricing data
  pricing: SchoolPricingDto | null;
  pricingLoading: boolean;
  pricingError: string | null;

  // Edit mode state
  isEditing: boolean;
  pricingId: string | null;

  // Actions
  fetchPricing: (() => void) | undefined;
  postPricing: (
    data: SchoolPricingCreateDto
  ) => Promise<SchoolPricingDto | null>;
  putPricing: (
    data: SchoolPricingCreateDto
  ) => Promise<SchoolPricingDto | null>;
}
