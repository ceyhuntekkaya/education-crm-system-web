"use client";

import React from "react";
import { useRegister } from "../context";
import { STEP_CONFIGS } from "../constants";
import CustomCard from "@/components/ui/custom-card";

/**
 * Register Stepper Component - CustomCard Mimarisi ile Yeniden Tasarım
 *
 * Bu bileşen, projedeki CustomCard tasarım mimarisini takip eder:
 * - Flexible props sistemi (size, variant, spacing)
 * - Modern card-based tasarım
 * - Responsive grid layout
 * - Smooth animasyonlar
 * - Accessible ve semantic HTML
 *
 * @component
 * @example
 * <RegisterStepper />
 */
export const RegisterStepper: React.FC = () => {
  const { currentStep, isStepCompleted } = useRegister();

  return (
    <CustomCard>
      <div className="register-stepper">
        <div className="row g-3 g-lg-4">
          {STEP_CONFIGS.map((step, index) => {
            const isActive = currentStep === step.step;
            const isCompleted = isStepCompleted(step.step);
            const isPast = currentStep > step.step;
            const showConnector = index < STEP_CONFIGS.length - 1;

            return (
              <React.Fragment key={step.step}>
                <div className="col-lg-2 col-md-4 col-6">
                  <div
                    className={`stepper-item ${isActive ? "active" : ""} ${
                      isCompleted || isPast ? "completed" : ""
                    }`}
                  >
                    {/* Icon Container with Connector */}
                    <div className="stepper-icon-wrapper">
                      <div
                        className={`stepper-icon ${
                          isActive
                            ? "bg-main-600 text-white"
                            : isCompleted || isPast
                            ? "bg-success-600 text-white"
                            : "bg-neutral-50 text-neutral-400"
                        }`}
                      >
                        {isCompleted || isPast ? (
                          <i className="ph-bold ph-check text-xl" />
                        ) : (
                          <i className={`ph-bold ${step.icon} text-xl`} />
                        )}
                      </div>

                      {/* Progress Connector Line */}
                      {showConnector && (
                        <div
                          className={`stepper-connector ${
                            isPast ? "completed" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="stepper-content mt-12">
                      <h6
                        className={`mb-4 text-sm fw-semibold ${
                          isActive
                            ? "text-main-600"
                            : isCompleted || isPast
                            ? "text-neutral-700"
                            : "text-neutral-400"
                        }`}
                      >
                        {step.title}
                      </h6>
                      <p
                        className={`text-xs mb-0 ${
                          isActive ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </CustomCard>
  );
};
