"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomCard from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";
import { useForm } from "@/contexts/form-context";
import { useRegister } from "../context";

/**
 * Step 7: Success / Final Verification
 * Kayıt işlemi tamamlandığında gösterilen başarı ekranı
 * Backend: POST /register/step/7/ (final verification)
 */
export const SuccessStep: React.FC = () => {
  const router = useRouter();
  const { values } = useForm();
  const { submitStep7, isSubmitting, userId } = useRegister();
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const isVerificationInProgress = useRef(false);
  const hasRunOnce = useRef(false);

  // Sayfa yüklendiğinde otomatik olarak final verification API'sini çağır (sadece bir kez)
  useEffect(() => {
    if (userId && !hasRunOnce.current && !isVerificationInProgress.current) {
      hasRunOnce.current = true;
      isVerificationInProgress.current = true;

      const performFinalVerification = async () => {
        try {
          await submitStep7();
          setVerificationCompleted(true);
        } catch (error) {
          console.error("Final verification failed:", error);
        } finally {
          isVerificationInProgress.current = false;
        }
      };

      performFinalVerification();
    }
  }, [userId, submitStep7]);

  // Login sayfasına yönlendir
  const handleGoToLogin = () => {
    // TODO: Add state cleanup if needed
    router.push("/auth/login"); // Login sayfasına yönlendir
  };

  // Form verilerinden bilgileri al
  const loginInfo = values?.loginCredentials || {};
  const personalInfo = values?.personalInfo || {};
  const campusInfo = values?.campusInfo || {};
  const packageInfo = values?.packageSelection || {};

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
      label: "E-posta",
      value: (
        <span className="text-neutral-600 fw-medium d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-envelope text-info-600"></i>
          {personalInfo.email}
        </span>
      ),
      isShowing: personalInfo.email,
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

  // Campus Information Items
  const campusInfoItems = [
    {
      label: "Kampüs Adı",
      value: (
        <span className="text-success-600 fw-semibold d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-buildings text-success-600"></i>
          {campusInfo.campusName}
        </span>
      ),
      isShowing: campusInfo.campusName,
    },
    {
      label: "Adres",
      value: (
        <span className="text-neutral-600 fw-medium">
          {campusInfo.addressLine1}
          {campusInfo.addressLine2 && `, ${campusInfo.addressLine2}`}
        </span>
      ),
      isShowing: campusInfo.addressLine1,
    },
    {
      label: "Posta Kodu",
      value: (
        <span className="bg-main-50 text-main-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-map-pin text-sm"></i>
          {campusInfo.postalCode}
        </span>
      ),
      isShowing: campusInfo.postalCode,
    },
  ];

  // Package Information Items
  const packageInfoItems = [
    {
      label: "Seçilen Plan",
      value: (
        <span className="text-primary-600 fw-semibold d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-package text-primary-600"></i>
          {packageInfo.planDisplayName ||
            packageInfo.planName ||
            `Plan #${packageInfo.selectedPlanId}`}
        </span>
      ),
      isShowing: packageInfo.selectedPlanId,
    },
    {
      label: "Fiyat",
      value: (
        <span className="text-success-600 fw-bold d-inline-flex align-items-center gap-8">
          <i className="ph-bold ph-currency-circle-dollar text-success-600"></i>
          ₺{packageInfo.price?.toLocaleString("tr-TR") || "0"}
          {packageInfo.billingPeriod === "monthly" && " / Ay"}
          {packageInfo.billingPeriod === "quarterly" && " / 3 Ay"}
          {packageInfo.billingPeriod === "yearly" && " / Yıl"}
        </span>
      ),
      isShowing: packageInfo.price,
    },
    {
      label: "Fatura Dönemi",
      value: (
        <span className="bg-warning-50 text-warning-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-calendar-blank text-sm"></i>
          {packageInfo.billingPeriod === "monthly" && "Aylık"}
          {packageInfo.billingPeriod === "quarterly" && "3 Aylık"}
          {packageInfo.billingPeriod === "yearly" && "Yıllık"}
        </span>
      ),
      isShowing: packageInfo.billingPeriod,
    },
    {
      label: "İndirim",
      value: (
        <span className="bg-success-50 text-success-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-percent text-sm"></i>%
          {packageInfo.discountPercentage} İndirim
        </span>
      ),
      isShowing:
        packageInfo.discountPercentage && packageInfo.discountPercentage > 0,
    },
    {
      label: "Deneme Süresi",
      value: (
        <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-gift text-sm"></i>
          {packageInfo.trialDays} Gün Ücretsiz
        </span>
      ),
      isShowing: packageInfo.trialDays && packageInfo.trialDays > 0,
    },
  ];

  // Payment Information Items
  const paymentInfoItems = [
    {
      label: "Kart Sahibi",
      value: (
        <span className="text-neutral-600 fw-semibold">
          {values?.paymentInfo?.cardHolderName}
        </span>
      ),
      isShowing: values?.paymentInfo?.cardHolderName,
    },
    {
      label: "Kart Numarası",
      value: (
        <span className="text-neutral-600 font-mono">
          **** **** **** {values?.paymentInfo?.cardNumber?.slice(-4)}
        </span>
      ),
      isShowing: values?.paymentInfo?.cardNumber,
    },
    {
      label: "Son Kullanma",
      value: (
        <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 fw-semibold d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-credit-card text-sm"></i>
          {values?.paymentInfo?.expiryMonth}/{values?.paymentInfo?.expiryYear}
        </span>
      ),
      isShowing:
        values?.paymentInfo?.expiryMonth && values?.paymentInfo?.expiryYear,
    },
    {
      label: "Sözleşmeler",
      value: (
        <div className="d-flex flex-column gap-8">
          {values?.paymentInfo?.acceptTerms && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span className="text-neutral-600 text-sm">
                Kullanım Koşulları
              </span>
            </div>
          )}
          {values?.paymentInfo?.acceptPrivacy && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span className="text-neutral-600 text-sm">
                Gizlilik Politikası
              </span>
            </div>
          )}
          {values?.paymentInfo?.acceptMarketing && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span className="text-neutral-600 text-sm">Pazarlama İzni</span>
            </div>
          )}
        </div>
      ),
      isShowing:
        values?.paymentInfo?.acceptTerms ||
        values?.paymentInfo?.acceptPrivacy ||
        values?.paymentInfo?.acceptMarketing,
    },
  ];

  // Sections array
  const registrationSections = [
    {
      title: "Kişisel Bilgiler",
      titleColor: "text-main-600",
      titleIcon: "ph-bold ph-user",
      items: personalInfoItems,
    },
    {
      title: "Kampüs Bilgileri",
      titleColor: "text-success-600",
      titleIcon: "ph-bold ph-buildings",
      items: campusInfoItems,
    },
    {
      title: "Paket Bilgileri",
      titleColor: "text-primary-600",
      titleIcon: "ph-bold ph-package",
      items: packageInfoItems,
    },
    {
      title: "Ödeme Bilgileri",
      titleColor: "text-info-600",
      titleIcon: "ph-bold ph-credit-card",
      items: paymentInfoItems,
    },
  ];

  // Next steps items
  const nextStepsItems = [
    // {
    //   label: "E-postanızı Kontrol Edin",
    //   value: (
    //     <span className="text-neutral-600">
    //       <strong className="text-neutral-900">{personalInfo.email}</strong>{" "}
    //       adresinize gönderilen aktivasyon bağlantısına tıklayın.
    //     </span>
    //   ),
    //   isShowing: true,
    // },
    // {
    //   label: "Hesabınızı Aktifleştirin",
    //   value: (
    //     <span className="text-neutral-600">
    //       E-postadaki bağlantıya tıklayarak hesabınızı aktifleştirin.
    //     </span>
    //   ),
    //   isShowing: true,
    // },
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
      {/* Loading State */}
      {isSubmitting && !verificationCompleted && (
        <CustomCard className="mb-24">
          <div className="text-center py-40">
            <div
              className="spinner-border text-main-600 mb-20"
              style={{ width: "80px", height: "80px" }}
              role="status"
            >
              <span className="visually-hidden">İşleniyor...</span>
            </div>
            <h2 className="text-neutral-900 fw-bold mb-12">
              Kayıt Tamamlanıyor...
            </h2>
            <p className="text-neutral-600 mb-24">
              Lütfen bekleyiniz, hesabınız oluşturuluyor.
            </p>
          </div>
        </CustomCard>
      )}

      {/* Success State */}
      {(!isSubmitting || verificationCompleted) && (
        <>
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
              {/* <div className="d-inline-flex align-items-center gap-12 bg-success-50 text-success-700 px-20 py-12 rounded-8">
                <i className="ph-bold ph-envelope"></i>
                <span className="text-sm fw-medium">
                  Onay e-postası{" "}
                  <strong className="fw-semibold">{personalInfo.email}</strong>{" "}
                  adresinize gönderildi.
                </span>
              </div> */}
            </div>
          </CustomCard>
        </>
      )}

      {(!isSubmitting || verificationCompleted) && (
        <>
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
        </>
      )}
    </div>
  );
};
