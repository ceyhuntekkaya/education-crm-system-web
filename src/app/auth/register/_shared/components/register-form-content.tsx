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
import { UserType } from "@/enums/UserType";

/**
 * Register Form Content
 * Institution kayıt adımlarını gösterir (7 adım)
 * Veli kaydı devre dışı
 */
export const RegisterFormContent: React.FC = () => {
  const { currentStep } = useRegister();

  const renderStep = () => {
    // Institution kayıt adımları: 1. Login, 2. Personal Info, 3. Verification, 4. Campus Info, 5. Package, 6. Payment, 7. Success
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
    // Form submit işlemi navigation component'inde yapılıyor
    // Her step'te ileri butonuna basıldığında API isteği atılıyor
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
