"use client";

import React from "react";
import { FormInput } from "@/components/forms";
import CustomCard from "@/components/ui/custom-card";

/**
 * Step 2: Personal Info
 * Kişisel bilgiler (Ad, Soyad, E-posta, Telefon)
 * Email Step 1'de kaydedildiği için kontrol gerekmiyor
 */
export const PersonalInfoStep: React.FC = () => {
  return (
    <div className="register-step-content">
      {/* Ana Card - Form içeriği */}
      <CustomCard
        title="Kişisel Bilgiler"
        subtitle="İletişim bilgilerinizi doğru bir şekilde giriniz"
      >
        <div className="row row-gap-24">
          {/* Ad & Soyad */}
          <div className="col-md-6">
            <FormInput
              name="personalInfo.firstName"
              label="Ad"
              placeholder="Adınızı giriniz..."
              required
              autoComplete="given-name"
            />
          </div>

          <div className="col-md-6">
            <FormInput
              name="personalInfo.lastName"
              label="Soyad"
              placeholder="Soyadınızı giriniz..."
              required
              autoComplete="family-name"
            />
          </div>

          {/* E-posta - Step 1'den gelecek, read-only */}
          <div className="col-12">
            <FormInput
              name="personalInfo.email"
              type="email"
              label="E-posta Adresi"
              placeholder="ornek@email.com"
              required
              autoComplete="email"
              disabled
            />
            <small className="text-neutral-500 mt-4 d-block">
              <i className="ph-info me-4" />
              E-posta adresi Step 1'de kaydedildi
            </small>
          </div>

          {/* Telefon */}
          <div className="col-12">
            <FormInput
              name="personalInfo.phone"
              type="tel"
              label="Telefon Numarası"
              placeholder="5xxxxxxxxx (10 hane)"
              required
              autoComplete="tel"
            />
          </div>
        </div>
      </CustomCard>

      {/* Uyarı Card */}
      <CustomCard mt="mt-24">
        <div className="d-flex align-items-start gap-12">
          <i className="ri-alert-line text-warning-600 text-2xl flex-shrink-0"></i>
          <div className="flex-grow-1">
            <strong className="d-block mb-8 text-neutral-900 fw-semibold">
              Önemli Bilgilendirme
            </strong>
            <p className="mb-0 text-sm text-neutral-700">
              Doğrulama kodu e-posta adresinize gönderilecektir. Lütfen aktif
              bir e-posta adresi kullanınız.
            </p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};
