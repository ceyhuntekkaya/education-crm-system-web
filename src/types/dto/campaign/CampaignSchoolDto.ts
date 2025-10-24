import { CampaignSchoolStatus } from "@/enums";

export interface CampaignSchoolDto {
  id: number;
  campaignId: number;
  campaignTitle: string;
  schoolId: number;
  schoolName: string;
  campusName?: string;
  assignedByUserName?: string;
  assignedAt: string; // ISO datetime string
  status: CampaignSchoolStatus;

  // School-specific customizations
  customDiscountAmount?: string; // BigDecimal as string
  customDiscountPercentage?: number;
  customUsageLimit?: number;
  customStartDate?: string; // ISO date string
  customEndDate?: string; // ISO date string
  customTerms?: string;

  // Display settings
  priority?: number;
  isFeaturedOnSchool?: boolean;
  showOnHomepage?: boolean;
  showOnPricingPage?: boolean;

  // Usage tracking
  usageCount?: number;
  applicationCount?: number;
  conversionCount?: number;
  revenueGenerated?: string; // BigDecimal as string

  // Performance metrics
  viewCount?: number;
  clickCount?: number;
  inquiryCount?: number;
  appointmentCount?: number;

  // Approval
  approvedBySchool?: boolean;
  approvedBySchoolUserName?: string;
  approvedBySchoolAt?: string; // ISO datetime string
  schoolNotes?: string;

  // Calculated fields
  effectiveDiscount?: string;
  effectivePeriod?: string;
  performanceScore?: number;
}
