import { CampaignContentDto } from "./CampaignContentDto";
import { CampaignSchoolDto } from "./CampaignSchoolDto";

export interface CampaignDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  /** @enum {string} */
  campaignType?:
    | "DISCOUNT"
    | "FREE_SERVICE"
    | "BONUS_FEATURE"
    | "EARLY_BIRD"
    | "SUMMER_SCHOOL"
    | "WINTER_CAMP"
    | "FREE_TRIAL"
    | "SIBLING_DISCOUNT"
    | "LOYALTY_REWARD"
    | "REFERRAL_BONUS"
    | "NEW_STUDENT"
    | "SCHOLARSHIP"
    | "INSTALLMENT"
    | "SEASONAL"
    | "SPECIAL_EVENT"
    | "BUNDLE_DEAL"
    | "LIMITED_TIME"
    | "FLASH_SALE"
    | "OTHER";
  /** @enum {string} */
  discountType?:
    | "FIXED_AMOUNT"
    | "PERCENTAGE"
    | "FREE_MONTHS"
    | "BUY_X_GET_Y"
    | "TIERED"
    | "BUNDLE"
    | "NO_DISCOUNT";
  discountAmount?: number;
  /** Format: double */
  discountPercentage?: number;
  maxDiscountAmount?: number;
  minPurchaseAmount?: number;
  /** Format: date */
  startDate?: string;
  /** Format: date */
  endDate?: string;
  /** Format: date */
  earlyBirdEndDate?: string;
  /** Format: date */
  registrationDeadline?: string;
  /** Format: date */
  enrollmentStartDate?: string;
  /** Format: date */
  enrollmentEndDate?: string;
  academicYear?: string;
  /** @enum {string} */
  status?:
    | "DRAFT"
    | "PENDING_APPROVAL"
    | "APPROVED"
    | "ACTIVE"
    | "PAUSED"
    | "EXPIRED"
    | "CANCELLED"
    | "COMPLETED"
    | "ARCHIVED";
  isFeatured?: boolean;
  isPublic?: boolean;
  requiresApproval?: boolean;
  /** Format: int32 */
  usageLimit?: number;
  /** Format: int32 */
  usageCount?: number;
  /** Format: int32 */
  perUserLimit?: number;
  /** Format: int32 */
  perSchoolLimit?: number;
  /** @enum {string} */
  targetAudience?:
    | "ALL"
    | "NEW_STUDENTS"
    | "EXISTING_STUDENTS"
    | "SIBLINGS"
    | "EARLY_REGISTRANTS"
    | "LOCAL_RESIDENTS"
    | "REFERRALS"
    | "VIP_MEMBERS"
    | "SPECIFIC_GRADES"
    | "SPECIFIC_AGES"
    | "LOYALTY_MEMBERS"
    | "FIRST_TIME_VISITORS";
  targetGradeLevels?: string;
  /** Format: int32 */
  targetAgeMin?: number;
  /** Format: int32 */
  targetAgeMax?: number;
  targetNewStudentsOnly?: boolean;
  targetSiblingDiscount?: boolean;
  promoCode?: string;
  bannerImageUrl?: string;
  thumbnailImageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  badgeText?: string;
  badgeColor?: string;
  termsAndConditions?: string;
  finePrint?: string;
  exclusions?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  /** Format: int64 */
  viewCount?: number;
  /** Format: int64 */
  clickCount?: number;
  /** Format: int64 */
  applicationCount?: number;
  /** Format: int64 */
  conversionCount?: number;
  /** Format: double */
  conversionRate?: number;
  /** Format: int32 */
  freeTrialDays?: number;
  installmentOptions?: string;
  /** Format: int32 */
  paymentDeadlineDays?: number;
  refundPolicy?: string;
  freeServices?: string;
  bonusFeatures?: string;
  giftItems?: string;
  /** Format: int32 */
  priority?: number;
  /** Format: int32 */
  sortOrder?: number;
  createdByUserName?: string;
  approvedByUserName?: string;
  /** Format: date-time */
  approvedAt?: string;
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
  isActive?: boolean;
  isExpired?: boolean;
  /** Format: int32 */
  daysRemaining?: number;
  formattedDiscountAmount?: string;
  displayDiscount?: string;
  campaignPeriod?: string;
  campaignSchools?: CampaignSchoolDto[];
  campaignContents?: CampaignContentDto[];
}
