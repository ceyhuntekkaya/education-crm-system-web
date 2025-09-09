import { FormValues } from "@/types";

export const initialValues: FormValues = {
  searchTerm: "",
  institutionTypeIds: [] as any,
  ageRange: [1, 80] as any,
  feeRange: [0.1, 1000] as any,
  curriculumType: "",
  languageOfInstruction: "",
  countryId: "",
  provinceId: "",
  districtId: "",
  neighborhoodId: "",
  latitude: 0,
  longitude: 0,
  radiusKm: 5,
  minRating: "",
  hasActiveCampaigns: false,
  isSubscribed: false,
  sortBy: "name",
  sortDirection: "asc",
};
