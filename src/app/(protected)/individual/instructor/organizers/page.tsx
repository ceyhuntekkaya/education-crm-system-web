"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { OrganizerCard } from "./_shared/sections";
import {
  createOrganizerColumns,
  ORGANIZER_POPOVER_FILTERS,
  ORGANIZER_SORT_OPTIONS,
  createOrganizerActionButtons,
  createOrganizerEmptyStateAction,
} from "./_shared/config";
import { useOrganizersContext } from "./_shared/contexts";
import type { EventOrganizerDto } from "@/types";

const CompanyOrganizersPage: React.FC = () => {
  usePageTitle("Organizatörler");
  const router = useRouter();

  // Context'ten veri al
  const { organizers, organizersListLoading } = useOrganizersContext();

  // Config'leri memoize et
  const organizerColumns = useMemo(() => createOrganizerColumns(), []);
  const organizerFilters = useMemo(() => ORGANIZER_POPOVER_FILTERS, []);
  const organizerSortOptions = useMemo(() => ORGANIZER_SORT_OPTIONS, []);

  // Action buttons'ları memoize et
  const actionButtons = useMemo(
    () => createOrganizerActionButtons(router),
    [router],
  );
  const emptyStateAction = useMemo(
    () => createOrganizerEmptyStateAction(router),
    [router],
  );

  return (
    <DataCollectionLayout<EventOrganizerDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Organizatörler",
        subtitle:
          "Webinar ve etkinliklerinizi organize eden kurumları ve organizatörleri buradan yönetebilir, yeni organizatör ekleyebilir ve mevcutları güncelleyebilirsiniz.",
        icon: "ph-buildings",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: organizers,
        loading: organizersListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: EventOrganizerDto }) => (
            <OrganizerCard
              organizer={item}
              url={`/individual/instructor/organizers/detail/${item.id}`}
            />
          ),
          col: 4,
        },
        list: {
          columns: organizerColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: organizerFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: organizerSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Düzenleyen ara...",
        fields: ["name", "city", "email", "description"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty State
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Organizatör Yok",
          description:
            "Henüz organizatör eklemediniz. İlk organizatörü eklemek için butona tıklayın.",
          icon: "ph-buildings",
          action: emptyStateAction,
        },
      }}
    />
  );
};

export default CompanyOrganizersPage;
