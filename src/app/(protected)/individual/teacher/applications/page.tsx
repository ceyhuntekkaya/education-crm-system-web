"use client";

import React, { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { ApplicationCard } from "./_shared/sections";
import {
  createApplicationColumns,
  APPLICATION_POPOVER_FILTERS,
  APPLICATION_SORT_OPTIONS,
  createApplicationActionButtons,
  createApplicationEmptyStateAction,
} from "./_shared/config";
import { useApplicationsContext } from "./_shared/contexts";
import type { ApplicationDto } from "./_shared/types";

/**
 * ================================================================================
 * TEACHER APPLICATIONS PAGE
 * ================================================================================
 * Öğretmenin başvurularını listeleyen sayfa
 * - Başvuru kartları (grid/list view)
 * - Filtreleme ve sıralama
 * - Detay görüntüleme
 * - Geri çekme işlemi
 */

const TeacherApplicationsPage: React.FC = () => {
  usePageTitle("Başvurularım");
  const router = useRouter();

  // Context'ten data al
  const { applications, applicationsListLoading, refetch } =
    useApplicationsContext();

  // Geri çekme handler
  const handleWithdraw = useCallback(
    async (applicationId: number) => {
      if (
        !confirm(
          "Bu başvuruyu geri çekmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        )
      ) {
        return;
      }

      try {
        // TODO: Implement withdraw API call with applicationId
        console.log("Withdraw application:", applicationId);
        refetch(); // Liste yenilenir
        // TODO: Add success toast
      } catch (error) {
        console.error("Başvuru geri çekme hatası:", error);
        // TODO: Add error toast
      }
    },
    [refetch],
  );

  // Config'leri memoize et
  const applicationColumns = useMemo(() => createApplicationColumns(), []);
  const applicationFilters = useMemo(() => APPLICATION_POPOVER_FILTERS, []);
  const applicationSortOptions = useMemo(() => APPLICATION_SORT_OPTIONS, []);

  // Action buttons'ları memoize et
  const actionButtons = useMemo(
    () => createApplicationActionButtons(router),
    [router],
  );
  const emptyStateAction = useMemo(
    () => createApplicationEmptyStateAction(router),
    [router],
  );

  return (
    <DataCollectionLayout<ApplicationDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Başvurularım",
        subtitle:
          "İş ilanlarına yaptığınız başvurularınızı buradan takip edebilir, başvuru durumlarınızı görüntüleyebilirsiniz",
        icon: "ph-file-text",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Liste Verisi
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: applications,
        loading: applicationsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: ApplicationDto }) => (
            <ApplicationCard
              application={item}
              url={`/individual/teacher/applications/detail/${item.id}`}
            />
          ),
          col: 4,
        },
        list: {
          columns: applicationColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: applicationFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: applicationSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "Pozisyon, okul ara...",
        fields: [
          "jobPosting.positionTitle",
          "jobPosting.campus.name",
          "jobPosting.branch",
        ],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Boş Durum
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz Başvuru Yok",
          description:
            "Henüz hiç başvuru yapmadınız. İş ilanlarını inceleyerek uygun pozisyonlara başvurabilirsiniz.",
          icon: "ph-file-text",
          action: emptyStateAction,
        },
      }}
    />
  );
};

export default TeacherApplicationsPage;
