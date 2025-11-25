"use client";

import React from "react";
import { useUserRegister } from "../context";
import { Form } from "@/components/forms";
import {
  LoginCredentialsStep,
  PersonalInfoStep,
  VerificationCodeStep,
  SuccessStep,
} from "../sections";
import { RegisterStepper } from "./register-stepper";
import { Navigation } from "./navigation";

/**
 * User Register Form Content
 * Sadece step 3'te API çağrısı yapar
 */
export const RegisterFormContent: React.FC = () => {
  const { currentStep, nextStep, handleSubmitStep3, isLoading } =
    useUserRegister();

  const handleSubmit = () => {
    // Step 1 ve 2'de sadece nextStep
    // Step 3'te API çağrısı + nextStep
    if (currentStep === 3) {
      handleSubmitStep3();
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LoginCredentialsStep />;
      case 2:
        return <PersonalInfoStep />;
      case 3:
        return <VerificationCodeStep />;
      case 4:
        return <SuccessStep />;
      default:
        return <LoginCredentialsStep />;
    }
  };

  return (
    <div className="register-form-wrapper">
      {/* Stepper - Success step'te gösterme */}
      {currentStep !== 4 && (
        <div id="register-stepper" className="mb-32">
          <RegisterStepper />
        </div>
      )}

      {/* Form - Tek bir Form tag tüm step'leri kapsar */}
      <Form onSubmit={(values: any) => {}}>
        {/* Step Content */}
        <div className="register-step-container">{renderStep()}</div>

        {/* Navigation */}
        <Navigation onSubmit={handleSubmit} isLoading={isLoading} />
      </Form>
    </div>
  );
};
