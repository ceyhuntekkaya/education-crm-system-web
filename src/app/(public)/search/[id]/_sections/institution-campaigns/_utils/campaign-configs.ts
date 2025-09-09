// Campaign type configurations
export const CAMPAIGN_TYPE_CONFIG = {
  DISCOUNT: "İndirim Kampanyası",
  FREE_SERVICE: "Ücretsiz Hizmet",
  BONUS_FEATURE: "Bonus Özellik",
  EARLY_BIRD: "Erken Kayıt",
  SUMMER_SCHOOL: "Yaz Okulu",
  WINTER_CAMP: "Kış Kampı",
  FREE_TRIAL: "Ücretsiz Deneme",
  SIBLING_DISCOUNT: "Kardeş İndirimi",
  LOYALTY_REWARD: "Sadakat Ödülü",
  REFERRAL_BONUS: "Tavsiye Bonusu",
  NEW_STUDENT: "Yeni Öğrenci",
  SCHOLARSHIP: "Burs",
  INSTALLMENT: "Taksit İmkanı",
  SEASONAL: "Mevsimlik",
  SPECIAL_EVENT: "Özel Etkinlik",
  BUNDLE_DEAL: "Paket Anlaşma",
  LIMITED_TIME: "Sınırlı Süre",
  FLASH_SALE: "Flaş İndirim",
  OTHER: "Diğer",
} as const;

// Empty state configurations
export const EMPTY_STATE_CONFIG = {
  all: {
    icon: "ph-list",
    title: "Kampanya Bulunmuyor",
    description:
      "Bu kurum için şu anda herhangi bir kampanya bulunmamaktadır. Yeni kampanyalar için takipte kalın.",
  },
  active: {
    icon: "ph-tag",
    title: "Aktif Kampanya Bulunmuyor",
    description:
      "Şu anda bu kurum için aktif bir kampanya bulunmamaktadır. Yakında yeni fırsatlar için takipte kalın.",
  },
  inactive: {
    icon: "ph-clock",
    title: "Geçmiş Kampanya Bulunmuyor",
    description: "Bu kurum için daha önce yapılmış kampanya bulunmamaktadır.",
  },
} as const;

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
