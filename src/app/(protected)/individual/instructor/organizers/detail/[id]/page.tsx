"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useOrganizerDetailContext } from "./_shared/context/organizer-detail-context";
import { createOrganizerDetailColumns } from "./_shared/config/organizer-detail-columns";
import { OrganizerDetailHeaderSection } from "./_shared/sections/organizer-detail-header-section";

/**
 * Organizatör detay sayfası - DetailLayout kullanarak
 * Organizatör bilgilerini görüntüler
 */
const OrganizerDetailPage: React.FC = () => {
  const { organizer, isLoading, organizerId } = useOrganizerDetailContext();

  usePageTitle(organizer?.name || "Organizatör Detayı");

  const hasValidId = organizerId > 0;

  return (
    <>
      {/* Header: Geri Dön ve Düzenle butonları */}
      <OrganizerDetailHeaderSection />

      <DetailLayout
        containerClass="organizer-detail-page"
        spacing="lg"
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: null,
        }}
        empty={{
          isEmpty: !organizer && !isLoading && hasValidId,
          emptyTitle: "Organizatör Bulunamadı",
          emptyDescription: "Aradığınız organizatör bulunamadı.",
        }}
        columns={
          organizer
            ? {
                data: organizer,
                columns: createOrganizerDetailColumns(),
              }
            : undefined
        }
      />
    </>
  );
};

export default OrganizerDetailPage;
