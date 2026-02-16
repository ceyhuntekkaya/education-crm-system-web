"use client";

import React, { createContext, useContext } from "react";
import { useGetAllJobPostings } from "../hooks/api";
import type { JobPostingDto } from "@/types";

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
}

interface JobPostingsProviderProps {
  children: React.ReactNode;
}

const JobPostingsContext = createContext<JobPostingsContextValue | undefined>(
  undefined,
);

export function JobPostingsProvider({ children }: JobPostingsProviderProps) {
  // 📊 API DATA - TÜM okulların PUBLISHED ilanlarını getir
  const { data, loading, error, refetch } = useGetAllJobPostings();

  // Raw API verisini JobPostingDto[] formatına dönüştür
  const jobPostings: JobPostingDto[] = data?.data?.content || [];

  // 🎯 CONTEXT VALUE
  const contextValue: JobPostingsContextValue = {
    // Liste verileri
    jobPostings,
    jobPostingsListLoading: loading,
    jobPostingsListError: error,
    refetch,
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
