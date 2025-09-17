/**
 * Main form content component for appointment creation
 */

"use client";

import React from "react";
import { useAppointmentNavigation } from "../hooks/context-hooks";
import { StepRenderer } from "./step-renderer";
import { NavigationControls } from "./navigation-controls";
import { ProgressBar } from "./progress-bar";

export const AppointmentFormContent: React.FC = () => {
  const { steps, currentStep, goTo } = useAppointmentNavigation();

  return (
    <div className="appointment-create-form">
      <div className="appointment-create-header">
        <h3>Randevu Oluştur</h3>
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onStepClick={goTo}
        />
      </div>

      <div className="step-container">
        <StepRenderer />
        <NavigationControls />
      </div>
    </div>
  );
};
