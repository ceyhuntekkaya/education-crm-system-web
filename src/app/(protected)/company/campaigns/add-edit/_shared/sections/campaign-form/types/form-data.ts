import { CampaignType, DiscountType, TargetAudience } from "@/enums";

export interface CampaignFormData {
  // Basic Information
  title: string;
  description?: string;
  shortDescription?: string;
  campaignType?: CampaignType | "";
  discountType?: DiscountType | "";

  // Discount values
  discountAmount?: string;
  discountPercentage?: number;
  maxDiscountAmount?: string;
  minPurchaseAmount?: string;

  // Campaign period
  startDate: string;
  endDate: string;
  earlyBirdEndDate?: string;
  registrationDeadline?: string;

  // Enrollment specific dates
  enrollmentStartDate?: string;
  enrollmentEndDate?: string;
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

  // School assignments
  schoolIds?: number[];
}
