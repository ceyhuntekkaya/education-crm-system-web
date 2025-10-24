import { CampaignCreateDto } from "@/types";

// UpdateDto için izin verilen alanlar
const ALLOWED_UPDATE_FIELDS: (keyof CampaignCreateDto)[] = [
  "title",
  "description",
  "shortDescription",
  "discountType",
  "discountAmount",
  "discountPercentage",
  "maxDiscountAmount",
  "minPurchaseAmount",
  "startDate",
  "endDate",
  "earlyBirdEndDate",
  "registrationDeadline",
  "enrollmentStartDate",
  "enrollmentEndDate",
  "academicYear",
  "isFeatured",
  "isPublic",
  "requiresApproval",
  "usageLimit",
  "perUserLimit",
  "perSchoolLimit",
  "targetAudience",
  "targetGradeLevels",
  "targetAgeMin",
  "targetAgeMax",
  "targetNewStudentsOnly",
  "targetSiblingDiscount",
  "promoCode",
  "bannerImageUrl",
  "thumbnailImageUrl",
  "videoUrl",
  "ctaText",
  "ctaUrl",
  "badgeText",
  "badgeColor",
  "termsAndConditions",
  "finePrint",
  "exclusions",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
  "freeTrialDays",
  "installmentOptions",
  "paymentDeadlineDays",
  "refundPolicy",
  "freeServices",
  "bonusFeatures",
  "giftItems",
  "priority",
  "sortOrder",
];

/**
 * Edit işlemi için sadece izin verilen alanları filtreler
 */
export const filterDataForEdit = (
  data: CampaignCreateDto
): Partial<CampaignCreateDto> => {
  const filteredData: Partial<CampaignCreateDto> = {};

  ALLOWED_UPDATE_FIELDS.forEach((field) => {
    if (field in data) {
      (filteredData as any)[field] = data[field];
    }
  });

  return filteredData;
};
