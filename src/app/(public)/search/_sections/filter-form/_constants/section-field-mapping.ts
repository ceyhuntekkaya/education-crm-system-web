/**
 * Form section'ları için field mapping'i
 * Her section'ın hangi form field'larını içerdiğini tanımlar
 * Bu mapping, section'larda yapılan değişiklikleri tespit etmek için kullanılır
 */
export const SECTION_FIELD_MAPPING = {
  search: ["searchTerm"],
  location: [
    "countryId",
    "provinceId",
    "districtId",
    "neighborhoodId",
    "radiusKm",
  ],
  institutionTypes: [
    "institutionTypeId",
    "institutionTypeIds",
    "propertyFilters",
  ],
  ageRange: ["ageRange"],
  feeRange: ["feeRange"],
  curriculum: ["curriculumType"],
  language: ["languageOfInstruction"],
  rating: ["minRating"],
  additional: ["hasActiveCampaigns", "isSubscribed"],
  sorting: ["sortBy", "sortDirection"],
} as const;

export type SectionId = keyof typeof SECTION_FIELD_MAPPING;
export type SectionFields = (typeof SECTION_FIELD_MAPPING)[SectionId];
