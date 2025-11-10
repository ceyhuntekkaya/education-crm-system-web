import { CampaignSchoolDto, CampaignDto } from "@/types";

/**
 * CampaignSchoolDto'yu CampaignDto formatına dönüştürür
 * CampaignCard componenti CampaignDto bekliyor
 */
export const mapCampaignSchoolToCampaignDto = (
  campaignSchool: CampaignSchoolDto
): CampaignDto => {
  return {
    id: campaignSchool.campaignId || campaignSchool.id,
    title: campaignSchool.campaignTitle || "",
    slug: "",
    description: campaignSchool.customTerms || "",
    shortDescription: campaignSchool.customTerms || "",
    campaignType: "DISCOUNT" as any, // Default type
    discountType: "PERCENTAGE" as any, // Default type
    
    // Discount values - custom veya default kullan
    discountAmount: campaignSchool.customDiscountAmount 
      ? String(campaignSchool.customDiscountAmount) 
      : undefined,
    discountPercentage: campaignSchool.customDiscountPercentage,
    
    // Dates - effectivePeriod'dan parse edilebilir veya custom dates kullanılabilir
    startDate: campaignSchool.customStartDate || "",
    endDate: campaignSchool.customEndDate || "",
    
    // Status - ACTIVE ise isActive = true
    status: campaignSchool.status as any,
    isActive: campaignSchool.status === "ACTIVE",
    isFeatured: campaignSchool.isFeaturedOnSchool || false,
    isPublic: true,
    requiresApproval: false,
    
    // Usage
    usageLimit: campaignSchool.customUsageLimit,
    usageCount: campaignSchool.usageCount,
    
    // Badge info - effectiveDiscount'u badge olarak kullanabiliriz
    badgeText: campaignSchool.effectiveDiscount || undefined,
    badgeColor: campaignSchool.isFeaturedOnSchool ? "#F97316" : "#10B981",
    thumbnailImageUrl: undefined, // CampaignSchoolDto'da yok
    
    // Analytics
    viewCount: campaignSchool.viewCount,
    clickCount: campaignSchool.clickCount,
    applicationCount: campaignSchool.applicationCount,
    conversionCount: campaignSchool.conversionCount,
    
    // Priority
    priority: campaignSchool.priority,
    
    // Timestamps
    createdAt: campaignSchool.assignedAt || "",
    updatedAt: campaignSchool.assignedAt || "",
    
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

