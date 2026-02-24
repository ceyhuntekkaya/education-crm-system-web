"use client";

import React, { createContext, useContext } from "react";
import { useEventDetailContext } from "../../../_shared/context/event-detail-context";
import { useGetRegistrationsByEvent } from "../../../_shared/hooks/api/use-event-registrations-api";
import type { EventRegistrationDto } from "@/types";

interface RegistrationsContextValue {
  registrations: EventRegistrationDto[];
  registrationsLoading: boolean;
  registrationsError: unknown;
  refetch: () => void;
}

const RegistrationsContext = createContext<
  RegistrationsContextValue | undefined
>(undefined);

export function RegistrationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { eventId } = useEventDetailContext();

  const { data, loading, error, refetch } = useGetRegistrationsByEvent(
    eventId,
    { page: 0, size: 200 },
    { enabled: eventId > 0 },
  );

  const registrations: EventRegistrationDto[] = data?.data?.content ?? [];

  return (
    <RegistrationsContext.Provider
      value={{
        registrations,
        registrationsLoading: loading,
        registrationsError: error,
        refetch,
      }}
    >
      {children}
    </RegistrationsContext.Provider>
  );
}

export function useRegistrationsContext() {
  const ctx = useContext(RegistrationsContext);
  if (!ctx) {
    throw new Error(
      "useRegistrationsContext must be used within RegistrationsProvider",
    );
  }
  return ctx;
}
