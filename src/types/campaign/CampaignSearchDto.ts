export interface CampaignSearchDto {
  searchTerm?: string;
  campaignTypes?: string[];
  discountTypes?: string[];
  statuses?: string[];
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isPublic?: boolean;
  targetAudiences?: string[];
  minTargetAge?: number;
  maxTargetAge?: number;
  schoolId?: number;
  createdByUserId?: number;
  hasPromoCode?: boolean;
  minDiscountPercentage?: number;
  maxDiscountPercentage?: number;
}
