import {
  CampaignStatus,
  CampaignType,
  DiscountType,
  TargetAudience,
} from "@/enums";
import { CampaignContentDto } from "./CampaignContentDto";
import { CampaignSchoolDto } from "./CampaignSchoolDto";

export interface CampaignDto {
  id: number;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  campaignType: CampaignType;
  discountType: DiscountType;

  // Discount values
  discountAmount?: string; // BigDecimal as string
  discountPercentage?: number;
  maxDiscountAmount?: string; // BigDecimal as string
  minPurchaseAmount?: string; // BigDecimal as string

  // Campaign period
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  earlyBirdEndDate?: string; // ISO date string
  registrationDeadline?: string; // ISO date string

  // Enrollment specific dates
  enrollmentStartDate?: string; // ISO date string
  enrollmentEndDate?: string; // ISO date string
  academicYear?: string;

  // Campaign status
  status: CampaignStatus;
  isFeatured: boolean;
  isPublic: boolean;
  requiresApproval: boolean;

  // Usage limits
  usageLimit?: number;
  usageCount?: number;
  perUserLimit?: number;
  perSchoolLimit?: number;

  // Target audience
  targetAudience?: TargetAudience;
  targetGradeLevels?: string;
  targetAgeMin?: number;
  targetAgeMax?: number;
  targetNewStudentsOnly?: boolean;
  targetSiblingDiscount?: boolean;

  // Promotional content
  promoCode?: string;
  bannerImageUrl?: string;
  thumbnailImageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  badgeText?: string;
  badgeColor?: string;

  // Terms and conditions
  termsAndConditions?: string;
  finePrint?: string;
  exclusions?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;

  // Analytics
  viewCount?: number;
  clickCount?: number;
  applicationCount?: number;
  conversionCount?: number;
  conversionRate?: number;

  // Additional features
  freeTrialDays?: number;
  installmentOptions?: string;
  paymentDeadlineDays?: number;
  refundPolicy?: string;
  freeServices?: string;
  bonusFeatures?: string;
  giftItems?: string;

  // Display and priority
  priority?: number;
  sortOrder?: number;

  // Creator info
  createdByUserName?: string;
  approvedByUserName?: string;
  approvedAt?: string; // ISO datetime string
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string

  // Calculated fields
  isActive?: boolean;
  isExpired?: boolean;
  daysRemaining?: number;
  formattedDiscountAmount?: string;
  displayDiscount?: string;
  campaignPeriod?: string;

  // Relationships
  campaignSchools?: CampaignSchoolDto[];
  campaignContents?: CampaignContentDto[];
}
