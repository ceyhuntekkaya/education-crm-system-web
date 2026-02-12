"use client";

import React from "react";
import { useTeacherRegister } from "../context";
import { Form } from "@/components/forms";
import {
  LoginCredentialsStep,
  PersonalInfoStep,
  SuccessStep,
} from "../sections";
import { RegisterStepper } from "./register-stepper";
import { Navigation } from "./navigation";

/**
 * Teacher/Instructor Register Form Content
 */
export const RegisterFormContent: React.FC = () => {
  const { currentStep, handleSubmit, isLoading } = useTeacherRegister();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LoginCredentialsStep />;
      case 2:
        return <PersonalInfoStep />;
      case 3:
        return <SuccessStep />;
      default:
        return <LoginCredentialsStep />;
    }
  };

  return (
    <div className="register-form-wrapper">
      {/* Stepper - Success step'te gösterme */}
      {currentStep !== 3 && (
        <div id="register-stepper" className="mb-32">
          <RegisterStepper />
        </div>
      )}

      {/* Form */}
      <Form onSubmit={(values: any) => {}}>
        {/* Step Content */}
        <div className="register-step-container">{renderStep()}</div>

        {/* Navigation */}
        <Navigation onSubmit={handleSubmit} isLoading={isLoading} />
      </Form>
    </div>
  );
};
