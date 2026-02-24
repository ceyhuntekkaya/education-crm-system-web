"use client";

import React, { createContext, useContext, useState } from "react";
import { useGetOrganizers } from "../hooks/api";
import type { EventOrganizerDto } from "@/types";

/**
 * 🔍 ORGANIZERS CONTEXT
 * Etkinlik düzenleyenleri ortak verisi
 * - Düzenleyen listesi
 * - Seçili düzenleyen (düzenleme işlemleri için)
 */

interface OrganizersContextValue {
  // Liste verileri
  organizers: EventOrganizerDto[];
  organizersListLoading: boolean;
  organizersListError: unknown;
  refetch: () => void;

  // Seçili düzenleyeni tutmak için
  selectedOrganizer: EventOrganizerDto | null;
  setSelectedOrganizer: (organizer: EventOrganizerDto | null) => void;
}

interface OrganizersProviderProps {
  children: React.ReactNode;
}

const OrganizersContext = createContext<OrganizersContextValue | undefined>(
  undefined,
);

export function OrganizersProvider({ children }: OrganizersProviderProps) {
  // 📊 API DATA - Düzenleyen listesi
  const { data, loading, error, refetch } = useGetOrganizers();

  // Raw API verisini EventOrganizerDto[] formatına dönüştür
  const organizers: EventOrganizerDto[] = data?.data?.content || [];

  // 🎯 Seçili düzenleyeni tutmak için state
  const [selectedOrganizer, setSelectedOrganizer] =
    useState<EventOrganizerDto | null>(null);

  // 🎯 CONTEXT VALUE
  const contextValue: OrganizersContextValue = {
    organizers,
    organizersListLoading: loading,
    organizersListError: error,
    refetch,
    selectedOrganizer,
    setSelectedOrganizer,
  };

  return (
    <OrganizersContext.Provider value={contextValue}>
      {children}
    </OrganizersContext.Provider>
  );
}

// Hook to use OrganizersContext
export function useOrganizersContext() {
  const context = useContext(OrganizersContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizersContext must be used within an OrganizersProvider",
    );
  }
  return context;
}
