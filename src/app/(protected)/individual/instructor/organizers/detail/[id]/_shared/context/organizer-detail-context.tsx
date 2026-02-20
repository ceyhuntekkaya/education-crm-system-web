"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useOrganizerDetail } from "../hooks/api/use-organizer-detail";
import type { OrganizerDetailContextValue } from "../types/context-types";

const OrganizerDetailContext = createContext<
  OrganizerDetailContextValue | undefined
>(undefined);

interface OrganizerDetailProviderProps {
  children: React.ReactNode;
}

export function OrganizerDetailProvider({
  children,
}: OrganizerDetailProviderProps) {
  const params = useParams();
  const organizerId = Number(params?.id) || 0;

  const { data, loading, error, refetch } = useOrganizerDetail(organizerId);

  const organizer = data?.data ?? null;

  const contextValue: OrganizerDetailContextValue = {
    organizer,
    isLoading: loading,
    error,
    organizerId,
    refetch,
  };

  return (
    <OrganizerDetailContext.Provider value={contextValue}>
      {children}
    </OrganizerDetailContext.Provider>
  );
}

export function useOrganizerDetailContext() {
  const context = useContext(OrganizerDetailContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizerDetailContext must be used within an OrganizerDetailProvider",
    );
  }
  return context;
}
