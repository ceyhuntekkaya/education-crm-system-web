"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { DetailLayout } from "@/components/layouts";
import { useEventDetailContext } from "./_shared/context/event-detail-context";
import { createEventDetailColumns } from "./_shared/config/event-detail-columns";
import { EventDetailHeaderSection } from "./_shared/sections/event-detail-header-section";

/**
 * Etkinlik detay sayfası - DetailLayout kullanarak
 * Etkinlik bilgilerini görüntüler
 */
const EventDetailPage: React.FC = () => {
  const { event, isLoading, eventId } = useEventDetailContext();

  usePageTitle(event?.title || "Etkinlik Detayı");

  const hasValidId = eventId > 0;

  return (
    <>
      {/* Header: Geri Dön ve Düzenle butonları */}
      <EventDetailHeaderSection />

      <DetailLayout
        containerClass="event-detail-page"
        spacing="lg"
        loading={{
          isLoading: isLoading && hasValidId,
        }}
        error={{
          error: null,
        }}
        empty={{
          isEmpty: !event && !isLoading && hasValidId,
          emptyTitle: "Etkinlik Bulunamadı",
          emptyDescription: "Aradığınız etkinlik bulunamadı.",
        }}
        columns={
          event
            ? {
                data: event,
                columns: createEventDetailColumns(),
              }
            : undefined
        }
      />
    </>
  );
};

export default EventDetailPage;
