export interface CampaignSchoolAssignDto {
  campaignId?: number;
  schoolIds?: number[];
  assignedByUserId?: number;
  customDiscountAmount?: number;
  customDiscountPercentage?: number;
  customUsageLimit?: number;
  customStartDate?: string;
  customEndDate?: string;
  customTerms?: string;
  priority?: number;
  isFeaturedOnSchool?: boolean;
  showOnHomepage?: boolean;
  showOnPricingPage?: boolean;
}
