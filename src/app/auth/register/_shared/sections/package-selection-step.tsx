"use client";

import React from "react";
import { useForm } from "@/contexts/form-context";
import { useSubscriptionPlans } from "@/app/(public)/memberships/_shared/hooks";
import { transformSubscriptionPlan } from "@/app/(public)/memberships/_shared/utils";
import MembershipCard from "@/app/(public)/memberships/_shared/sections/membership-card";

/**
 * Step 5: Package Selection
 * Paket seçimi
 */
export const PackageSelectionStep: React.FC = () => {
  const { values, setValue } = useForm();
  const { subscriptionPlans, loading } = useSubscriptionPlans();

  const packageSelection = values?.packageSelection || {};
  const selectedPlanId = packageSelection.selectedPlanId;

  const handlePlanSelect = (planId: string) => {
    setValue("packageSelection.selectedPlanId", planId);
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
      {loading ? (
        <div className="text-center py-40">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      ) : (
        <div className="row gy-4">
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
