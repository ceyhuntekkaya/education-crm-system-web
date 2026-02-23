"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { EventCard } from "./_shared/sections";
import {
  createEventColumns,
  EVENT_POPOVER_FILTERS,
  EVENT_SORT_OPTIONS,
  createEventActionButtons,
  createEventEmptyStateAction,
} from "./_shared/config";
import { useEventsContext } from "./_shared/contexts";
import type { EventDto } from "@/types";

const InstructorEventsPage: React.FC = () => {
  usePageTitle("Etkinlikler");
  const router = useRouter();

  // Context'ten veri al
  const { events, eventsListLoading } = useEventsContext();

  // Config'leri memoize et
  const eventColumns = useMemo(() => createEventColumns(), []);
  const eventFilters = useMemo(() => EVENT_POPOVER_FILTERS, []);
  const eventSortOptions = useMemo(() => EVENT_SORT_OPTIONS, []);

  // Action buttons'ları memoize et
  const actionButtons = useMemo(
    () => createEventActionButtons(router),
    [router],
  );
  const emptyStateAction = useMemo(
    () => createEventEmptyStateAction(router),
    [router],
  );

  return (
    <DataCollectionLayout<EventDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Etkinlikler",
        subtitle:
          "Webinar, seminer, eğitim ve atölye gibi etkinlikleri buradan yönetebilir, yeni etkinlik ekleyebilir ve mevcutları güncelleyebilirsiniz.",
        icon: "ph-calendar",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: events,
        loading: eventsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
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
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: eventFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: eventSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Etkinlik ara...",
        fields: ["title", "description", "speakerName", "targetAudience"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty State
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Etkinlik Yok",
          description:
            "Henüz etkinlik eklemediniz. İlk etkinliği eklemek için butona tıklayın.",
          icon: "ph-calendar",
          action: emptyStateAction,
        },
      }}
    />
  );
};

export default InstructorEventsPage;
