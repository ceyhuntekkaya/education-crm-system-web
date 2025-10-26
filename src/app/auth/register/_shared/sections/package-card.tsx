"use client";

import { MembershipPlan } from "@/app/(public)/memberships/_shared/types";
import {
  formatCurrency,
  getPlanPrice,
  getPriceLabel,
} from "@/app/(public)/memberships/_shared/utils";

interface PackageCardProps {
  plan: MembershipPlan;
  index: number;
  selectedPlanId?: string;
  onPlanSelect: (planId: string) => void;
}

export const PackageCard = ({
  plan,
  index,
  selectedPlanId,
  onPlanSelect,
}: PackageCardProps) => {
  const { currentPrice, displayPrice } = getPlanPrice(plan);
  const priceLabel = getPriceLabel(plan);
  const isSelected = selectedPlanId === plan.id;

  return (
    <div
      className="col-xl-4 col-md-4 col-sm-6 aos-init d-flex"
      data-aos="fade-up"
      data-aos-duration={(index + 1) * 200 + 400}
    >
      <div
        className={`bg-white border ${
          plan.isPopular ? "border-main-600" : "border-neutral-30"
        } ${
          isSelected ? "border-success-600 shadow-lg" : ""
        } animation-item rounded-16 p-12 position-relative w-100 d-flex flex-column cursor-pointer transition-2`}
        onClick={() => onPlanSelect(plan.id)}
        role="button"
        tabIndex={0}
      >
        {plan.isPopular && (
          <div className="position-absolute top-0 start-50 translate-middle">
            <span className="bg-main-600 text-white px-16 py-4 rounded-pill text-sm fw-semibold">
              En Popüler
            </span>
          </div>
        )}

        {isSelected && (
          <div className="position-absolute top-0 end-0 m-12">
            <div className="bg-success-600 text-white rounded-circle d-flex align-items-center justify-content-center w-32 h-32">
              <i className="ph-bold ph-check text-lg" />
            </div>
          </div>
        )}

        <div className="bg-main-25 p-32 rounded-16 transition-2 border border-neutral-30 overflow-hidden position-relative d-flex flex-column h-100">
          <span className="positioned-rotation text-main-600 fw-bold text-lg bg-white d-block text-center p-6">
            {plan.displayName}
          </span>
          <div className="w-84 h-84 bg-white p-16 box-shadow-md rounded-circle mx-auto d-inline-flex align-items-center justify-content-center position-relative text-main-600 text-44 border border-neutral-30">
            <i className={plan.icon} />
          </div>
          <h1 className="display-4 fw-bold mb-0 mt-32 text-neutral-700 transition-2">
            {formatCurrency(displayPrice)}
            <span className="text-sm fw-normal">{priceLabel}</span>
          </h1>
          {plan.discountPercentage &&
            (plan.billingPeriod === "yearly" ||
              plan.billingPeriod === "quarterly") && (
              <p className="text-center text-success fw-semibold mt-8">
                {plan.billingPeriod === "yearly" &&
                  `Yıllık ${formatCurrency(currentPrice)} ödeyerek %${
                    plan.discountPercentage
                  } tasarruf edin`}
                {plan.billingPeriod === "quarterly" &&
                  `3 aylık ${formatCurrency(currentPrice)} ödeyerek %${
                    plan.discountPercentage
                  } tasarruf edin`}
              </p>
            )}

          {/* Plan Açıklaması */}
          {plan.description && (
            <div className="text-center mt-16">
              <p className="text-neutral-600 text-sm leading-relaxed">
                {plan.description}
              </p>
            </div>
          )}

          {/* Deneme Süresi Bilgisi */}
          {plan.trialDays && plan.trialDays > 0 && (
            <div className="text-center mt-12">
              <span className="bg-warning-50 text-warning-600 px-12 py-4 rounded-pill text-xs fw-semibold">
                🎉 {plan.trialDays} Günlük Ücretsiz Deneme
              </span>
            </div>
          )}

          <span className="d-block border border-neutral-30 my-24 border-dashed" />
          <div className="flex-grow-1 d-flex flex-column">
            <ul className="d-flex flex-column gap-16 flex-grow-1">
              {plan.features.map((feature, featureIndex) => (
                <li
                  key={feature.id}
                  className={`flex-align gap-12 aos-init aos-animate ${
                    feature.highlight ? "text-main-600" : "text-neutral-700"
                  }`}
                  data-aos="fade-left"
                  data-aos-duration={(featureIndex + 1) * 200}
                >
                  {feature.included ? (
                    <i className="text-success-600 ph-bold ph-check" />
                  ) : (
                    <i className="text-danger-600 ph-bold ph-x" />
                  )}
                  <span
                    className={`text-md fw-medium ${
                      feature.included ? "text-neutral-500" : "text-neutral-400"
                    } ${feature.highlight ? "fw-bold" : ""}`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-40">
            <button
              type="button"
              className={`btn ${
                isSelected ? "btn-success" : "btn-main"
              } rounded-pill flex-align gap-8 justify-content-center w-100`}
              onClick={(e) => {
                e.stopPropagation();
                onPlanSelect(plan.id);
              }}
            >
              {isSelected ? (
                <>
                  <i className="ph-bold ph-check-circle d-flex text-lg" />
                  Seçildi
                </>
              ) : (
                <>
                  Bu Paketi Seç
                  <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
