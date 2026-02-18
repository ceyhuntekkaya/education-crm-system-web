"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useGetApplicationsByJobPosting } from "../hooks";
import type { ApplicationDto } from "../types";

/**
 * ================================================================================
 * CONTEXT TYPE
 * ================================================================================
 */
interface ApplicationsByJobPostingContextValue {
  jobPostingId: number;
  applications: ApplicationDto[];
  applicationsListLoading: boolean;
  applicationsListError: any;
  refetch: () => void;
}

/**
 * ================================================================================
 * CONTEXT
 * ================================================================================
 */
const ApplicationsByJobPostingContext = createContext<
  ApplicationsByJobPostingContextValue | undefined
>(undefined);

/**
 * ================================================================================
 * PROVIDER
 * ================================================================================
 */
interface ApplicationsByJobPostingProviderProps {
  children: React.ReactNode;
}

export const ApplicationsByJobPostingProvider: React.FC<
  ApplicationsByJobPostingProviderProps
> = ({ children }) => {
  const params = useParams();
  const jobPostingId = parseInt(params.id as string, 10) || 0;

  // 📊 API DATA - Başvuru listesi
  const { data, loading, error, refetch } =
    useGetApplicationsByJobPosting(jobPostingId);

  // Raw API verisini ApplicationDto[] formatına dönüştür
  const applications: ApplicationDto[] = data?.data?.content || [];

  const value: ApplicationsByJobPostingContextValue = {
    jobPostingId,
    applications,
    applicationsListLoading: loading,
    applicationsListError: error,
    refetch,
  };

  return (
    <ApplicationsByJobPostingContext.Provider value={value}>
      {children}
    </ApplicationsByJobPostingContext.Provider>
  );
};

/**
 * ================================================================================
 * HOOK
 * ================================================================================
 */
export const useApplicationsByJobPostingContext = () => {
  const context = useContext(ApplicationsByJobPostingContext);
  if (!context) {
    throw new Error(
      "useApplicationsByJobPostingContext must be used within ApplicationsByJobPostingProvider",
    );
  }
  return context;
};
