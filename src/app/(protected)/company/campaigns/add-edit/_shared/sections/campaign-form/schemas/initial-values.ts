import { CampaignFormData } from "../types/form-data";

export const initialValues: CampaignFormData = {
  // Basic Information
  title: "",
  description: "",
  shortDescription: "",
  campaignType: "",
  discountType: "",

  // Discount values
  discountAmount: "",
  discountPercentage: undefined,
  maxDiscountAmount: "",
  minPurchaseAmount: "",

  // Campaign period
  startDate: "",
  endDate: "",
  earlyBirdEndDate: "",
  registrationDeadline: "",

  // Enrollment specific dates
  enrollmentStartDate: "",
  enrollmentEndDate: "",
  academicYear: "",

  // Campaign settings
  isFeatured: false,
  isPublic: true,
  requiresApproval: false,

  // Usage limits
  usageLimit: undefined,
  perUserLimit: undefined,
  perSchoolLimit: undefined,

  // Target audience
  targetAudience: undefined,
  targetGradeLevels: "",
  targetAgeMin: undefined,
  targetAgeMax: undefined,
  targetNewStudentsOnly: false,
  targetSiblingDiscount: false,

  // Promotional content
  promoCode: "",
  bannerImageUrl: "",
  thumbnailImageUrl: "",
  videoUrl: "",
  ctaText: "",
  ctaUrl: "",
  badgeText: "",
  badgeColor: "",

  // Terms and conditions
  termsAndConditions: "",
  finePrint: "",
  exclusions: "",

  // SEO
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  // Additional features
  freeTrialDays: undefined,
  installmentOptions: "",
  paymentDeadlineDays: undefined,
  refundPolicy: "",
  freeServices: "",
  bonusFeatures: "",
  giftItems: "",

  // Display and priority
  priority: undefined,
  sortOrder: undefined,

  // School assignments
  schoolIds: [],
};
