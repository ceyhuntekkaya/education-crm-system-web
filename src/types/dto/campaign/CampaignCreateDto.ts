import { CampaignType, DiscountType, TargetAudience } from "@/enums";

export interface CampaignCreateDto {
  title: string;
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

  // Campaign settings
  isFeatured?: boolean;
  isPublic?: boolean;
  requiresApproval?: boolean;

  // Usage limits
  usageLimit?: number;
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

  // Creator
  createdByUserId?: number;

  // School assignments
  schoolIds?: number[];
}
