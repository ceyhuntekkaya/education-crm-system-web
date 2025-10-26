"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@/contexts/form-context";
import CustomCard from "@/components/ui/custom-card";
import { apiClient } from "@/lib/api";
import type { Plan } from "../types";

/**
 * Step 5: Package Selection
 * Paket seçimi
 */
export const PackageSelectionStep: React.FC = () => {
  const { values, setValue } = useForm();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const packageSelection = values?.packageSelection || {};
  const billingPeriod = packageSelection.billingPeriod || "monthly";
  const selectedPlanId = packageSelection.selectedPlanId;

  // Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get("/subscriptions/plans/active");
        setPlans((response.data as any) || []);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleBillingChange = (period: "monthly" | "quarterly" | "yearly") => {
    setValue("packageSelection.billingPeriod", period);
  };

  const handlePlanSelect = (planId: string) => {
    setValue("packageSelection.selectedPlanId", planId);
  };

  const getPrice = (plan: Plan) => {
    if (billingPeriod === "monthly") return plan.price.monthly;
    if (billingPeriod === "quarterly")
      return plan.price.quarterly || plan.price.monthly * 3;
    return plan.price.yearly;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="register-step-content">
      {/* Billing Period Card */}
      <CustomCard
        title="Faturalama Dönemi"
        subtitle="İhtiyaçlarınıza en uygun paketi seçin ve aboneliğinizi başlatın"
        mb="mb-32"
      >
        <div className="d-flex gap-12 flex-wrap">
          <button
            type="button"
            className={`btn ${
              billingPeriod === "monthly"
                ? "btn-primary"
                : "btn-outline-neutral"
            }`}
            onClick={() => handleBillingChange("monthly")}
          >
            <i className="ri-calendar-line me-8"></i>
            Aylık
          </button>
          <button
            type="button"
            className={`btn ${
              billingPeriod === "quarterly"
                ? "btn-primary"
                : "btn-outline-neutral"
            }`}
            onClick={() => handleBillingChange("quarterly")}
          >
            <i className="ri-calendar-2-line me-8"></i>3 Aylık
          </button>
          <button
            type="button"
            className={`btn ${
              billingPeriod === "yearly" ? "btn-primary" : "btn-outline-neutral"
            }`}
            onClick={() => handleBillingChange("yearly")}
          >
            <i className="ri-calendar-check-line me-8"></i>
            Yıllık
            <span className="badge bg-success-600 ms-8">%20 İndirim</span>
          </button>
        </div>
      </CustomCard>

      {/* Plans Grid */}
      {isLoading ? (
        <div className="text-center py-40">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      ) : (
        <div className="row g-16">
          {plans.map((plan) => (
            <div key={plan.id} className="col-md-6 col-lg-4">
              <div
                className={`package-card ${
                  selectedPlanId === plan.id ? "selected" : ""
                } ${plan.isPopular ? "popular" : ""}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.isPopular && (
                  <div className="popular-badge">En Popüler</div>
                )}

                <div className="package-header">
                  <h5 className="package-name mb-8">{plan.displayName}</h5>
                  {plan.description && (
                    <p className="package-description text-sm text-neutral-600 mb-16">
                      {plan.description}
                    </p>
                  )}
                  <div className="package-price">
                    <span className="price-amount">
                      {formatPrice(getPrice(plan))}
                    </span>
                    <span className="price-period">
                      /
                      {billingPeriod === "monthly"
                        ? "ay"
                        : billingPeriod === "quarterly"
                        ? "3 ay"
                        : "yıl"}
                    </span>
                  </div>
                </div>

                <div className="package-features">
                  <ul className="feature-list">
                    {plan.features.slice(0, 5).map((feature) => (
                      <li
                        key={feature.id}
                        className={feature.included ? "" : "excluded"}
                      >
                        <i
                          className={`ph-bold ${
                            feature.included
                              ? "ph-check text-success"
                              : "ph-x text-danger"
                          } me-8`}
                        />
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="package-action">
                  {selectedPlanId === plan.id && (
                    <div className="selected-indicator">
                      <i className="ph-bold ph-check-circle text-success me-8" />
                      Seçildi
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
