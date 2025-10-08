import { CampaignStatus, CampaignType } from "@/enums";
import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { BadgeVariant, CampaignStats } from "../types";

/**
 * Get badge variant based on campaign status
 * @param status - Campaign status
 * @returns Badge variant for styling
 */
export const getStatusBadgeVariant = (status?: string): BadgeVariant => {
  switch (status) {
    case CampaignStatus.ACTIVE:
      return "success";
    case CampaignStatus.PENDING_APPROVAL:
      return "warning";
    case CampaignStatus.EXPIRED:
      return "danger";
    case CampaignStatus.PAUSED:
      return "secondary";
    case CampaignStatus.DRAFT:
      return "secondary";
    case CampaignStatus.CANCELLED:
      return "danger";
    case CampaignStatus.COMPLETED:
      return "info";
    default:
      return "secondary";
  }
};

/**
 * Get Turkish display text for campaign type
 * @param type - Campaign type enum value
 * @returns Turkish display text
 */
export const getCampaignTypeDisplay = (type?: string): string => {
  switch (type) {
    case CampaignType.DISCOUNT:
      return "İndirim";
    case CampaignType.FREE_SERVICE:
      return "Ücretsiz Hizmet";
    case CampaignType.BONUS_FEATURE:
      return "Bonus Özellik";
    case CampaignType.EARLY_BIRD:
      return "Erken Kayıt";
    case CampaignType.SUMMER_SCHOOL:
      return "Yaz Okulu";
    case CampaignType.WINTER_CAMP:
      return "Kış Kampı";
    case CampaignType.FREE_TRIAL:
      return "Ücretsiz Deneme";
    case CampaignType.SIBLING_DISCOUNT:
      return "Kardeş İndirimi";
    case CampaignType.LOYALTY_REWARD:
      return "Sadakat Ödülü";
    case CampaignType.REFERRAL_BONUS:
      return "Tavsiye Bonusu";
    case CampaignType.NEW_STUDENT:
      return "Yeni Öğrenci";
    case CampaignType.SCHOLARSHIP:
      return "Burs";
    case CampaignType.INSTALLMENT:
      return "Taksit";
    case CampaignType.SEASONAL:
      return "Mevsimlik";
    case CampaignType.SPECIAL_EVENT:
      return "Özel Etkinlik";
    case CampaignType.BUNDLE_DEAL:
      return "Paket Anlaşma";
    case CampaignType.LIMITED_TIME:
      return "Sınırlı Süre";
    case CampaignType.FLASH_SALE:
      return "Flaş İndirim";
    case CampaignType.OTHER:
      return "Diğer";
    default:
      return type || "-";
  }
};

/**
 * Get Turkish display text for campaign status
 * @param status - Campaign status enum value
 * @returns Turkish display text
 */
export const getStatusDisplay = (status?: string): string => {
  switch (status) {
    case CampaignStatus.ACTIVE:
      return "Aktif";
    case CampaignStatus.PENDING_APPROVAL:
      return "Onay Bekliyor";
    case CampaignStatus.APPROVED:
      return "Onaylandı";
    case CampaignStatus.EXPIRED:
      return "Süresi Doldu";
    case CampaignStatus.PAUSED:
      return "Duraklatıldı";
    case CampaignStatus.DRAFT:
      return "Taslak";
    case CampaignStatus.CANCELLED:
      return "İptal Edildi";
    case CampaignStatus.COMPLETED:
      return "Tamamlandı";
    case CampaignStatus.ARCHIVED:
      return "Arşivlendi";
    default:
      return status || "-";
  }
};

/**
 * Filter campaigns by status
 */
export const getActiveCampaigns = (campaigns: CampaignDto[]): CampaignDto[] => {
  return campaigns.filter(campaign => campaign.status === CampaignStatus.ACTIVE);
};

export const getPendingCampaigns = (campaigns: CampaignDto[]): CampaignDto[] => {
  return campaigns.filter(campaign => campaign.status === CampaignStatus.PENDING_APPROVAL);
};

export const getExpiredCampaigns = (campaigns: CampaignDto[]): CampaignDto[] => {
  return campaigns.filter(campaign => campaign.status === CampaignStatus.EXPIRED);
};

export const getFeaturedCampaigns = (campaigns: CampaignDto[]): CampaignDto[] => {
  return campaigns.filter(campaign => campaign.isFeatured === true);
};

/**
 * Filter campaigns by type
 */
export const getCampaignsByType = (campaigns: CampaignDto[], type: CampaignType): CampaignDto[] => {
  return campaigns.filter(campaign => campaign.campaignType === type);
};

/**
 * Find campaign by ID
 */
export const getCampaignById = (campaigns: CampaignDto[], id: number): CampaignDto | undefined => {
  return campaigns.find(campaign => campaign.id === id);
};

/**
 * Calculate campaign statistics
 */
export const calculateCampaignStats = (campaigns: CampaignDto[]): CampaignStats => {
  const total = campaigns.length;
  const active = campaigns.filter(c => c.status === CampaignStatus.ACTIVE).length;
  const pending = campaigns.filter(c => c.status === CampaignStatus.PENDING_APPROVAL).length;
  const expired = campaigns.filter(c => c.status === CampaignStatus.EXPIRED).length;
  const paused = campaigns.filter(c => c.status === CampaignStatus.PAUSED).length;
  
  return {
    total,
    active,
    pending,
    expired,
    paused,
    totalApplications: campaigns.reduce((sum, c) => sum + (c.applicationCount || 0), 0),
    totalConversions: campaigns.reduce((sum, c) => sum + (c.conversionCount || 0), 0),
    averageConversionRate: campaigns.reduce((sum, c) => sum + (c.conversionRate || 0), 0) / total
  };
};
