import { CampaignType, DiscountType, TargetAudience } from "@/enums";

/**
 * Campaign Type Türkçe karşılıkları
 */
export const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  [CampaignType.DISCOUNT]: "İndirim Kampanyası",
  [CampaignType.FREE_SERVICE]: "Ücretsiz Hizmet",
  [CampaignType.BONUS_FEATURE]: "Bonus Özellik",
  [CampaignType.EARLY_BIRD]: "Erken Kayıt",
  [CampaignType.SUMMER_SCHOOL]: "Yaz Okulu",
  [CampaignType.WINTER_CAMP]: "Kış Kampı",
  [CampaignType.FREE_TRIAL]: "Ücretsiz Deneme",
  [CampaignType.SIBLING_DISCOUNT]: "Kardeş İndirimi",
  [CampaignType.LOYALTY_REWARD]: "Sadakat Ödülü",
  [CampaignType.REFERRAL_BONUS]: "Tavsiye Bonusu",
  [CampaignType.NEW_STUDENT]: "Yeni Öğrenci",
  [CampaignType.SCHOLARSHIP]: "Burs",
  [CampaignType.INSTALLMENT]: "Taksit",
  [CampaignType.SEASONAL]: "Mevsimlik",
  [CampaignType.SPECIAL_EVENT]: "Özel Etkinlik",
  [CampaignType.BUNDLE_DEAL]: "Paket Anlaşma",
  [CampaignType.LIMITED_TIME]: "Sınırlı Süre",
  [CampaignType.FLASH_SALE]: "Flaş İndirim",
  [CampaignType.OTHER]: "Diğer",
};

/**
 * Discount Type Türkçe karşılıkları
 */
export const DISCOUNT_TYPE_LABELS: Record<DiscountType, string> = {
  [DiscountType.FIXED_AMOUNT]: "Sabit Tutar",
  [DiscountType.PERCENTAGE]: "Yüzde",
  [DiscountType.FREE_MONTHS]: "Ücretsiz Ay",
  [DiscountType.BUY_X_GET_Y]: "X Al Y Öde",
  [DiscountType.TIERED]: "Kademeli",
  [DiscountType.BUNDLE]: "Paket",
  [DiscountType.NO_DISCOUNT]: "İndirim Yok",
};

/**
 * Target Audience Türkçe karşılıkları
 */
export const TARGET_AUDIENCE_LABELS: Record<TargetAudience, string> = {
  [TargetAudience.ALL]: "Herkese",
  [TargetAudience.NEW_STUDENTS]: "Yeni Öğrenciler",
  [TargetAudience.EXISTING_STUDENTS]: "Mevcut Öğrenciler",
  [TargetAudience.SIBLINGS]: "Kardeşler",
  [TargetAudience.EARLY_REGISTRANTS]: "Erken Kayıt Olanlar",
  [TargetAudience.LOCAL_RESIDENTS]: "Yerel Sakinler",
  [TargetAudience.REFERRALS]: "Tavsiye Edilenler",
  [TargetAudience.VIP_MEMBERS]: "VIP Üyeler",
  [TargetAudience.SPECIFIC_GRADES]: "Belirli Sınıflar",
  [TargetAudience.SPECIFIC_AGES]: "Belirli Yaşlar",
  [TargetAudience.LOYALTY_MEMBERS]: "Sadakat Üyeleri",
  [TargetAudience.FIRST_TIME_VISITORS]: "İlk Kez Gelenler",
};
