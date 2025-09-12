// Discount type configurations for rendering
export const DISCOUNT_TYPE_CONFIG = {
  PERCENTAGE: {
    icon: "ph-percent",
    getText: (campaign: { discountPercentage?: number }) =>
      `%${campaign.discountPercentage} İndirim`,
    getColorClass: (isActive: boolean) =>
      isActive ? "text-success-600" : "text-neutral-400",
  },
  FIXED_AMOUNT: {
    icon: "ph-currency-circle-dollar",
    getText: (campaign: { discountAmount?: number }) =>
      `${campaign.discountAmount} TL İndirim`,
    getColorClass: (isActive: boolean) =>
      isActive ? "text-success-600" : "text-neutral-400",
  },
  FREE_MONTHS: {
    icon: "ph-calendar-check",
    getText: (campaign: { freeTrialDays?: number }) =>
      `${Math.ceil((campaign.freeTrialDays || 30) / 30)} Aylık Ücretsiz`,
    getColorClass: (isActive: boolean) =>
      isActive ? "text-info-600" : "text-neutral-400",
  },
  BUY_X_GET_Y: {
    icon: "ph-plus-circle",
    getText: () => "Al-Kazan Fırsatı",
    getColorClass: (isActive: boolean) =>
      isActive ? "text-warning-600" : "text-neutral-400",
  },
  TIERED: {
    icon: "ph-stairs",
    getText: () => "Kademeli İndirim",
    getColorClass: (isActive: boolean) =>
      isActive ? "text-purple-600" : "text-neutral-400",
  },
  BUNDLE: {
    icon: "ph-package",
    getText: () => "Paket İndirim",
    getColorClass: (isActive: boolean) =>
      isActive ? "text-orange-600" : "text-neutral-400",
  },
  NO_DISCOUNT: {
    icon: "ph-gift",
    getText: () => "Özel Fırsat",
    getColorClass: (isActive: boolean) =>
      isActive ? "text-primary-600" : "text-neutral-400",
  },
} as const;
