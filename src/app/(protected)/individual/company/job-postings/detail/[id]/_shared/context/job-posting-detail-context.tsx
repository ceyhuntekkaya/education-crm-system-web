"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useJobPostingDetail } from "../hooks/api";
import type { JobPostingDetailContextValue } from "../types";

const JobPostingDetailContext = createContext<
  JobPostingDetailContextValue | undefined
>(undefined);

interface JobPostingDetailProviderProps {
  children: React.ReactNode;
}

export function JobPostingDetailProvider({
  children,
}: JobPostingDetailProviderProps) {
  const params = useParams();
  const jobPostingId = Number(params?.id) || 0;

  const { jobPosting, isLoading, error, refetch } =
    useJobPostingDetail(jobPostingId);

  const contextValue: JobPostingDetailContextValue = {
    jobPosting,
    isLoading,
    error,
    jobPostingId,
    refetch,
  };

  return (
    <JobPostingDetailContext.Provider value={contextValue}>
      {children}
    </JobPostingDetailContext.Provider>
  );
}

export function useJobPostingDetailContext() {
  const context = useContext(JobPostingDetailContext);
  if (context === undefined) {
    throw new Error(
      "useJobPostingDetailContext must be used within a JobPostingDetailProvider",
    );
  }
  return context;
}
