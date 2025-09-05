export interface CampaignSummaryDto {
  id?: number;
  title?: string;
  description?: string;
  campaignType?: string;
  discountType?: string;
  discountAmount?: number;
  discountPercentage?: number;
  badgeText?: string;
  badgeColor?: string;
  thumbnailImageUrl?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}
