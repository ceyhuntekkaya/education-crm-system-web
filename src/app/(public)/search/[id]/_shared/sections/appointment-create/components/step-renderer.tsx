/**
 * Step renderer component for appointment form
 */

"use client";

import React from "react";
import { useAppointmentNavigation } from "../hooks/context-hooks";
import { FormStep } from "../types";
import {
  AppointmentTypeStep,
  DateTimeStep,
  PersonalInfoStep,
  StudentInfoStep,
  ConfirmationStep,
} from "./";

export const StepRenderer: React.FC = () => {
  const { currentStep } = useAppointmentNavigation();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStep.APPOINTMENT_TYPE:
        return <AppointmentTypeStep />;
      case FormStep.DATE_TIME:
        return <DateTimeStep />;
      case FormStep.PERSONAL_INFO:
        return <PersonalInfoStep />;
      case FormStep.STUDENT_INFO:
        return <StudentInfoStep />;
      case FormStep.CONFIRMATION:
        return <ConfirmationStep />;
      default:
        return <AppointmentTypeStep />;
    }
  };

  return <div className="step-container">{renderCurrentStep()}</div>;
};
