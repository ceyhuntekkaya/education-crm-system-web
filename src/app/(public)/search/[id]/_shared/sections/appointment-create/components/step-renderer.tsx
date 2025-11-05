/**
 * Step renderer component for appointment form
 * Register form mimarisini takip eder
 */

"use client";

import React from "react";
import { useAppointment } from "../contexts";
import {
  AppointmentTypeStep,
  DateTimeStep,
  StudentInfoStep,
  ConfirmationStep,
} from "../sections";

export const StepRenderer: React.FC = () => {
  const { currentStep } = useAppointment();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <AppointmentTypeStep />;
      case 2:
        return <DateTimeStep />;
      case 3:
        return <StudentInfoStep />;
      case 4:
        return <ConfirmationStep />;
      default:
        return <AppointmentTypeStep />;
    }
  };

  return <div className="step-content">{renderCurrentStep()}</div>;
};
