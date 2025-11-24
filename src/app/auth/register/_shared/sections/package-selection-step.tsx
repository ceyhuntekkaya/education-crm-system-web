"use client";

import React from "react";
import { useForm } from "@/contexts/form-context";
import { useRegister } from "../context/register-context";
import { transformSubscriptionPlan } from "@/app/(public)/memberships/_shared/utils";
import MembershipCard from "@/app/(public)/memberships/_shared/sections/membership-card";
import { LoadingSpinner } from "@/components/ui/loadings/loading-spinner";

/**
 * Step 5: Package Selection
 * Paket seçimi
 */
export const PackageSelectionStep: React.FC = () => {
  const { values, setValue } = useForm();
  const { subscriptionPlans, plansLoading } = useRegister();

  const packageSelection = values?.packageSelection || {};
  const selectedPlanId = packageSelection.selectedPlanId;

  const handlePlanSelect = (planId: string) => {
    // Seçilen planın detaylarını bul
    const selectedPlan = transformedPlans.find((plan) => plan.id === planId);

    if (selectedPlan) {
      // Plan detaylarını kaydet
      setValue("packageSelection", {
        selectedPlanId: planId,
        planName: selectedPlan.name,
        planDisplayName: selectedPlan.displayName,
        billingPeriod: selectedPlan.billingPeriod || "monthly",
        price:
          selectedPlan.billingPeriod === "yearly"
            ? selectedPlan.price.yearly
            : selectedPlan.billingPeriod === "quarterly"
            ? selectedPlan.price.quarterly
            : selectedPlan.price.monthly,
        discountPercentage: selectedPlan.discountPercentage,
        trialDays: selectedPlan.trialDays,
      });
    }
  };

  // API verilerini UI formatına dönüştür
  const transformedPlans = React.useMemo(() => {
    if (
      !subscriptionPlans ||
      !Array.isArray(subscriptionPlans) ||
      subscriptionPlans.length === 0
    ) {
      return [];
    }

    return subscriptionPlans
      .filter((plan) => plan.isActive && plan.isVisible)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map(transformSubscriptionPlan);
  }, [subscriptionPlans]);

  return (
    <div className="register-step-content">
      {/* Plans Grid */}
      {plansLoading ? (
        <LoadingSpinner
          message="Paketler yükleniyor..."
          size="lg"
          variant="dots"
        />
      ) : (
        <div className="row row-gap-64">
          {transformedPlans.map((plan, index) => (
            <MembershipCard
              key={plan.id}
              plan={plan}
              index={index}
              onClick={() => handlePlanSelect(plan.id)}
              isActive={selectedPlanId === plan.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
