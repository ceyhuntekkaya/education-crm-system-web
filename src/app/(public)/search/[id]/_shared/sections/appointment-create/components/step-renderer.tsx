/**
 * Step renderer component for appointment form
 */

"use client";

import React from "react";
import { useAppointment } from "../contexts";
import { FormStep } from "../types";
import {
  AppointmentTypeStep,
  DateTimeStep,
  PersonalInfoStep,
  StudentInfoStep,
  ConfirmationStep,
} from "../sections";

export const StepRenderer: React.FC = () => {
  const { currentStep } = useAppointment();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStep.APPOINTMENT_TYPE:
        return <AppointmentTypeStep />;
      case FormStep.STUDENT_INFO:
        return <StudentInfoStep />;
      case FormStep.DATE_TIME:
        return <DateTimeStep />;
      case FormStep.CONFIRMATION:
        return <ConfirmationStep />;
      default:
        return <AppointmentTypeStep />;
    }
  };

  return <div className="step-content">{renderCurrentStep()}</div>;
};
