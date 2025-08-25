export interface PricingSearchDto {
  searchTerm?: string;
  schoolIds?: number[];
  academicYear?: string;
  gradeLevels?: string[];
  minMonthlyTuition?: number;
  maxMonthlyTuition?: number;
  minAnnualTuition?: number;
  maxAnnualTuition?: number;
  paymentFrequencies?: string[];
  hasFinancialAid?: boolean;
  hasTransportation?: boolean;
  hasCafeteria?: boolean;
  hasExtendedDay?: boolean;
  statuses?: string[];
  isCurrentOnly?: boolean;
  countryId?: number;
  provinceId?: number;
  districtId?: number;
  institutionTypeIds?: number[];
}
