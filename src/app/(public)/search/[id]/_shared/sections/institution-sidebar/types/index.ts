export interface SocialMediaLink {
  url: string;
  icon: string;
  platform: string;
}

export interface QuickInfoStat {
  value: number | string;
  label: string;
  colorClass: string;
}

export interface SaveModalData {
  saveOption: "favorites" | "shortlist" | "watchlist";
  note?: string;
}

export const SAVE_OPTIONS = [
  {
    value: "favorites" as const,
    label: "Favori Okullarım",
    icon: "ph-heart",
  },
  {
    value: "shortlist" as const,
    label: "Aday Okullarım",
    icon: "ph-list-bullets",
  },
  {
    value: "watchlist" as const,
    label: "Takip Ettiğim Okullar",
    icon: "ph-eye",
  },
  {
    value: "applied" as const,
    label: "Başvurduğum Okullar",
    icon: "ph-paper-plane-tilt",
  },
  {
    value: "visited" as const,
    label: "Gezdiğim Okullar",
    icon: "ph-map-pin",
  },
  {
    value: "recommended" as const,
    label: "Önerilen Okullar",
    icon: "ph-thumbs-up",
  },
  {
    value: "compare" as const,
    label: "Karşılaştırmak İstediğim",
    icon: "ph-scales",
  },
  {
    value: "backup" as const,
    label: "Yedek Seçeneklerim",
    icon: "ph-shield-check",
  },
] as const;
