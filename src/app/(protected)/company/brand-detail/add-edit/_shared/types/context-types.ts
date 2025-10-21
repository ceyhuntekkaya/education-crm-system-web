import { BrandDto, BrandCreateDto } from "@/types";

export interface BrandAddEditContextType {
  // Current brand data
  brand: BrandDto | null;
  brandLoading: boolean;
  brandError: string | null;

  // Edit mode state
  isEditing: boolean;
  brandId: string | null;

  // Actions
  fetchBrand: (() => void) | undefined;
  postBrand: (data: BrandCreateDto) => Promise<BrandDto | null>;
  putBrand: (data: BrandCreateDto) => Promise<BrandDto | null>;
}
