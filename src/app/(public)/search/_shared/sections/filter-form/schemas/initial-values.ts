import { FormValues } from "@/types";

export const initialValues: FormValues = {
  searchTerm: "",
  institutionTypeId: "", // Tekli seçim için
  institutionTypeIds: [] as any,
  ageRange: [1, 80] as any,
  feeRange: [1, 1000000] as any,
  curriculumType: "",
  languageOfInstruction: "",
  countryId: "1",
  provinceId: "",
  districtId: "",
  neighborhoodId: "",
  latitude: 0,
  longitude: 0,
  radiusKm: null,
  minRating: "",
  hasActiveCampaigns: false,
  isSubscribed: false,
  sortBy: "name",
  sortDirection: "asc",
  // Dinamik property grupları için
  propertyFilters: {} as Record<string, string | string[]>,
};
