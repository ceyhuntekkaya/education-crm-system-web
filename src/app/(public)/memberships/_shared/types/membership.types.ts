import { ReactNode } from "react";

// ==============================
// API TYPES
// ==============================

/**
 * API'dan gelen subscription plan yapısı
 */
// ==============================
// UI TYPES
// ==============================

/**
 * UI için kullanılacak membership plan yapısı (API verisinden dönüştürülmüş)
 */
export interface MembershipPlan {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  description?: string;
  price: MembershipPrice;
  billingPeriod?: BillingPeriod;
  discountPercentage?: number;
  trialDays?: number;
  features: MembershipFeature[];
  limits: MembershipLimits;
  capabilities: MembershipCapabilities;
  isPopular?: boolean;
  sortOrder?: number;
  buttonText: string;
  buttonLink: string;
}

/**
 * Membership plan fiyat yapısı
 */
export interface MembershipPrice {
  monthly: number;
  quarterly?: number;
  yearly: number;
  onetime?: number;
}

/**
 * Membership plan limitleri
 */
export interface MembershipLimits {
  maxSchools?: number;
  maxUsers?: number;
  maxAppointmentsPerMonth?: number;
  maxGalleryItems?: number;
  maxPostsPerMonth?: number;
  storageGb?: number;
}

/**
 * Membership plan yetenekleri
 */
export interface MembershipCapabilities {
  hasAnalytics: boolean;
  hasCustomDomain: boolean;
  hasApiAccess: boolean;
  hasPrioritySupport: boolean;
  hasWhiteLabel: boolean;
}

/**
 * Membership plan özelliği
 */
export interface MembershipFeature {
  id: string;
  text: string;
  included: boolean;
  highlight?: boolean;
}

// ==============================
// BILLING TYPES
// ==============================

/**
 * UI billing period tipleri
 */
export type BillingPeriod = "monthly" | "quarterly" | "yearly" | "onetime";

/**
 * API billing period tipleri
 */
export type ApiBillingPeriod = "MONTHLY" | "QUARTERLY" | "YEARLY" | "ONETIME";

/**
 * Pricing toggle durumu
 */
export interface PricingToggleState {
  isYearly: boolean;
  yearlyDiscount: number;
}

// ==============================
// CONTEXT TYPES
// ==============================

/**
 * Membership context tipi
 */
export interface MembershipContextType {
  plans: MembershipPlan[];
  loading: boolean;
  error: string | null;
  billingPeriod: BillingPeriod;
  setBillingPeriod: (period: BillingPeriod) => void;
  isYearly: boolean;
  yearlyDiscount: number;
  toggleBillingPeriod: () => void;
  refetchPlans: () => void;
}

// ==============================
// COMPONENT PROPS TYPES
// ==============================

/**
 * Membership card component props
 */
export interface MembershipCardProps {
  plan: MembershipPlan;
  index: number;
}

/**
 * Membership provider props
 */
export interface MembershipProviderProps {
  children: ReactNode;
}

/**
 * Memberships layout props
 */
export interface MembershipsLayoutProps {
  children: ReactNode;
}
