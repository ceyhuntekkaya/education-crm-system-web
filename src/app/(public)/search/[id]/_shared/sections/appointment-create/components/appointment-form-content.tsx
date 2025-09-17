/**
 * Main form content component for appointment creation
 */

"use client";

import React from "react";
import { useAppointment } from "../contexts";
import { StepRenderer } from "./step-renderer";
import { NavigationControls } from "./navigation-controls";
import { ProgressBar } from "./progress-bar";

export const AppointmentFormContent: React.FC = () => {
  const { steps, currentStep, goToStep } = useAppointment();

  return (
    <>
      {/* Header */}
      <h4 className="mb-16">Randevu Oluştur</h4>
      <span className="d-block border border-neutral-30 my-20 border-dashed" />

      {/* Progress Bar */}
      <div className="mb-24">
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
        />
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-8 p-24">
        <StepRenderer />
        <NavigationControls />
      </div>
    </>
  );
};
