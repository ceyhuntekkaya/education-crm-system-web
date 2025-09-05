export interface CampaignUpdateDto {
  title?: string;
  description?: string;
  shortDescription?: string;
  discountType?: string;
  discountAmount?: number;
  discountPercentage?: number;
  maxDiscountAmount?: number;
  minPurchaseAmount?: number;
  startDate?: string;
  endDate?: string;
  earlyBirdEndDate?: string;
  registrationDeadline?: string;
  status?: string;
  isFeatured?: boolean;
  isPublic?: boolean;
}
