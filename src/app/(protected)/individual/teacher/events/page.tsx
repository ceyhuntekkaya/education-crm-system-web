"use client";

import React, { useMemo } from "react";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { TeacherEventCard } from "./_shared/sections";
import {
  createTeacherEventColumns,
  TEACHER_EVENT_POPOVER_FILTERS,
  TEACHER_EVENT_SORT_OPTIONS,
} from "./_shared/config";
import { useTeacherEventsContext } from "./_shared/contexts";
import type { EventDto } from "@/types";

/**
 * TEACHER EVENTS PAGE
 * Öğretmen için yayındaki etkinlikleri listeleyen sayfa
 * - Sadece PUBLISHED etkinlikler gösterilir
 * - Öğretmen etkinlik ekleyemez/düzenleyemez
 * - Kartlardaki "Katıl" butonuyla etkinliğe kayıt olunabilir
 */
const TeacherEventsPage: React.FC = () => {
  usePageTitle("Etkinlikler");

  const { events, eventsListLoading } = useTeacherEventsContext();

  const eventColumns = useMemo(() => createTeacherEventColumns(), []);
  const eventFilters = useMemo(() => TEACHER_EVENT_POPOVER_FILTERS, []);
  const eventSortOptions = useMemo(() => TEACHER_EVENT_SORT_OPTIONS, []);

  return (
    <DataCollectionLayout<EventDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Etkinlikler",
        subtitle:
          "Webinar, seminer, eğitim ve atölye gibi yayındaki etkinlikleri buradan görüntüleyebilir ve kayıt olabilirsiniz.",
        icon: "ph-calendar",
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: events,
        loading: eventsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: EventDto }) => (
            <TeacherEventCard event={item} />
          ),
          col: 4,
        },
        list: {
          columns: eventColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: eventFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: eventSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Etkinlik ara...",
        fields: ["title", "description", "speakerName", "targetAudience"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // EMPTY STATE
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Etkinlik Yok",
          description:
            "Şu an yayında olan bir etkinlik bulunmuyor. Daha sonra tekrar kontrol edin.",
          icon: "ph-calendar",
        },
      }}
    />
  );
};

export default TeacherEventsPage;
