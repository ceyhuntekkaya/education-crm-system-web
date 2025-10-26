"use client";

import React from "react";
import { useRegister } from "../context";
import { STEP_CONFIGS } from "../constants";

/**
 * Register Stepper Component
 * 6 adımlı kayıt sürecinin görsel stepper'ı
 */
export const RegisterStepper: React.FC = () => {
  const { currentStep, isStepCompleted } = useRegister();

  return (
    <div className="register-stepper mb-40">
      <div className="row g-3">
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
                  <div className="stepper-icon-wrapper">
                    <div
                      className={`stepper-icon ${
                        isActive
                          ? "bg-main-600 text-white"
                          : isCompleted || isPast
                          ? "bg-success-600 text-white"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      {isCompleted || isPast ? (
                        <i className="ph-bold ph-check text-xl" />
                      ) : (
                        <i className={`ph-bold ${step.icon} text-xl`} />
                      )}
                    </div>
                    {showConnector && (
                      <div
                        className={`stepper-connector ${
                          isPast ? "completed" : ""
                        }`}
                      />
                    )}
                  </div>
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
  );
};
