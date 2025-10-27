"use client";

import React from "react";
import { Form, FormValues } from "@/components/forms";
import { RegisterStepper } from "./register-stepper";
import { StepNavigation } from "./navigation";
import {
  LoginCredentialsStep,
  PersonalInfoStep,
  VerificationCodeStep,
  CampusInfoStep,
  PackageSelectionStep,
  PaymentInfoStep,
  SuccessStep,
} from "../sections";
import { useRegister } from "../context";

/**
 * Register Form Content
 * Step'lere göre içerik gösterimi - Brand yapısına benzer tasarım
 */
export const RegisterFormContent: React.FC = () => {
  const { currentStep, submitRegistration, nextStep } = useRegister();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LoginCredentialsStep />;
      case 2:
        return <PersonalInfoStep />;
      case 3:
        return <VerificationCodeStep />;
      case 4:
        return <CampusInfoStep />;
      case 5:
        return <PackageSelectionStep />;
      case 6:
        return <PaymentInfoStep />;
      case 7:
        return <SuccessStep />;
      default:
        return <LoginCredentialsStep />;
    }
  };

  const handleSubmit = async (values: any) => {
    // Step 6'da submit işlemi
    if (currentStep === 6) {
      const result = await submitRegistration();
      // Başarılıysa step 7'ye geç
      if (result) {
        nextStep();
      }
    }
  };

  return (
    <div className="register-form-wrapper">
      {/* Stepper - Üst kısımda */}
      <div className="mb-32">
        <RegisterStepper />
      </div>

      {/* Form - Tek bir Form tag tüm step'leri kapsar */}
      <Form onSubmit={handleSubmit}>
        {/* Step Content - Her step kendi card yapısını yönetir */}
        <FormValues />
        <div className="register-step-container">{renderStep()}</div>

        {/* Navigation - Form içinde */}
        <StepNavigation />
      </Form>
    </div>
  );
};
