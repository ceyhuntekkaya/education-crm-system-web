"use client";

import { createContext, useContext, useMemo } from "react";
import { MembershipContextType, MembershipProviderProps } from "../types";
import { useSubscriptionPlans } from "../hooks";
import { transformSubscriptionPlan } from "../utils";

const MembershipContext = createContext<MembershipContextType | undefined>(
  undefined
);

export const MembershipProvider = ({ children }: MembershipProviderProps) => {
  // API'dan subscription planlarını getir
  const { subscriptionPlans, loading, error, refetch } = useSubscriptionPlans();

  // API verilerini UI formatına dönüştür
  const transformedPlans = useMemo(() => {
    // subscriptionPlans'in array olduğundan emin ol
    if (
      !subscriptionPlans ||
      !Array.isArray(subscriptionPlans) ||
      subscriptionPlans.length === 0
    ) {
      return [];
    }

    return subscriptionPlans
      .filter((plan) => plan.isActive && plan.isVisible) // Aktif ve görünür planları filtrele
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) // Sıralama düzenine göre sırala
      .map(transformSubscriptionPlan);
  }, [subscriptionPlans]);

  const value: MembershipContextType = {
    plans: transformedPlans,
    loading,
    error,
    billingPeriod: "monthly", // Varsayılan değer
    setBillingPeriod: () => {}, // Boş fonksiyon
    isYearly: false,
    yearlyDiscount: 0,
    toggleBillingPeriod: () => {}, // Boş fonksiyon
    refetchPlans: refetch,
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = () => {
  const context = useContext(MembershipContext);

  if (context === undefined) {
    throw new Error(
      "useMembership hook'u MembershipProvider içinde kullanılmalıdır"
    );
  }

  return context;
};
