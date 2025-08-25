export interface NeighborhoodDto {
  id?: number;
  name?: string;
  nameEn?: string;
  code?: string;
  neighborhoodType?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  areaKm2?: number;
  elevationM?: number;
  densityPerKm2?: number;
  sortOrder?: number;
  slug?: string;
  description?: string;
  housingType?: string;
  developmentLevel?: string;
  isGatedCommunity?: boolean;
  isHistorical?: boolean;
  isCommercialCenter?: boolean;
  isResidential?: boolean;
  isIndustrial?: boolean;
  averageRentPrice?: number;
  averagePropertyPrice?: number;
  propertyPricePerM2?: number;
  incomeLevel?: string;
}
