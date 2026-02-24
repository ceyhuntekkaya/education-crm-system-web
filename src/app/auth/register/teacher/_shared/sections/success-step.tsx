"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomCard from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";
import { useForm } from "@/contexts/form-context";
import { useTeacherRegister } from "../context";
import { UserType } from "@/enums/UserType";

/**
 * Öğretmen / Eğitmen Kayıt - Tamamlandı (Success) Adımı
 * Tasarım kurum kaydı success sayfası ile aynı yapıdadır.
 */
export const SuccessStep: React.FC = () => {
  const router = useRouter();
  const { values } = useForm();
  const { registrationType } = useTeacherRegister();

  const isTeacher = registrationType === UserType.TEACHER;
  const loginInfo = values?.loginCredentials || {};
  const personalInfo = values?.personalInfo || {};

  const handleGoToLogin = () => {
    router.push("/auth/login");
  };

  // Kayıt özeti: Kişisel + giriş bilgileri (kurum sayfasındaki gibi bölümler)
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

  const registrationSections = [
    {
      title: "Kişisel Bilgiler",
      titleColor: "text-main-600",
      titleIcon: "ph-bold ph-user",
      items: personalInfoItems,
    },
  ];

  const nextStepsItems = [
    {
      label: "Giriş Yapın",
      value: (
        <span className="text-neutral-600">
          Hesabınız başarıyla oluşturuldu. Kayıt olurken belirlediğiniz e-posta
          ve şifrenizle hemen giriş yapabilirsiniz.
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
      {/* Ana başarı mesajı - kurum kaydı ile aynı kart yapısı */}
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
            {isTeacher
              ? "Hoş geldiniz! Öğretmen hesabınız başarıyla oluşturuldu."
              : "Hoş geldiniz! Eğitmen hesabınız başarıyla oluşturuldu."}
          </p>
        </div>
      </CustomCard>

      {/* Kayıt özeti - kurum sayfasındaki multiItems yapısı */}
      <CustomCard
        title="Kayıt Özeti"
        multiItems={registrationSections}
        className="mb-24"
      />

      {/* Sonraki adımlar */}
      <CustomCard multiItems={nextStepsSections} className="mb-24" />

      {/* Aksiyon butonları - kurum kaydı ile aynı */}
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
