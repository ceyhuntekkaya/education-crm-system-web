import { CampaignFormData } from "../types";

// Initial values for the campaign form
export const campaignInitialValues: CampaignFormData = {
  // Basic Information
  title: "",
  description: "",
  shortDescription: "",
  campaignType: undefined,
  academicYear: "",
  
  // Discount Information
  discountType: undefined,
  discountAmount: undefined,
  discountPercentage: undefined,
  maxDiscountAmount: undefined,
  minPurchaseAmount: undefined,
  promoCode: "",
  
  // Date Information
  startDate: "",
  endDate: "",
  earlyBirdEndDate: "",
  registrationDeadline: "",
  enrollmentStartDate: "",
  enrollmentEndDate: "",
  
  // Target Audience
  targetAudience: undefined,
  targetGradeLevels: "",
  targetAgeMin: undefined,
  targetAgeMax: undefined,
  targetNewStudentsOnly: false,
  targetSiblingDiscount: false,
  
  // Limits and Settings
  isFeatured: false,
  isPublic: true,
  requiresApproval: false,
  usageLimit: undefined,
  perUserLimit: undefined,
  perSchoolLimit: undefined,
  priority: undefined,
  sortOrder: undefined,
  freeTrialDays: undefined,
  
  // Media and Visual Content
  bannerImageUrl: "",
  thumbnailImageUrl: "",
  videoUrl: "",
  ctaText: "",
  ctaUrl: "",
  badgeText: "",
  badgeColor: "",
  
  // Terms and Conditions
  termsAndConditions: "",
  finePrint: "",
  exclusions: "",
  paymentDeadlineDays: undefined,
  installmentOptions: "",
  refundPolicy: "",
  
  // Additional Features
  freeServices: "",
  bonusFeatures: "",
  giftItems: "",
  
  // SEO and Meta Information
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  
  // System Fields
  createdByUserId: undefined,
  schoolIds: undefined,
};
