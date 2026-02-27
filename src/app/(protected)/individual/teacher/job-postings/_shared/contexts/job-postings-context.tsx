"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useGetAllJobPostings } from "../hooks/api";
import {
  useJobPostingsFilter,
  type JobPostingFilterValues,
} from "../hooks/useJobPostingsFilter";
import { useApplicationsContext } from "../../../applications/_shared/contexts";
import type { JobPostingDto, GetJobPostingsParams } from "@/types";

/**
 * 🔍 JOB POSTINGS CONTEXT (Teacher Version)
 * Öğretmen için iş ilanı verileri
 * - TÜM okulların yayında olan ilanları (PUBLISHED)
 * - Öğretmen sadece görüntüler, ekleyemez/düzenleyemez
 */

interface JobPostingsContextValue {
  // Liste verileri
  jobPostings: JobPostingDto[];
  jobPostingsListLoading: boolean;
  jobPostingsListError: any;
  refetch: () => void;
  // Filtre parametreleriyle API isteği at
  fetchWithParams: (params: GetJobPostingsParams) => void;
  // Filtre durumu
  filterValues: JobPostingFilterValues;
  filteredJobPostings: JobPostingDto[];
  filteredLoading: boolean;
  hasActiveFilters: boolean;
  hasSearched: boolean;
  totalCount: number;
  filteredCount: number;
  applyFilters: (values: JobPostingFilterValues) => void;
  resetFilters: () => void;
}

interface JobPostingsProviderProps {
  children: React.ReactNode;
}

const JobPostingsContext = createContext<JobPostingsContextValue | undefined>(
  undefined,
);

export function JobPostingsProvider({ children }: JobPostingsProviderProps) {
  // API parametreleri — başlangıçta sadece PUBLISHED + büyük size
  // ⚠️ size:1000 → tüm PUBLISHED ilanları çek, client-side filtrele
  //   API sadece şunları destekler: schoolId, branch, status, searchTerm, page, size, sortBy, sortDir
  //   employmentType / requiredExperienceYears / requiredEducationLevel / salaryMin / salaryMax
  //   API query param desteklemez → client-side filtrelenir
  const [apiParams, setApiParams] = useState<GetJobPostingsParams>({
    status: "PUBLISHED",
    size: 1000,
  });
  const [fetchKey, setFetchKey] = useState(0);

  // enabled: false → sayfa açılınca hiç istek atma
  const { data, loading, error, refetch } = useGetAllJobPostings(apiParams, {
    enabled: false,
  });

  // Her render'da güncel refetch'i ref'e yaz (stale closure önle)
  const refetchRef = useRef(refetch);
  useEffect(() => {
    refetchRef.current = refetch;
  });

  // fetchKey her artışında (Filtrele'ye her basılışta) güncel params'la refetch çalışır
  useEffect(() => {
    if (fetchKey > 0) {
      refetchRef.current();
    }
  }, [fetchKey]);

  const fetchWithParams = useCallback((params: GetJobPostingsParams) => {
    // Her zaman büyük size ile tüm ilanları çek
    setApiParams({ size: 1000, ...params });
    setFetchKey((k) => k + 1);
  }, []);

  // Raw API verisini JobPostingDto[] formatına dönüştür
  const jobPostings: JobPostingDto[] = data?.data?.content || [];

  // Başvurular
  const { applications } = useApplicationsContext();

  // Filtre hook'u — tüm filtre mantığı burada
  const filter = useJobPostingsFilter({
    jobPostings,
    fetchWithParams,
    applications,
  });

  // 🎯 CONTEXT VALUE
  const contextValue: JobPostingsContextValue = {
    // Liste verileri
    jobPostings,
    jobPostingsListLoading: loading,
    jobPostingsListError: error,
    refetch,
    fetchWithParams,
    // Filtre durumu
    filterValues: filter.filterValues,
    filteredJobPostings: filter.filteredJobPostings,
    filteredLoading: loading,
    hasActiveFilters: filter.hasActiveFilters,
    hasSearched: filter.hasSearched,
    totalCount: filter.totalCount,
    filteredCount: filter.filteredCount,
    applyFilters: filter.applyFilters,
    resetFilters: filter.resetFilters,
  };

  return (
    <JobPostingsContext.Provider value={contextValue}>
      {children}
    </JobPostingsContext.Provider>
  );
}

// Hook to use JobPostingsContext
export function useJobPostingsContext() {
  const context = useContext(JobPostingsContext);
  if (context === undefined) {
    throw new Error(
      "useJobPostingsContext must be used within a JobPostingsProvider",
    );
  }
  return context;
}
