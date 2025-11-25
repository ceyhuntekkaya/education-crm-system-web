"use client";

import React from "react";
import { useUserRegister } from "../context";
import { USER_STEPS } from "../constants";
import CustomCard from "@/components/ui/custom-card";

/**
 * User Register Stepper Component
 * Kurum kaydındaki ile aynı yapı - connector düzeltildi
 */
export const RegisterStepper: React.FC = () => {
  const { currentStep, isStepCompleted, isStepClickable, handleStepClick } =
    useUserRegister();

  // Success step (4) stepper'da gösterilmemeli
  const visibleSteps = USER_STEPS.filter((step) => step.step !== 4);

  return (
    <CustomCard>
      <div className="register-stepper">
        <div className="d-flex align-items-start justify-content-between gap-2">
          {visibleSteps.map((step, index) => {
            const isActive = currentStep === step.step;
            const isCompleted = isStepCompleted(step.step);
            const isPast = currentStep > step.step;
            const isClickable = isStepClickable(step.step);
            const showConnector = index < visibleSteps.length - 1;

            return (
              <React.Fragment key={step.step}>
                <div
                  className={`stepper-item flex-fill ${
                    isActive ? "active" : ""
                  } ${isCompleted || isPast ? "completed" : ""} ${
                    isClickable ? "clickable" : ""
                  }`}
                  onClick={() => handleStepClick(step.step)}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && isClickable) {
                      e.preventDefault();
                      handleStepClick(step.step);
                    }
                  }}
                  style={{
                    cursor: isClickable ? "pointer" : "default",
                  }}
                >
                  {/* Icon Container */}
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className={`stepper-icon ${
                        isActive
                          ? "bg-main-600 text-white"
                          : isCompleted || isPast
                          ? "bg-success-600 text-white"
                          : "bg-neutral-50 text-neutral-400"
                      }`}
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    >
                      {isCompleted || isPast ? (
                        <i
                          className="ph-bold ph-check"
                          style={{ fontSize: "18px" }}
                        />
                      ) : (
                        <i
                          className={`ph-bold ${step.icon}`}
                          style={{ fontSize: "18px" }}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div
                      className="text-center mt-8"
                      style={{ maxWidth: "100px" }}
                    >
                      <p
                        className={`mb-0 fw-semibold ${
                          isActive
                            ? "text-main-600"
                            : isCompleted || isPast
                            ? "text-neutral-700"
                            : "text-neutral-400"
                        }`}
                        style={{ fontSize: "11px", lineHeight: "1.3" }}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {showConnector && (
                  <div
                    className={`align-self-start ${
                      isPast ? "bg-success-600" : "bg-neutral-200"
                    }`}
                    style={{
                      height: "2px",
                      flexGrow: 1,
                      marginTop: "19px",
                      minWidth: "20px",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </CustomCard>
  );
};
