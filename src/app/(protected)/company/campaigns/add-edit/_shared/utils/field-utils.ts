import { CampaignUpdateDto } from "@/types";

// UpdateDto için izin verilen alanlar (CampaignUpdateDto'daki tüm optional alanlar)
const ALLOWED_UPDATE_FIELDS: (keyof CampaignUpdateDto)[] = [
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
  "status",
  "isFeatured",
  "isPublic",
  "usageLimit",
  "perUserLimit",
  "perSchoolLimit",
  "targetAudience",
  "targetGradeLevels",
  "targetAgeMin",
  "targetAgeMax",
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
  "freeTrialDays",
  "installmentOptions",
  "paymentDeadlineDays",
  "refundPolicy",
  "priority",
  "sortOrder",
];

/**
 * Edit işlemi için sadece izin verilen alanları filtreler
 */
export const filterDataForEdit = (data: any): CampaignUpdateDto => {
  const filteredData: Partial<CampaignUpdateDto> = {};

  ALLOWED_UPDATE_FIELDS.forEach((field) => {
    if (field in data && data[field] !== undefined) {
      (filteredData as any)[field] = data[field];
    }
  });

  return filteredData as CampaignUpdateDto;
};
