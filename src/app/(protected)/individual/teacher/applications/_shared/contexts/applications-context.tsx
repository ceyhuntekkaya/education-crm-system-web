"use client";

import React, { createContext, useContext, useState } from "react";
import { useGetApplicationsByTeacher } from "../hooks/api";
import type { ApplicationDto } from "../types";

/**
 * 🔍 APPLICATIONS CONTEXT
 * Öğretmenin başvuruları için ortak veri yönetimi
 * - Başvuru listesi (öğretmene ait tüm başvurular)
 * - Seçili başvuru (düzenleme/detay için)
 */

interface ApplicationsContextValue {
  // Liste verileri
  applications: ApplicationDto[];
  applicationsListLoading: boolean;
  applicationsListError: any;
  refetch: () => void;

  // Seçili başvuruyu tutmak için
  selectedApplication: ApplicationDto | null;
  setSelectedApplication: (application: ApplicationDto | null) => void;
}

interface ApplicationsProviderProps {
  children: React.ReactNode;
  teacherId: number;
}

const ApplicationsContext = createContext<ApplicationsContextValue | undefined>(
  undefined,
);

export function ApplicationsProvider({
  children,
  teacherId,
}: ApplicationsProviderProps) {
  // 📊 API DATA - Başvuru listesi
  const { data, loading, error, refetch } =
    useGetApplicationsByTeacher(teacherId);

  // Raw API verisini ApplicationDto[] formatına dönüştür
  const applications: ApplicationDto[] = data?.data?.content || [];

  // 🎯 Seçili başvuruyu tutmak için state
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationDto | null>(null);

  // 🎯 CONTEXT VALUE
  const contextValue: ApplicationsContextValue = {
    // Liste verileri
    applications,
    applicationsListLoading: loading,
    applicationsListError: error,
    refetch,

    // Seçili başvuru
    selectedApplication,
    setSelectedApplication,
  };

  return (
    <ApplicationsContext.Provider value={contextValue}>
      {children}
    </ApplicationsContext.Provider>
  );
}

// Hook to use ApplicationsContext
export function useApplicationsContext() {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationsContext must be used within an ApplicationsProvider",
    );
  }
  return context;
}
