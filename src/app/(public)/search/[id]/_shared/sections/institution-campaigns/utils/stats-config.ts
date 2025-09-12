import { CampaignDto } from "@/types";

export interface StatConfig {
  key: string;
  title: string;
  icon: string;
  bgColor: string;
  textColor: string;
  getValue: (campaigns: CampaignDto[]) => number;
}

// Statistics card configurations
export const STATS_CONFIG: StatConfig[] = [
  {
    key: "total",
    title: "Toplam Kampanya",
    icon: "ph-list",
    bgColor: "bg-main-25",
    textColor: "text-main-600",
    getValue: (campaigns: CampaignDto[]) => campaigns.length,
  },
  {
    key: "active",
    title: "Aktif Kampanya",
    icon: "ph-check-circle",
    bgColor: "bg-success-25",
    textColor: "text-success-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => c.isActive).length,
  },
  {
    key: "percentage",
    title: "Yüzde İndirimi",
    icon: "ph-percent",
    bgColor: "bg-warning-25",
    textColor: "text-warning-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => c.discountType === "PERCENTAGE").length,
  },
  {
    key: "fixed",
    title: "Sabit İndirim",
    icon: "ph-currency-circle-dollar",
    bgColor: "bg-primary-25",
    textColor: "text-primary-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => c.discountType === "FIXED_AMOUNT").length,
  },
  {
    key: "special",
    title: "Özel Fırsat",
    icon: "ph-gift",
    bgColor: "bg-info-25",
    textColor: "text-info-600",
    getValue: (campaigns: CampaignDto[]) =>
      campaigns.filter((c) => 
        c.discountType === "NO_DISCOUNT" || 
        c.discountType === "FREE_MONTHS" ||
        c.discountType === "BUY_X_GET_Y" ||
        c.discountType === "TIERED" ||
        c.discountType === "BUNDLE"
      ).length,
  },
];
