"use client";

import React from "react";
import { FormInput } from "@/components/forms";
import CustomCard from "@/components/ui/custom-card";

/**
 * Teacher/Instructor Register Step 2: Personal Info
 */
export const PersonalInfoStep: React.FC = () => {
  return (
    <div className="register-step-content">
      <CustomCard
        title="Kişisel Bilgiler"
        subtitle="Profil bilgilerinizi tamamlayın"
      >
        <div className="row row-gap-24">
          <div className="col-md-6">
            <FormInput
              name="personalInfo.firstName"
              type="text"
              label="Ad"
              placeholder="Adınızı giriniz..."
              isRequired
              autoComplete="given-name"
            />
          </div>

          <div className="col-md-6">
            <FormInput
              name="personalInfo.lastName"
              type="text"
              label="Soyad"
              placeholder="Soyadınızı giriniz..."
              isRequired
              autoComplete="family-name"
            />
          </div>

          <div className="col-12">
            <FormInput
              name="personalInfo.phone"
              type="tel"
              label="Telefon Numarası"
              placeholder="5XX XXX XX XX"
              isRequired
              autoComplete="tel"
            />
          </div>
        </div>
      </CustomCard>
    </div>
  );
};
