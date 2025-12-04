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
    label: "Favori Kurumlarım",
    icon: "ph-heart",
  },
  {
    value: "shortlist" as const,
    label: "Aday Kurumlarım",
    icon: "ph-list-bullets",
  },
  {
    value: "watchlist" as const,
    label: "Takip Ettiğim Kurumlar",
    icon: "ph-eye",
  },
  {
    value: "applied" as const,
    label: "Başvurduğum Kurumlar",
    icon: "ph-paper-plane-tilt",
  },
  {
    value: "visited" as const,
    label: "Gezdiğim Kurumlar",
    icon: "ph-map-pin",
  },
  {
    value: "recommended" as const,
    label: "Önerilen Kurumlar",
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
