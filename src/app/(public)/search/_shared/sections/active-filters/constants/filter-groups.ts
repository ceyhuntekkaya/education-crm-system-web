// Filter kategorileri ve grupları
export const FILTER_GROUPS = {
  location: {
    title: "Lokasyon",
    fields: ["countryId", "provinceId", "districtId", "neighborhoodId"],
    icon: "ph-map-pin",
  },
  institution: {
    title: "Kurum",
    fields: ["institutionTypeId", "searchTerm"],
    icon: "ph-buildings",
  },
  academic: {
    title: "Akademik",
    fields: ["curriculumType", "languageOfInstruction", "ageRange"],
    icon: "ph-graduation-cap",
  },
  financial: {
    title: "Ücret",
    fields: ["feeRange"],
    icon: "ph-currency-circle-dollar",
  },
  rating: {
    title: "Değerlendirme",
    fields: ["minRating"],
    icon: "ph-star",
  },
  features: {
    title: "Özellikler",
    fields: ["hasActiveCampaigns", "isSubscribed"],
    icon: "ph-tag",
  },
};
