import { SchoolPricingDto } from "@/types/dto/pricing/SchoolPricingDto";
import { BadgeVariant, PricingStats } from "../types";

/**
 * Get badge variant based on pricing status
 */
export const getStatusBadgeVariant = (status?: string): BadgeVariant => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "PENDING_APPROVAL":
      return "warning";
    case "DRAFT":
      return "secondary";
    case "INACTIVE":
    case "ARCHIVED":
      return "danger";
    case "APPROVED":
      return "info";
    default:
      return "secondary";
  }
};

/**
 * Get display text for pricing status
 */
export const getPricingStatusDisplay = (status?: string): string => {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "PENDING_APPROVAL":
      return "Onay Bekliyor";
    case "APPROVED":
      return "Onaylandı";
    case "DRAFT":
      return "Taslak";
    case "INACTIVE":
      return "Pasif";
    case "ARCHIVED":
      return "Arşivlendi";
    case "SUPERSEDED":
      return "Geçersiz";
    default:
      return "Bilinmiyor";
  }
};

/**
 * Format currency amount
 */
export const formatCurrency = (
  amount?: number,
  currency: string = "TRY"
): string => {
  if (!amount) return "0 ₺";
  
  const formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency === "TRY" ? "TRY" : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

/**
 * Calculate total costs for a pricing
 */
export const calculateTotalCosts = (pricing: SchoolPricingDto) => {
  const oneTimeFees = [
    pricing.registrationFee || 0,
    pricing.applicationFee || 0,
    pricing.enrollmentFee || 0,
  ].reduce((sum, fee) => sum + fee, 0);

  const recurringFees = [
    pricing.annualTuition || 0,
    pricing.bookFee || 0,
    pricing.uniformFee || 0,
    pricing.activityFee || 0,
    pricing.technologyFee || 0,
    pricing.laboratoryFee || 0,
    pricing.libraryFee || 0,
    pricing.sportsFee || 0,
    pricing.artFee || 0,
    pricing.musicFee || 0,
    pricing.transportationFee || 0,
    pricing.cafeteriaFee || 0,
    pricing.insuranceFee || 0,
    pricing.maintenanceFee || 0,
    pricing.securityFee || 0,
    pricing.examFee || 0,
  ].reduce((sum, fee) => sum + fee, 0);

  const optionalFees = [
    pricing.graduationFee || 0,
    pricing.extendedDayFee || 0,
    pricing.tutoringFee || 0,
    pricing.summerSchoolFee || 0,
    pricing.winterCampFee || 0,
    pricing.languageCourseFee || 0,
    pricing.privateLessonFee || 0,
  ].reduce((sum, fee) => sum + fee, 0);

  const customFeesTotal = pricing.customFees?.reduce((sum, fee) => sum + (fee.feeAmount || 0), 0) || 0;

  return {
    oneTimeFees,
    recurringFees,
    optionalFees,
    customFeesTotal,
    totalAnnualCost: oneTimeFees + recurringFees + customFeesTotal,
    totalWithOptional: oneTimeFees + recurringFees + optionalFees + customFeesTotal,
  };
};

/**
 * Filter active pricings
 */
export const getActivePricings = (pricings: SchoolPricingDto[]): SchoolPricingDto[] => {
  return pricings.filter(pricing => pricing.status === "ACTIVE");
};

/**
 * Filter pending pricings
 */
export const getPendingPricings = (pricings: SchoolPricingDto[]): SchoolPricingDto[] => {
  return pricings.filter(pricing => pricing.status === "PENDING_APPROVAL");
};

/**
 * Filter draft pricings
 */
export const getDraftPricings = (pricings: SchoolPricingDto[]): SchoolPricingDto[] => {
  return pricings.filter(pricing => pricing.status === "DRAFT");
};

/**
 * Filter archived pricings
 */
export const getArchivedPricings = (pricings: SchoolPricingDto[]): SchoolPricingDto[] => {
  return pricings.filter(pricing => pricing.status === "ARCHIVED");
};

/**
 * Filter pricings by grade level
 */
export const getPricingsByGradeLevel = (pricings: SchoolPricingDto[], gradeLevel: string): SchoolPricingDto[] => {
  return pricings.filter(pricing => pricing.gradeLevel === gradeLevel);
};

/**
 * Get pricing by ID
 */
export const getPricingById = (pricings: SchoolPricingDto[], id: number): SchoolPricingDto | undefined => {
  return pricings.find(pricing => pricing.id === id);
};

/**
 * Calculate pricing statistics
 */
export const calculatePricingStats = (pricings: SchoolPricingDto[]): PricingStats => {
  const total = pricings.length;
  const active = pricings.filter(p => p.status === "ACTIVE").length;
  const draft = pricings.filter(p => p.status === "DRAFT").length;
  const pending = pricings.filter(p => p.status === "PENDING_APPROVAL").length;
  const archived = pricings.filter(p => p.status === "ARCHIVED").length;

  const activePricings = pricings.filter(p => p.status === "ACTIVE");
  const totalAnnualTuition = activePricings.reduce((sum, p) => sum + (p.annualTuition || 0), 0);
  const totalMonthlyTuition = activePricings.reduce((sum, p) => sum + (p.monthlyTuition || 0), 0);
  
  const averageAnnualTuition = activePricings.length > 0 ? totalAnnualTuition / activePricings.length : 0;
  const averageMonthlyTuition = activePricings.length > 0 ? totalMonthlyTuition / activePricings.length : 0;

  const uniqueSchools = new Set(pricings.map(p => p.schoolId)).size;

  return {
    total,
    active,
    draft,
    pending,
    archived,
    averageAnnualTuition,
    averageMonthlyTuition,
    totalSchools: uniqueSchools,
  };
};
