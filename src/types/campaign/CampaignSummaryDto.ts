export interface CampaignSummaryDto {
  id?: number;
  title?: string;
  shortDescription?: string;
  campaignType?: string;
  discountType?: string;
  displayDiscount?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  badgeText?: string;
  badgeColor?: string;
  thumbnailImageUrl?: string;
  isActive?: boolean;
  isExpired?: boolean;
  daysRemaining?: number;
  schoolCount?: number;
  applicationCount?: number;
  conversionRate?: number;
}
