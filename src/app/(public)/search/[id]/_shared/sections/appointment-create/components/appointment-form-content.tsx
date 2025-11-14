/**
 * Main form content component for appointment creation
 * Register form mimarisini takip eder
 */

"use client";

import React from "react";
import { useAppointment } from "../contexts";
import { StepRenderer } from "./step-renderer";
import { NavigationControls } from "./navigation-controls";
import { AppointmentStepper } from "./appointment-stepper";
import { FormValues } from "@/components";

export const AppointmentFormContent: React.FC = () => {
  const { currentStep, isStepCompleted, isStepClickable, handleStepClick } =
    useAppointment();

  return (
    <>
      {/* Stepper */}
      <div className="mb-24">
        <AppointmentStepper
          currentStep={currentStep}
          isStepCompleted={isStepCompleted}
          isStepClickable={isStepClickable}
          handleStepClick={handleStepClick}
        />
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-8 p-24">
        <StepRenderer />
        {/* <FormValues /> */}
        <NavigationControls />
      </div>
    </>
  );
};
