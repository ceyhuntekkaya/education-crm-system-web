"use client";

import React, { createContext, useContext, useState } from "react";
import { useGetJobPostingsBySchool } from "../hooks/api";
import type { JobPostingDto } from "@/types";

/**
 * 🔍 JOB POSTINGS CONTEXT
 * Ortak iş ilanı verileri
 * - İlan listesi (okula ait tüm ilanlar)
 * - Seçili ilan (düzenleme için)
 * Not: Tek ilan detayı için JobPostingDetailProvider kullanılmalı
 */

interface JobPostingsContextValue {
  // Liste verileri
  jobPostings: JobPostingDto[];
  jobPostingsListLoading: boolean;
  jobPostingsListError: any;
  refetch: () => void;

  // Seçili ilanı tutmak için (add-edit sayfasında API çağrısı yapmamak için)
  selectedJobPosting: JobPostingDto | null;
  setSelectedJobPosting: (jobPosting: JobPostingDto | null) => void;
}

interface JobPostingsProviderProps {
  children: React.ReactNode;
  schoolId: number;
}

const JobPostingsContext = createContext<JobPostingsContextValue | undefined>(
  undefined,
);

export function JobPostingsProvider({
  children,
  schoolId,
}: JobPostingsProviderProps) {
  // 📊 API DATA - İlan listesi
  const { data, loading, error, refetch } = useGetJobPostingsBySchool(schoolId);

  // Raw API verisini JobPostingDto[] formatına dönüştür
  const jobPostings: JobPostingDto[] = data?.data?.content || [];

  // 🎯 Seçili ilanı tutmak için state
  const [selectedJobPosting, setSelectedJobPosting] =
    useState<JobPostingDto | null>(null);

  // 🎯 CONTEXT VALUE
  const contextValue: JobPostingsContextValue = {
    // Liste verileri
    jobPostings,
    jobPostingsListLoading: loading,
    jobPostingsListError: error,
    refetch,

    // Seçili ilan
    selectedJobPosting,
    setSelectedJobPosting,
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
