"use client";

import React, { useMemo } from "react";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import { JobPostingCard } from "./_shared/sections";
import { createJobPostingColumns } from "./_shared/config/job-posting-columns";
import { JOB_POSTING_POPOVER_FILTERS } from "./_shared/config/job-posting-filters";
import { JOB_POSTING_SORT_OPTIONS } from "./_shared/config/job-posting-sort-options";
import { useJobPostingsContext } from "./_shared/contexts";
import type { JobPostingDto } from "@/types";

/**
 * ================================================================================
 * TEACHER JOB POSTINGS PAGE
 * ================================================================================
 * Öğretmen için iş ilanlarını listeleyen sayfa
 * - TÜM okulların yayında olan ilanları gösterilir (PUBLISHED status)
 * - Öğretmen ilan ekleyemez/düzenleyemez
 * - İlanlara başvuru yapabilir (TODO: İleride eklenecek)
 */

const TeacherJobPostingsPage: React.FC = () => {
  usePageTitle("İş İlanları");

  // Context'ten sadece data al
  const { jobPostings, jobPostingsListLoading } = useJobPostingsContext();

  // Config'leri memoize et ki her render'da yeni object oluşmasın
  const jobPostingColumns = useMemo(() => createJobPostingColumns(), []);
  const jobPostingFilters = useMemo(() => JOB_POSTING_POPOVER_FILTERS, []);
  const jobPostingSortOptions = useMemo(() => JOB_POSTING_SORT_OPTIONS, []);

  return (
    <DataCollectionLayout<JobPostingDto>
      // ═══════════════════════════════════════════════════════════════════
      // HEADER - Başlık ve Aksiyon Butonları
      // ═══════════════════════════════════════════════════════════════════
      header={{
        title: "İş İlanları",
        subtitle:
          "Tüm okulların aktif iş ilanlarını buradan görüntüleyebilir ve başvuru yapabilirsiniz.",
        icon: "ph-briefcase",
        // Öğretmen için action buttons yok (ilan ekleyemez)
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
              // TODO: İleride detail sayfası eklenebilir
              // url={`/individual/teacher/job-postings/detail/${item.id}`}
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
            "Şu an aktif bir iş ilanı bulunmamaktadır. Yeni ilanlar yayınlandığında burada görüntülenecektir.",
          icon: "ph-briefcase",
        },
      }}
    />
  );
};

export default TeacherJobPostingsPage;
