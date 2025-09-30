// Liste türü seçenekleri
export const listOptions = [
  {
    id: 1,
    value: "favorites" as const,
    label: "Favori Okullarım",
    icon: "ph-heart",
  },
  {
    id: 2,
    value: "shortlist" as const,
    label: "Aday Okullarım",
    icon: "ph-list-bullets",
  },
  {
    id: 3,
    value: "watchlist" as const,
    label: "Takip Ettiğim Okullar",
    icon: "ph-eye",
  },
  {
    id: 4,
    value: "applied" as const,
    label: "Başvurduğum Okullar",
    icon: "ph-paper-plane-tilt",
  },
  {
    id: 5,
    value: "visited" as const,
    label: "Gezdiğim Okullar",
    icon: "ph-map-pin",
  },
  {
    id: 6,
    value: "recommended" as const,
    label: "Önerilen Okullar",
    icon: "ph-thumbs-up",
  },
  {
    id: 7,
    value: "compare" as const,
    label: "Karşılaştırmak İstediğim",
    icon: "ph-scales",
  },
  {
    id: 8,
    value: "backup" as const,
    label: "Yedek Seçeneklerim",
    icon: "ph-shield-check",
  },
] as const;

// Liste türü type
export type ListType = (typeof listOptions)[number]["value"];
