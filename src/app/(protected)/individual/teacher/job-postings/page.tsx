"use client";

import React, { useMemo } from "react";
import { usePageTitle } from "@/hooks";
import { DataCollectionLayout } from "@/components/layouts/data-collection-layout";
import {
  JobPostingCard,
  JobPostingFilterSidebar,
  JobPostingsInitialState,
} from "./_shared/sections";
import { createJobPostingColumns } from "./_shared/config/job-posting-columns";
import { JOB_POSTING_POPOVER_FILTERS } from "./_shared/config/job-posting-filters";
import { JOB_POSTING_SORT_OPTIONS } from "./_shared/config/job-posting-sort-options";
import { useJobPostingsContext } from "./_shared/contexts/job-postings-context";
import type { JobPostingDto } from "@/types";

/**
 * TEACHER JOB POSTINGS PAGE
 * - Sol: Filter sidebar (keyword, branş, istihdam tipi, deneyim, maaş)
 * - Sağ: Filtre uygulanmadan → InitialSearchState
 *        Filtre uygulandığında → DataCollectionLayout (sort/search dahil)
 */

// ─── Right panel ─────────────────────────────────────────────────────────

const JobPostingsContent: React.FC = () => {
  const { filteredJobPostings, filteredLoading, hasSearched } =
    useJobPostingsContext();

  const jobPostingColumns = useMemo(() => createJobPostingColumns(), []);

  // Henüz Filtrele'ye basılmamışsa initial state göster
  if (!hasSearched) {
    return <JobPostingsInitialState />;
  }

  return (
    <DataCollectionLayout<JobPostingDto>
      header={{
        title: "İş İlanları",
        subtitle: "Filtrelenen sonuçlar aşağıda listelenmiştir.",
        icon: "ph-briefcase",
      }}
      data={{
        data: filteredJobPostings,
        loading: filteredLoading,
      }}
      view={{
        defaultMode: "grid",
        enableToggle: true,
        grid: {
          renderCard: ({ item }: { item: JobPostingDto }) => (
            <JobPostingCard jobPosting={item} />
          ),
          col: 4,
        },
        list: {
          columns: jobPostingColumns,
        },
      }}
      filters={{
        enabled: true,
        options: JOB_POSTING_POPOVER_FILTERS,
      }}
      sort={{
        enabled: true,
        options: JOB_POSTING_SORT_OPTIONS,
      }}
      search={{
        enabled: true,
        placeholder: "İlan ara...",
        fields: ["positionTitle", "branch", "description"],
      }}
      states={{
        empty: {
          title: "Sonuç Bulunamadı",
          description:
            "Seçtiğiniz filtrelere uygun ilan bulunamadı. Lütfen sol taraftaki filtrelerinizi değiştirin.",
          icon: "ph-briefcase",
        },
      }}
    />
  );
};

// ─── Page ────────────────────────────────────────────────────────────────

const TeacherJobPostingsPage: React.FC = () => {
  usePageTitle("İş İlanları");

  return (
    <div className="row g-24 mt-12">
      {/* Sol: Filtre Sidebar */}
      <div className="col-lg-3">
        <JobPostingFilterSidebar />
      </div>

      {/* Sağ: Initial State veya DataCollectionLayout */}
      <div className="col-lg-9">
        <JobPostingsContent />
      </div>
    </div>
  );
};

export default TeacherJobPostingsPage;
