"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { RegistrationForm } from "@/app/(protected)/individual/company/events/register/_shared/sections";
import { useEventRegistrationAdd } from "@/app/(protected)/individual/company/events/register/_shared/context";

/**
 * Etkinliğe kayıt ol sayfası (Company)
 */
const CompanyEventRegistrationPage: React.FC = () => {
  const router = useRouter();
  const { event, eventLoading } = useEventRegistrationAdd();

  const pageTitle = "Etkinliğe Kayıt Ol";
  usePageTitle(pageTitle);

  // Etkinlik bulunamadı
  if (!eventLoading && !event) {
    return (
      <CustomCard
        title="Etkinlik Bulunamadı"
        subtitle="Aradığınız etkinlik artık mevcut değil"
        isBack
      >
        <div className="text-center py-48">
          <i
            className="ph-duotone ph-warning-circle text-warning-600 mb-24"
            style={{ fontSize: "80px" }}
          />
          <h5 className="mb-12 text-neutral-900">Etkinlik Bulunamadı</h5>
          <p
            className="text-neutral-600 mb-32 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            Görüntülemeye çalıştığınız etkinlik bulunamadı veya artık yayında
            değil. Diğer etkinlikleri incelemek için etkinlikler sayfasına
            dönebilirsiniz.
          </p>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => router.push("/individual/company/events")}
          >
            <i className="ph-bold ph-arrow-left me-8" />
            Etkinliklere Dön
          </button>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title={pageTitle}
      subtitle="Etkinlik detaylarını inceleyin ve kaydınızı tamamlayın"
      isBack
      isLoading={eventLoading}
    >
      <RegistrationForm />
    </CustomCard>
  );
};

export default CompanyEventRegistrationPage;
