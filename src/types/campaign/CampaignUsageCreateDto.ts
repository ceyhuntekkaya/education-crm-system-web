export interface CampaignUsageCreateDto {
  campaignId?: number;
  schoolId?: number;
  userId?: number;
  usageType?: string;
  originalAmount?: number;
  promoCodeUsed?: string;
  studentName?: string;
  studentAge?: number;
  gradeLevel?: string;
  enrollmentYear?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  ipAddress?: string;
}
