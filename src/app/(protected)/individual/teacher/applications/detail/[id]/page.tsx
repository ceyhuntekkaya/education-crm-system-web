"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useApplicationDetailContext } from "./_shared/context";
import {
  createApplicationDetailColumns,
  ApplicationHeaderSection,
} from "./_shared";

/**
 * ================================================================================
 * APPLICATION DETAIL PAGE
 * ================================================================================
 * Başvuru detay sayfası
 * - Başvuru bilgileri
 * - Pozisyon bilgileri
 * - Okul bilgileri
 * - Belgeler
 * - Notlar
 */

const ApplicationDetailPage: React.FC = () => {
  const { application, isLoading, applicationId } =
    useApplicationDetailContext();

  usePageTitle(
    application?.jobPosting?.positionTitle
      ? `${application.jobPosting.positionTitle} - Başvuru Detayı`
      : "Başvuru Detayı",
  );

  const hasValidId = applicationId > 0;

  return (
    <>
      {/* Header Section: Geri Dön ve Geri Çek butonları */}
      <ApplicationHeaderSection />

      <DetailLayout
        containerClass="application-detail-page"
        spacing="lg"
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: null,
        }}
        empty={{
          isEmpty: !application && !isLoading && hasValidId,
          emptyTitle: "Başvuru Bulunamadı",
          emptyDescription: "Aradığınız başvuru bulunamadı.",
        }}
        columns={
          application
            ? {
                data: application,
                columns: createApplicationDetailColumns(),
              }
            : undefined
        }
      />
    </>
  );
};

export default ApplicationDetailPage;
