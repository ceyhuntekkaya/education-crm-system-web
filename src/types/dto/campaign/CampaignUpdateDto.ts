import { CampaignStatus, DiscountType, TargetAudience } from "@/enums";

export interface CampaignUpdateDto {
  title?: string;
  description?: string;
  shortDescription?: string;
  discountType?: DiscountType;

  // Discount values
  discountAmount?: string; // BigDecimal as string
  discountPercentage?: number;
  maxDiscountAmount?: string; // BigDecimal as string
  minPurchaseAmount?: string; // BigDecimal as string

  // Campaign period
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  earlyBirdEndDate?: string; // ISO date string
  registrationDeadline?: string; // ISO date string

  // Campaign settings
  status?: CampaignStatus;
  isFeatured?: boolean;
  isPublic?: boolean;

  // Usage limits
  usageLimit?: number;
  perUserLimit?: number;
  perSchoolLimit?: number;

  // Target audience
  targetAudience?: TargetAudience;
  targetGradeLevels?: string;
  targetAgeMin?: number;
  targetAgeMax?: number;

  // Promotional content
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

  // Additional features
  freeTrialDays?: number;
  installmentOptions?: string;
  paymentDeadlineDays?: number;
  refundPolicy?: string;

  // Display
  priority?: number;
  sortOrder?: number;
}
