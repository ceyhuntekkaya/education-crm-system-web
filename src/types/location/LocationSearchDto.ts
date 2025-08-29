export interface LocationSearchDto {
  searchTerm?: string;
  locationType?: string;
  countryId?: number;
  provinceId?: number;
  districtId?: number;
  isActive?: boolean;
  hasSchools?: boolean;
  minSchoolCount?: number;
  minSocioeconomicLevel?: string;
  minIncomeLevel?: string;
  hasMetroStation?: boolean;
  hasUniversity?: boolean;
  isMetropolitan?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}
