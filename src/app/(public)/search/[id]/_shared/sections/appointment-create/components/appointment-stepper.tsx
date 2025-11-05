"use client";

import React from "react";
import { getStepConfigs } from "../constants";
import CustomCard from "@/components/ui/custom-card";

interface AppointmentStepperProps {
  currentStep: number;
  isStepCompleted: (step: number) => boolean;
  isStepClickable: (step: number) => boolean;
  handleStepClick: (step: number) => void;
}

/**
 * Appointment Stepper Component - Register form mimarisini takip eder
 *
 * Bu bileşen, projedeki Register form tasarım mimarisini takip eder:
 * - Flexible props sistemi
 * - Modern card-based tasarım
 * - Responsive grid layout
 * - Smooth animasyonlar
 * - Accessible ve semantic HTML
 *
 * @component
 * @example
 * <AppointmentStepper
 *   currentStep={currentStep}
 *   isStepCompleted={isStepCompleted}
 *   isStepClickable={isStepClickable}
 *   handleStepClick={handleStepClick}
 * />
 */
export const AppointmentStepper: React.FC<AppointmentStepperProps> = ({
  currentStep,
  isStepCompleted,
  isStepClickable,
  handleStepClick,
}) => {
  const stepConfigs = getStepConfigs();

  return (
    <CustomCard variant="outline">
      <div className="appointment-stepper">
        <div className="d-flex align-items-start justify-content-between gap-2">
          {stepConfigs.map((step, index) => {
            const isActive = currentStep === step.step;
            const isCompleted = isStepCompleted(step.step);
            const isPast = currentStep > step.step;
            const isClickable = isStepClickable(step.step);
            const showConnector = index < stepConfigs.length - 1;

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
                      style={{
                        maxWidth: "150px",
                      }}
                    >
                      <p
                        className={`text-sm fw-semibold mb-4 ${
                          isActive
                            ? "text-main-600"
                            : isCompleted || isPast
                            ? "text-success-600"
                            : "text-neutral-600"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p
                        className="text-xs text-neutral-500 mb-0"
                        style={{
                          lineHeight: "1.3",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {showConnector && (
                  <div
                    className="stepper-connector"
                    style={{
                      flex: "0 0 auto",
                      width: "40px",
                      height: "2px",
                      backgroundColor:
                        isCompleted || isPast ? "#10b981" : "#e5e7eb",
                      marginTop: "20px",
                      transition: "background-color 0.3s ease",
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
