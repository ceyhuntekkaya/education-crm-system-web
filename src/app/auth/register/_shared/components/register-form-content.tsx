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
 * User ve Institution kayıtlarında farklı adımlar gösterir
 */
export const RegisterFormContent: React.FC = () => {
  const { currentStep, submitRegistration, registrationType } = useRegister();

  const renderStep = () => {
    // User kayıt adımları: 1. Login, 2. Personal Info, 3. Verification, 4. Success
    // Institution kayıt adımları: 1. Login, 2. Personal Info, 3. Verification, 4. Campus Info, 5. Package, 6. Payment, 7. Success

    if (registrationType === "user") {
      // User için 4 adım
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
    } else {
      // Institution için 7 adım
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
    }
  };

  const handleSubmit = async (values: any) => {
    // User için step 3'te, Institution için step 6'da submit işlemi
    const submitStep = registrationType === "user" ? 3 : 6;

    if (currentStep === submitStep) {
      const result = await submitRegistration();
      // Başarılıysa success step'ine geç
      // if (result) {
      //   nextStep();
      // }
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
