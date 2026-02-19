"use client";

import React, { useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import {
  ApplicationCard,
  createApplicationColumns,
  APPLICATION_POPOVER_FILTERS,
  APPLICATION_SORT_OPTIONS,
  useApplicationsByJobPostingContext,
} from "./_shared";
import type { ApplicationDto } from "./_shared/types";

/**
 * ================================================================================
 * JOB POSTING APPLICATIONS PAGE
 * ================================================================================
 * İş ilanına yapılan başvuruları listeleyen sayfa
 * - Başvuru kartları (grid/list view)
 * - Filtreleme ve sıralama
 * - Detay görüntüleme
 */

const JobPostingApplicationsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const jobPostingId = params.id as string;

  usePageTitle("Başvurular");

  // Context'ten data al
  const { applications, applicationsListLoading } =
    useApplicationsByJobPostingContext();

  // Config'leri memoize et
  const applicationColumns = useMemo(() => createApplicationColumns(), []);
  const applicationFilters = useMemo(() => APPLICATION_POPOVER_FILTERS, []);
  const applicationSortOptions = useMemo(() => APPLICATION_SORT_OPTIONS, []);

  // Action buttons
  const actionButtons = useMemo(
    () => [
      {
        id: "back",
        label: "İlana Dön",
        icon: "ph-arrow-left",
        variant: "secondary" as const,
        onClick: () =>
          router.push(
            `/individual/company/job-postings/detail/${jobPostingId}`,
          ),
      },
    ],
    [router, jobPostingId],
  );

  return (
    <DataCollectionLayout<ApplicationDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "Başvurular",
        subtitle: "Bu iş ilanına yapılan başvuruları görüntüleyin ve yönetin",
        icon: "ph-users",
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
              url={`/individual/company/job-postings/detail/${jobPostingId}/applications/detail/${item.id}`}
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
        placeholder: "Aday adı veya email ile ara...",
        fields: ["teacher.fullName", "teacher.email"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // PAGINATION - Sayfalama
      // ═══════════════════════════════════════════════════════════════════
      pagination={{
        enabled: false, // Client-side pagination kullanıyoruz
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Boş Durum
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          icon: "ph-users",
          title: "Henüz Başvuru Yok",
          description:
            "Bu iş ilanına henüz başvuru yapılmadı. Başvurular geldiğinde burada görünecektir.",
        },
      }}
    />
  );
};

export default JobPostingApplicationsPage;
