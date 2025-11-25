"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/custom-card";
import { useForm } from "@/contexts/form-context";

/**
 * User Register Step 4: Success
 * Kurum kaydındaki gibi tüm girilen bilgileri göster
 */
export const SuccessStep: React.FC = () => {
  const router = useRouter();
  const { values } = useForm();

  const handleGoToLogin = () => {
    router.push("/auth/login");
  };

  // Form verilerinden bilgileri al
  const loginInfo = values?.loginCredentials || {};
  const personalInfo = values?.personalInfo || {};

  // Login Information Items
  const loginInfoItems = [
    {
      label: "E-posta",
      value: (
        <span className="text-neutral-600 fw-medium d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-envelope text-info-600"></i>
          {loginInfo.email}
        </span>
      ),
      isShowing: loginInfo.email,
    },
    {
      label: "Şifre",
      value: (
        <span className="text-neutral-600 fw-medium d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-lock text-success-600"></i>
          ••••••••
        </span>
      ),
      isShowing: loginInfo.password,
    },
  ];

  // Personal Information Items
  const personalInfoItems = [
    {
      label: "Ad Soyad",
      value: (
        <span className="text-main-600 fw-semibold">
          {personalInfo.firstName} {personalInfo.lastName}
        </span>
      ),
      isShowing: personalInfo.firstName && personalInfo.lastName,
    },
    {
      label: "Telefon",
      value: (
        <span className="text-neutral-600 fw-medium d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-phone text-success-600"></i>
          {personalInfo.phone}
        </span>
      ),
      isShowing: personalInfo.phone,
    },
  ];

  // Sections array
  const registrationSections = [
    {
      title: "Giriş Bilgileri",
      titleColor: "text-info-600",
      titleIcon: "ph-bold ph-sign-in",
      items: loginInfoItems,
    },
    {
      title: "Kişisel Bilgiler",
      titleColor: "text-main-600",
      titleIcon: "ph-bold ph-user",
      items: personalInfoItems,
    },
  ];

  // Next steps items
  const nextStepsItems = [
    {
      label: "E-postanızı Kontrol Edin",
      value: (
        <span className="text-neutral-600">
          <strong className="text-neutral-900">{loginInfo.email}</strong>{" "}
          adresinize gönderilen aktivasyon bağlantısına tıklayın.
        </span>
      ),
      isShowing: true,
    },
    {
      label: "Hesabınızı Aktifleştirin",
      value: (
        <span className="text-neutral-600">
          E-postadaki bağlantıya tıklayarak hesabınızı aktifleştirin.
        </span>
      ),
      isShowing: true,
    },
    {
      label: "Giriş Yapın",
      value: (
        <span className="text-neutral-600">
          Aktivasyon sonrası sisteme giriş yaparak devam edebilirsiniz.
        </span>
      ),
      isShowing: true,
    },
  ];

  const nextStepsSections = [
    {
      title: "Sonraki Adımlar",
      titleColor: "text-warning-600",
      titleIcon: "ph-bold ph-list-checks",
      items: nextStepsItems,
    },
  ];

  return (
    <div className="register-step-content">
      {/* Main Success Message */}
      <CustomCard className="mb-24">
        <div className="text-center py-40">
          <i
            className="ph-fill ph-check-circle text-success-600 d-block mb-20"
            style={{ fontSize: "80px" }}
          ></i>
          <h2 className="text-neutral-900 fw-bold mb-12">
            Kayıt İşlemi Tamamlandı!
          </h2>
          <p className="text-neutral-600 mb-24">
            Hoş geldiniz! Hesabınız başarıyla oluşturuldu.
          </p>

          {/* E-posta Bilgilendirme */}
          <div className="d-inline-flex align-items-center gap-12 bg-success-50 text-success-700 px-20 py-12 rounded-8">
            <i className="ph-bold ph-envelope"></i>
            <span className="text-sm fw-medium">
              Onay e-postası{" "}
              <strong className="fw-semibold">{loginInfo.email}</strong>{" "}
              adresinize gönderildi.
            </span>
          </div>
        </div>
      </CustomCard>

      {/* Registration Summary with multiItems */}
      <CustomCard
        title="Kayıt Özeti"
        multiItems={registrationSections}
        className="mb-24"
      />

      {/* Next Steps */}
      <CustomCard multiItems={nextStepsSections} className="mb-24" />

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-sm-row gap-24 justify-content-center">
        <Button
          variant="inline"
          onClick={handleGoToLogin}
          leftIcon="ph-sign-in"
        >
          Giriş Yap
        </Button>
        <Button variant="outline" href="/" leftIcon="ph-house">
          Ana Sayfaya Dön
        </Button>
      </div>
    </div>
  );
};
