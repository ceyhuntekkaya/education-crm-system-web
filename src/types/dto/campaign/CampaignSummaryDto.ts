export interface CampaignSummaryDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  description?: string;
  campaignType?: string;
  discountType?: string;
  /** Format: double */
  discountAmount?: number;
  /** Format: double */
  discountPercentage?: number;
  badgeText?: string;
  badgeColor?: string;
  thumbnailImageUrl?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
};