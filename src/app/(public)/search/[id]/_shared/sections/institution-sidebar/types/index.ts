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
    label: "Favorilere Ekle",
    description: "Okulu favori listenize ekleyin",
  },
  {
    value: "shortlist" as const,
    label: "Kısa Listeye Ekle",
    description: "Karşılaştırma için kısa listeye ekleyin",
  },
  {
    value: "watchlist" as const,
    label: "Takip Listesi",
    description: "Okulun güncellemelerini takip edin",
  },
] as const;
