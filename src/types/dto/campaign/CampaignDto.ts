export interface CampaignDto {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  campaignType?: string;
  discountType?: string;
  discountAmount?: number;
  discountPercentage?: number;
  maxDiscountAmount?: number;
  minPurchaseAmount?: number;
  startDate?: string;
  endDate?: string;
  earlyBirdEndDate?: string;
}
