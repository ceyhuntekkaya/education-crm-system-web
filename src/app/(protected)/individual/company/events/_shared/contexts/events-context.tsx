"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  useGetPublishedEvents,
  useGetMyRegistrations,
} from "@/app/(protected)/individual/company/events/_shared/hooks/api";
import { useAuth } from "@/contexts";
import type { EventDto } from "@/types";
import type { EventRegistrationDto } from "@/types";

/**
 * 🔍 COMPANY EVENTS CONTEXT
 * Şirket/Kurum kullanıcısı için yayındaki etkinliklerin verisi
 * - Sadece PUBLISHED etkinlikler listelenir
 * - Şirket kullanıcısı etkinliklere kayıt olabilir
 * - Kayıt durumu (registeredEventIds) ile hangi etkinliklere kayıtlı olduğu takip edilir
 */

interface CompanyEventsContextValue {
  events: EventDto[];
  eventsListLoading: boolean;
  eventsListError: unknown;
  refetch: () => void;
  /** Şirket kullanıcısının kayıtlı olduğu etkinlik ID'leri (PENDING veya APPROVED) */
  registeredEventIds: Set<number>;
  registrationsLoading: boolean;
  /** Kayıt listesini yeniden çeker (kayıt sonrası butonu güncellemek için) */
  refetchRegistrations: () => void;
}

interface CompanyEventsProviderProps {
  children: React.ReactNode;
}

const CompanyEventsContext = createContext<
  CompanyEventsContextValue | undefined
>(undefined);

export function CompanyEventsProvider({
  children,
}: CompanyEventsProviderProps) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const { data, loading, error, refetch } = useGetPublishedEvents();
  const {
    data: registrationData,
    loading: registrationsLoading,
    refetch: refetchRegistrations,
  } = useGetMyRegistrations(userId);

  const events: EventDto[] = data?.data?.content || [];

  const registeredEventIds = useMemo<Set<number>>(() => {
    const content = registrationData?.data?.content || [];
    return new Set(
      content
        .filter(
          (r: EventRegistrationDto) =>
            r.status === "PENDING" || r.status === "APPROVED",
        )
        .map((r: EventRegistrationDto) => r.eventId),
    );
  }, [registrationData]);

  const contextValue: CompanyEventsContextValue = {
    events,
    eventsListLoading: loading,
    eventsListError: error,
    refetch,
    registeredEventIds,
    registrationsLoading,
    refetchRegistrations,
  };

  return (
    <CompanyEventsContext.Provider value={contextValue}>
      {children}
    </CompanyEventsContext.Provider>
  );
}

export function useCompanyEventsContext() {
  const context = useContext(CompanyEventsContext);
  if (context === undefined) {
    throw new Error(
      "useCompanyEventsContext must be used within a CompanyEventsProvider",
    );
  }
  return context;
}
