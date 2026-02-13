"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { JobPostingCard } from "./_shared/sections";
import {
  createJobPostingColumns,
  JOB_POSTING_POPOVER_FILTERS,
  JOB_POSTING_SORT_OPTIONS,
  createJobPostingActionButtons,
  createJobPostingEmptyStateAction,
} from "./_shared/config";
import { useJobPostingsContext } from "./_shared/contexts";
import type { JobPostingDto } from "@/types";

const CompanyJobPostingsPage: React.FC = () => {
  usePageTitle("İlanlarım");
  const router = useRouter();

  // Context'ten sadece data al
  const { jobPostings, jobPostingsListLoading } = useJobPostingsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const jobPostingColumns = useMemo(() => createJobPostingColumns(), []);
  const jobPostingFilters = useMemo(() => JOB_POSTING_POPOVER_FILTERS, []);
  const jobPostingSortOptions = useMemo(() => JOB_POSTING_SORT_OPTIONS, []);

  // Action buttons'ları da memoize et
  const actionButtons = useMemo(
    () => createJobPostingActionButtons(router),
    [router],
  );
  const emptyStateAction = useMemo(
    () => createJobPostingEmptyStateAction(router),
    [router],
  );

  return (
    <DataCollectionLayout<JobPostingDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "İlanlarım",
        subtitle:
          "Okulunuz için oluşturduğunuz iş ilanlarını buradan takip edebilir, yeni ilan ekleyebilir ve mevcut ilanlarınızı yönetebilirsiniz",
        icon: "ph-briefcase",
        actionButtons: actionButtons,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // DATA - Veri ve Loading State
      // ═══════════════════════════════════════════════════════════════════
      data={{
        data: jobPostings,
        loading: jobPostingsListLoading,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // VIEW - Görünüm Ayarları
      // ═══════════════════════════════════════════════════════════════════
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: JobPostingDto }) => (
            <JobPostingCard
              jobPosting={item}
              url={`/individual/company/job-postings/detail/${item.id}`}
            />
          ),
          col: 4,
        },
        list: {
          columns: jobPostingColumns,
        },
      }}
      // ═══════════════════════════════════════════════════════════════════
      // FILTERS - Filtreleme (logic ListView içinde)
      // ═══════════════════════════════════════════════════════════════════
      filters={{
        enabled: true,
        options: jobPostingFilters,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SORT - Sıralama
      // ═══════════════════════════════════════════════════════════════════
      sort={{
        enabled: true,
        options: jobPostingSortOptions,
      }}
      // ═══════════════════════════════════════════════════════════════════
      // SEARCH - Arama
      // ═══════════════════════════════════════════════════════════════════
      search={{
        enabled: true,
        placeholder: "İlan ara...",
        fields: ["positionTitle", "branch", "description"],
      }}
      // ═══════════════════════════════════════════════════════════════════
      // STATES - Empty State
      // ═══════════════════════════════════════════════════════════════════
      states={{
        empty: {
          title: "Henüz İş İlanı Yok",
          description:
            "Henüz iş ilanı oluşturmadınız. İlk ilanınızı oluşturmak için butona tıklayın.",
          icon: "ph-briefcase",
          action: emptyStateAction,
        },
      }}
    />
  );
};

export default CompanyJobPostingsPage;
