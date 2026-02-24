"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { EventCard } from "../../../../events/_shared/sections/event-card";
import { createEventColumns } from "../../../../events/_shared/config/event-columns";
import { useOrganizerDetailContext } from "../_shared/context/organizer-detail-context";
import { useGetOrganizerEvents } from "../_shared/hooks/api/use-organizer-events";
import type { EventDto } from "@/types";

/**
 * 2.5 Düzenleyenin Etkinlikleri
 * Organizatör detay sayfasına bağlı; o organizatöre ait tüm etkinlikleri listeler.
 * Bir etkinliğe tıklandığında etkinlik detay sayfasına yönlendirir.
 */
const OrganizerEventsPage: React.FC = () => {
  const router = useRouter();
  const { organizer, organizerId } = useOrganizerDetailContext();

  const pageTitle = organizer
    ? `${organizer.name} — Etkinlikler`
    : "Organizatörün Etkinlikleri";

  usePageTitle(pageTitle);

  const { data, loading } = useGetOrganizerEvents(organizerId);
  const events: EventDto[] = data?.data?.content ?? [];

  const eventColumns = useMemo(() => createEventColumns(), []);

  const handleBack = () => {
    router.push(`/individual/instructor/organizers/detail/${organizerId}`);
  };

  return (
    <DataCollectionLayout<EventDto>
      // ─── HEADER ──────────────────────────────────────────────────────
      header={{
        title: organizer
          ? `${organizer.name} Etkinlikleri`
          : "Organizatörün Etkinlikleri",
        subtitle: organizer
          ? `${organizer.name} tarafından düzenlenen etkinlikler`
          : "Bu düzenleyiciye ait etkinlikler",
        icon: "ph-calendar-dots",
        actionButtons: [
          {
            label: "Organizatör Detayına Dön",
            icon: "ph ph-arrow-left",
            onClick: handleBack,
            variant: "secondary",
          },
        ],
      }}
      // ─── DATA ─────────────────────────────────────────────────────────
      data={{
        data: events,
        loading: loading,
      }}
      // ─── VIEW ─────────────────────────────────────────────────────────
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: EventDto }) => (
            <EventCard
              event={item}
              url={`/individual/instructor/events/detail/${item.id}`}
            />
          ),
          col: 4,
        },
        list: {
          columns: eventColumns,
        },
      }}
      // ─── SEARCH ───────────────────────────────────────────────────────
      search={{
        enabled: true,
        placeholder: "Etkinlik ara...",
        fields: ["title", "description"],
      }}
      // ─── STATES ───────────────────────────────────────────────────────
      states={{
        empty: {
          title: "Henüz Etkinlik Yok",
          description:
            "Bu düzenleyiciye ait henüz bir etkinlik bulunmamaktadır.",
          icon: "ph-calendar",
        },
      }}
    />
  );
};

export default OrganizerEventsPage;
