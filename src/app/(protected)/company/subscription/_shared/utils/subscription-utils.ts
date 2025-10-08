import { SubscriptionPlanDto } from "@/types/dto/subscription/SubscriptionPlanDto";
import { BadgeVariant, SubscriptionStats } from "../types";

// Status badge variant mapping
export const getStatusBadgeVariant = (isActive: boolean): BadgeVariant => {
  return isActive ? "success" : "secondary";
};

// Billing period display mapping
export const getBillingPeriodDisplay = (billingPeriod: string): string => {
  const periodMap: Record<string, string> = {
    MONTHLY: "Aylık",
    QUARTERLY: "3 Aylık",
    YEARLY: "Yıllık",
    ONETIME: "Tek Seferlik",
  };
  return periodMap[billingPeriod] || billingPeriod;
};

// Format price with currency
export const formatPrice = (price: number, billingPeriod?: string): string => {
  if (price === 0) return "Ücretsiz";
  
  const formattedPrice = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  
  if (billingPeriod) {
    const period = getBillingPeriodDisplay(billingPeriod);
    return `${formattedPrice} / ${period}`;
  }
  
  return formattedPrice;
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

// Calculate subscription statistics
export const calculateSubscriptionStats = (subscriptions: SubscriptionPlanDto[]): SubscriptionStats => {
  const stats: SubscriptionStats = {
    totalPlans: subscriptions.length,
    activePlans: subscriptions.filter(s => s.isActive).length,
    visiblePlans: subscriptions.filter(s => s.isVisible).length,
    popularPlans: subscriptions.filter(s => s.isPopular).length,
    monthlyPlans: subscriptions.filter(s => s.billingPeriod === "MONTHLY").length,
    yearlyPlans: subscriptions.filter(s => s.billingPeriod === "YEARLY").length,
    averagePrice: subscriptions.reduce((sum, s) => sum + (s.price || 0), 0) / subscriptions.length,
  };
  
  return stats;
};

// Get subscription status display
export const getSubscriptionStatusDisplay = (isActive: boolean): string => {
  return isActive ? "Aktif" : "Pasif";
};

// Get visibility status display
export const getVisibilityStatusDisplay = (isVisible: boolean): string => {
  return isVisible ? "Görünür" : "Gizli";
};

// Get popular status display
export const getPopularStatusDisplay = (isPopular: boolean): string => {
  return isPopular ? "Popüler" : "Normal";
};

// Calculate monthly equivalent price
export const calculateMonthlyPrice = (subscription: SubscriptionPlanDto): number => {
  if (!subscription.price) return 0;
  
  switch (subscription.billingPeriod) {
    case "MONTHLY":
      return subscription.price;
    case "QUARTERLY":
      return subscription.price / 3;
    case "YEARLY":
      return subscription.price / 12;
    case "ONETIME":
      return subscription.price; // One-time payment
    default:
      return subscription.price;
  }
};

// Get feature list from JSON string
export const getFeatureList = (featuresJson: string | undefined): string[] => {
  if (!featuresJson) return [];
  
  try {
    return JSON.parse(featuresJson);
  } catch (e) {
    return [];
  }
};

// Get pricing tiers from JSON string
export const getPricingTiers = (pricingTiersJson: string | undefined): any[] => {
  if (!pricingTiersJson) return [];
  
  try {
    return JSON.parse(pricingTiersJson);
  } catch (e) {
    return [];
  }
};

// Check if subscription has specific feature
export const hasFeature = (subscription: SubscriptionPlanDto, feature: string): boolean => {
  switch (feature) {
    case "analytics":
      return subscription.hasAnalytics || false;
    case "customDomain":
      return subscription.hasCustomDomain || false;
    case "apiAccess":
      return subscription.hasApiAccess || false;
    case "prioritySupport":
      return subscription.hasPrioritySupport || false;
    case "whiteLabel":
      return subscription.hasWhiteLabel || false;
    default:
      return false;
  }
};

// Get subscription tier level
export const getSubscriptionTier = (subscription: SubscriptionPlanDto): { tier: string; variant: BadgeVariant } => {
  const monthlyPrice = calculateMonthlyPrice(subscription);
  
  if (monthlyPrice === 0) return { tier: "Ücretsiz", variant: "secondary" };
  if (monthlyPrice < 300) return { tier: "Temel", variant: "info" };
  if (monthlyPrice < 600) return { tier: "Profesyonel", variant: "primary" };
  if (monthlyPrice < 1000) return { tier: "Premium", variant: "warning" };
  return { tier: "Kurumsal", variant: "danger" };
};

// Calculate storage display
export const formatStorage = (storageGb: number): string => {
  if (storageGb < 1) return `${storageGb * 1024} MB`;
  if (storageGb >= 1000) return `${storageGb / 1000} TB`;
  return `${storageGb} GB`;
};

// Get trial period display
export const getTrialDisplay = (trialDays: number): string => {
  if (trialDays === 0) return "Deneme Yok";
  if (trialDays === 1) return "1 Gün Deneme";
  if (trialDays < 30) return `${trialDays} Gün Deneme`;
  if (trialDays === 30) return "1 Ay Deneme";
  return `${Math.floor(trialDays / 30)} Ay Deneme`;
};

// Sort subscriptions by different criteria
export const sortSubscriptions = (
  subscriptions: SubscriptionPlanDto[],
  sortBy: "name" | "price" | "createdAt" | "sortOrder",
  order: "asc" | "desc" = "asc"
): SubscriptionPlanDto[] => {
  return [...subscriptions].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy) {
      case "name":
        aValue = a.displayName?.toLowerCase() || "";
        bValue = b.displayName?.toLowerCase() || "";
        break;
      case "price":
        aValue = calculateMonthlyPrice(a);
        bValue = calculateMonthlyPrice(b);
        break;
      case "createdAt":
        aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        break;
      case "sortOrder":
        aValue = a.sortOrder || 0;
        bValue = b.sortOrder || 0;
        break;
      default:
        return 0;
    }
    
    if (order === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
};

// Get time ago display
export const getTimeAgo = (date: string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Az önce";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  
  return targetDate.toLocaleDateString("tr-TR");
};
