export interface MembershipPlan {
  id: string;
  name: string;
  icon: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: MembershipFeature[];
  isPopular?: boolean;
  buttonText: string;
  buttonLink: string;
}

export interface MembershipFeature {
  id: string;
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingToggleState {
  isYearly: boolean;
  yearlyDiscount: number;
}

export type BillingPeriod = "monthly" | "yearly";

export interface MembershipContextType {
  plans: MembershipPlan[];
  billingPeriod: BillingPeriod;
  setBillingPeriod: (period: BillingPeriod) => void;
  isYearly: boolean;
  yearlyDiscount: number;
  toggleBillingPeriod: () => void;
}
