"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useGetPublishedEvents, useGetMyRegistrations } from "../hooks/api";
import { useAuth } from "@/contexts";
import type { EventDto } from "@/types";

/**
 * 🔍 TEACHER EVENTS CONTEXT
 * Öğretmen için yayındaki etkinliklerin verisi
 * - Sadece PUBLISHED etkinlikler listelenir
 * - Öğretmen etkinlik ekleyemez/düzenleyemez, sadece kayıt olabilir
 * - Kayıt durumu (registeredEventIds) ile hangi etkinliklere kayıtlı olduğu takip edilir
 */

interface TeacherEventsContextValue {
  events: EventDto[];
  eventsListLoading: boolean;
  eventsListError: unknown;
  refetch: () => void;
  /** Öğretmenin kayıtlı olduğu etkinlik ID'leri (PENDING veya APPROVED) */
  registeredEventIds: Set<number>;
  registrationsLoading: boolean;
  /** Kayıt listesini yeniden çeker (kayıt sonrası butonu güncellemek için) */
  refetchRegistrations: () => void;
}

interface TeacherEventsProviderProps {
  children: React.ReactNode;
}

const TeacherEventsContext = createContext<
  TeacherEventsContextValue | undefined
>(undefined);

export function TeacherEventsProvider({
  children,
}: TeacherEventsProviderProps) {
  const { user } = useAuth();
  const teacherId = user?.id ?? null;

  const { data, loading, error, refetch } = useGetPublishedEvents();
  const {
    data: registrationData,
    loading: registrationsLoading,
    refetch: refetchRegistrations,
  } = useGetMyRegistrations(teacherId);

  const events: EventDto[] = data?.data?.content || [];

  const registeredEventIds = useMemo<Set<number>>(() => {
    const content = registrationData?.data?.content || [];
    return new Set(
      content
        .filter((r) => r.status === "PENDING" || r.status === "APPROVED")
        .map((r) => r.eventId),
    );
  }, [registrationData]);

  const contextValue: TeacherEventsContextValue = {
    events,
    eventsListLoading: loading,
    eventsListError: error,
    refetch,
    registeredEventIds,
    registrationsLoading,
    refetchRegistrations,
  };

  return (
    <TeacherEventsContext.Provider value={contextValue}>
      {children}
    </TeacherEventsContext.Provider>
  );
}

export function useTeacherEventsContext() {
  const context = useContext(TeacherEventsContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherEventsContext must be used within a TeacherEventsProvider",
    );
  }
  return context;
}
