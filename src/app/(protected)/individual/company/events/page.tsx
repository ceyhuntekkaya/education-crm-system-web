"use client";

import React, { useMemo } from "react";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { CompanyEventCard } from "@/app/(protected)/individual/company/events/_shared/sections";
import {
  createCompanyEventColumns,
  COMPANY_EVENT_POPOVER_FILTERS,
  COMPANY_EVENT_SORT_OPTIONS,
} from "@/app/(protected)/individual/company/events/_shared/config";
import { useCompanyEventsContext } from "@/app/(protected)/individual/company/events/_shared/contexts";
import type { EventDto } from "@/types";

/**
 * COMPANY EVENTS PAGE
 * Şirket/Kurum kullanıcısı için yayındaki etkinlikleri listeleyen sayfa
 * - Sadece PUBLISHED etkinlikler gösterilir
 * - Etkinliklere kayıt olunabilir
 */
const CompanyEventsPage: React.FC = () => {
  usePageTitle("Etkinlikler");

  const { events, eventsListLoading } = useCompanyEventsContext();

  const eventColumns = useMemo(() => createCompanyEventColumns(), []);
  const eventFilters = useMemo(() => COMPANY_EVENT_POPOVER_FILTERS, []);
  const eventSortOptions = useMemo(() => COMPANY_EVENT_SORT_OPTIONS, []);

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
            <CompanyEventCard event={item} />
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

export default CompanyEventsPage;
