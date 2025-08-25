export interface CampaignSchoolDto {
  id?: number;
  campaignId?: number;
  campaignTitle?: string;
  schoolId?: number;
  schoolName?: string;
  campusName?: string;
  assignedByUserName?: string;
  assignedAt?: string;
  status?: string;
  customDiscountAmount?: number;
  customDiscountPercentage?: number;
  customUsageLimit?: number;
  customStartDate?: string;
  customEndDate?: string;
  customTerms?: string;
  priority?: number;
  isFeaturedOnSchool?: boolean;
  showOnHomepage?: boolean;
}
