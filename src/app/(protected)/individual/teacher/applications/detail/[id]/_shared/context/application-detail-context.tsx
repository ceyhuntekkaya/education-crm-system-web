"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useGetApplicationById } from "../../../../_shared/hooks/api";
import type { ApplicationDetailContextValue } from "../types";

/**
 * ================================================================================
 * APPLICATION DETAIL CONTEXT
 * ================================================================================
 * Başvuru detay sayfası için context
 */

const ApplicationDetailContext = createContext<
  ApplicationDetailContextValue | undefined
>(undefined);

interface ApplicationDetailProviderProps {
  children: React.ReactNode;
}

export function ApplicationDetailProvider({
  children,
}: ApplicationDetailProviderProps) {
  const params = useParams();
  const applicationId = Number(params?.id) || 0;

  // API'den başvuru detayını al
  const {
    data,
    loading: isLoading,
    error,
    refetch,
  } = useGetApplicationById(applicationId);

  const application = data?.data || null;

  const contextValue: ApplicationDetailContextValue = {
    application,
    isLoading,
    error,
    applicationId,
    refetch,
  };

  return (
    <ApplicationDetailContext.Provider value={contextValue}>
      {children}
    </ApplicationDetailContext.Provider>
  );
}

// Hook to use ApplicationDetailContext
export function useApplicationDetailContext() {
  const context = useContext(ApplicationDetailContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationDetailContext must be used within ApplicationDetailProvider",
    );
  }
  return context;
}
