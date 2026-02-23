"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useEventDetail } from "../hooks/api/use-event-detail";
import type { EventDetailContextValue } from "../types/context-types";

const EventDetailContext = createContext<EventDetailContextValue | undefined>(
  undefined,
);

interface EventDetailProviderProps {
  children: React.ReactNode;
}

export function EventDetailProvider({ children }: EventDetailProviderProps) {
  const params = useParams();
  const eventId = Number(params?.id) || 0;

  const { data, loading, error, refetch } = useEventDetail(eventId);

  const event = data?.data ?? null;

  const contextValue: EventDetailContextValue = {
    event,
    isLoading: loading,
    error,
    eventId,
    refetch,
  };

  return (
    <EventDetailContext.Provider value={contextValue}>
      {children}
    </EventDetailContext.Provider>
  );
}

export function useEventDetailContext() {
  const context = useContext(EventDetailContext);
  if (context === undefined) {
    throw new Error(
      "useEventDetailContext must be used within an EventDetailProvider",
    );
  }
  return context;
}
