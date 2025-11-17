import { CampaignSchoolDto, CampaignDto } from "@/types";

/**
 * effectivePeriod formatından tarihleri parse eder
 * Format: "01.11.2025 - 07.11.2025"
 */
const parseEffectivePeriod = (
  effectivePeriod?: string
): { startDate: string; endDate: string } => {
  if (!effectivePeriod) {
    return { startDate: "", endDate: "" };
  }

  try {
    const dates = effectivePeriod.split(" - ");
    if (dates.length !== 2) {
      return { startDate: "", endDate: "" };
    }

    // DD.MM.YYYY formatını ISO formatına çevir
    const parseDate = (dateStr: string): string => {
      const [day, month, year] = dateStr.trim().split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    return {
      startDate: parseDate(dates[0]),
      endDate: parseDate(dates[1]),
    };
  } catch (error) {
    return { startDate: "", endDate: "" };
  }
};

/**
 * effectiveDiscount formatından discount bilgilerini parse eder
 * Format: "%12 İndirim" veya "500 TL İndirim"
 */
const parseEffectiveDiscount = (
  effectiveDiscount?: string
): { discountType: "PERCENTAGE" | "AMOUNT"; value: number } => {
  if (!effectiveDiscount) {
    return { discountType: "PERCENTAGE", value: 0 };
  }

  // Yüzde indirim kontrolü
  if (effectiveDiscount.includes("%")) {
    const match = effectiveDiscount.match(/(\d+)/);
    return {
      discountType: "PERCENTAGE",
      value: match ? parseInt(match[1]) : 0,
    };
  }

  // Tutar indirim kontrolü
  const match = effectiveDiscount.match(/(\d+)/);
  return {
    discountType: "AMOUNT",
    value: match ? parseInt(match[1]) : 0,
  };
};

/**
 * CampaignSchoolDto'yu CampaignDto formatına dönüştürür
 * CampaignCard componenti CampaignDto bekliyor
 */
export const mapCampaignSchoolToCampaignDto = (
  campaignSchool: CampaignSchoolDto
): CampaignDto => {
  const { startDate, endDate } = parseEffectivePeriod(
    campaignSchool.effectivePeriod
  );
  const discountInfo = parseEffectiveDiscount(campaignSchool.effectiveDiscount);

  return {
    id: campaignSchool.campaignId || campaignSchool.id,
    title: campaignSchool.campaignTitle || "",
    slug: `campaign-${campaignSchool.campaignId || campaignSchool.id}`,
    description:
      campaignSchool.customTerms ||
      campaignSchool.schoolNotes ||
      "Kampanya hakkında detaylı bilgi için iletişime geçiniz.",
    shortDescription: campaignSchool.customTerms || undefined,
    campaignType: "DISCOUNT" as any,
    discountType: discountInfo.discountType as any,

    // Discount values - custom veya parsed değerleri kullan
    discountAmount:
      campaignSchool.customDiscountAmount ||
      (discountInfo.discountType === "AMOUNT"
        ? String(discountInfo.value)
        : undefined),
    discountPercentage:
      campaignSchool.customDiscountPercentage ||
      (discountInfo.discountType === "PERCENTAGE"
        ? discountInfo.value
        : undefined),

    // Dates - effectivePeriod'dan parse et veya custom dates kullan
    startDate: campaignSchool.customStartDate || startDate,
    endDate: campaignSchool.customEndDate || endDate,

    // Status - ACTIVE ise isActive = true
    status: campaignSchool.status as any,
    isActive: campaignSchool.status === "ACTIVE",
    isFeatured: campaignSchool.isFeaturedOnSchool || false,
    isPublic: true,
    requiresApproval: campaignSchool.approvedBySchool === false,

    // Usage
    usageLimit: campaignSchool.customUsageLimit,
    usageCount: campaignSchool.usageCount,

    // Badge info - effectiveDiscount'u badge olarak kullan
    badgeText: campaignSchool.effectiveDiscount || undefined,
    badgeColor: campaignSchool.isFeaturedOnSchool ? "#F97316" : "#10B981",
    thumbnailImageUrl: campaignSchool?.thumbnailImageUrl || undefined, // CampaignSchoolDto'da görsel URL'i yok

    // Analytics
    viewCount: campaignSchool.viewCount || 0,
    clickCount: campaignSchool.clickCount || 0,
    applicationCount: campaignSchool.applicationCount || 0,
    conversionCount: campaignSchool.conversionCount || 0,

    // Priority
    priority: campaignSchool.priority || 0,
    sortOrder: campaignSchool.priority || 0,

    // Timestamps
    createdAt: campaignSchool.assignedAt || new Date().toISOString(),
    updatedAt:
      campaignSchool.approvedBySchoolAt ||
      campaignSchool.assignedAt ||
      new Date().toISOString(),

    // Calculated fields
    displayDiscount: campaignSchool.effectiveDiscount,
    campaignPeriod: campaignSchool.effectivePeriod,
  };
};

/**
 * CampaignSchoolDto array'ini CampaignDto array'ine dönüştürür
 */
export const mapCampaignSchoolArrayToCampaignDtoArray = (
  campaignSchools: CampaignSchoolDto[]
): CampaignDto[] => {
  return campaignSchools.map(mapCampaignSchoolToCampaignDto);
};
