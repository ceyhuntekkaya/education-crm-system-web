"use client";

import React from "react";
import { useTeacherRegister } from "../context";
import { getStepConfigs } from "../constants";
import CustomCard from "@/components/ui/custom-card";

/**
 * Öğretmen/Eğitmen kayıt stepper - Eğitim Kurumu kaydı ile aynı yapı (tamamlanan adımlar, tıklanabilir geri dönüş)
 */
export const RegisterStepper: React.FC = () => {
  const {
    currentStep,
    registrationType,
    isStepClickable,
    handleStepClick,
  } = useTeacherRegister();

  const stepConfigs = getStepConfigs(registrationType);
  const visibleSteps = stepConfigs;

  // Yeşil tik sadece gerçekten geçilen adımlarda (currentStep > step).
  // "Tamamlandı" (step 3) sadece API başarılı olup success ekranına geçildiğinde
  // tamamlanmış sayılır; o anda stepper zaten gizlendiği için step 3 stepper'da hiç yeşil görünmez.
  const isStepPast = (step: number) => currentStep > step;

  return (
    <CustomCard>
      <div className="register-stepper">
        <div className="d-flex align-items-start justify-content-between gap-2">
          {visibleSteps.map((stepConfig, index) => {
            const isActive = currentStep === stepConfig.step;
            const isPast = isStepPast(stepConfig.step);
            const isClickable = isStepClickable(stepConfig.step);
            const showConnector = index < visibleSteps.length - 1;

            return (
              <React.Fragment key={stepConfig.step}>
                <div
                  className={`stepper-item flex-fill ${
                    isActive ? "active" : ""
                  } ${isPast ? "completed" : ""} ${
                    isClickable ? "clickable" : ""
                  }`}
                  onClick={() => handleStepClick(stepConfig.step)}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      (e.key === "Enter" || e.key === " ") &&
                      isClickable
                    ) {
                      e.preventDefault();
                      handleStepClick(stepConfig.step);
                    }
                  }}
                  style={{
                    cursor: isClickable ? "pointer" : "default",
                  }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className={`stepper-icon ${
                        isActive
                          ? "bg-main-600 text-white"
                          : isPast
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
                      {isPast ? (
                        <i
                          className="ph-bold ph-check"
                          style={{ fontSize: "18px" }}
                        />
                      ) : (
                        <i
                          className={`ph-bold ${stepConfig.icon}`}
                          style={{ fontSize: "18px" }}
                        />
                      )}
                    </div>
                    <div
                      className="text-center mt-8"
                      style={{ maxWidth: "100px" }}
                    >
                      <p
                        className={`mb-0 fw-semibold ${
                          isActive
                            ? "text-main-600"
                            : isPast
                              ? "text-neutral-700"
                              : "text-neutral-400"
                        }`}
                        style={{ fontSize: "11px", lineHeight: "1.3" }}
                      >
                        {stepConfig.title}
                      </p>
                    </div>
                  </div>
                </div>
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
