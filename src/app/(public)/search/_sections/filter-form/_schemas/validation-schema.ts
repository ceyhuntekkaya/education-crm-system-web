import * as yup from "yup";

export const validationSchema = yup.object({
  searchTerm: yup.string(),
  institutionTypeId: yup.string(), // Tekli seçim için
  institutionTypeIds: yup.mixed(),
  ageRange: yup.mixed(),
  feeRange: yup.mixed(),
  curriculumType: yup.string(),
  languageOfInstruction: yup.string(),
  countryId: yup.mixed(),
  provinceId: yup.mixed(),
  districtId: yup.mixed(),
  neighborhoodId: yup.mixed(),
  latitude: yup.number(),
  longitude: yup.number(),
  radiusKm: yup.number(),
  minRating: yup.mixed(),
  hasActiveCampaigns: yup.boolean(),
  isSubscribed: yup.boolean(),
  sortBy: yup.string(),
  sortDirection: yup.string(),
  // Dinamik property grupları için
  propertyFilters: yup.object(),
});
