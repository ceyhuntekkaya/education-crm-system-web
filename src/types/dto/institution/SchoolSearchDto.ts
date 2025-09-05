export interface SchoolSearchDto {
  searchTerm?: string;
  institutionTypeIds?: number[];
  minAge?: number;
  maxAge?: number;
  minFee?: number;
  maxFee?: number;
  curriculumType?: string;
  languageOfInstruction?: string;
  countryId?: number;
  provinceId?: number;
  districtId?: number;
  neighborhoodId?: number;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  minRating?: number;
  hasActiveCampaigns?: boolean;
  isSubscribed?: boolean;
  propertyFilters?: Record<string, unknown>;
  sortBy?: string;
  sortDirection?: string;
  page?: number;
  size?: number;
}
