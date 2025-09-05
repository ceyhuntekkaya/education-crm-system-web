export interface CampaignUsageDto {
  id?: number;
  campaignId?: number;
  campaignTitle?: string;
  schoolId?: number;
  schoolName?: string;
  userId?: number;
  userFullName?: string;
  usageDate?: string;
  usageType?: string;
  status?: string;
  originalAmount?: number;
  discountAmount?: number;
  finalAmount?: number;
  promoCodeUsed?: string;
  studentName?: string;
  studentAge?: number;
  gradeLevel?: string;
}
