"use client";

import React, { createContext, useContext, useState } from "react";
import { useGetEvents } from "../hooks/api";
import type { EventDto } from "@/types";

/**
 * 🔍 EVENTS CONTEXT
 * Etkinlikler ortak verisi
 * - Etkinlik listesi
 * - Seçili etkinlik (düzenleme işlemleri için)
 */

interface EventsContextValue {
  // Liste verileri
  events: EventDto[];
  eventsListLoading: boolean;
  eventsListError: unknown;
  refetch: () => void;

  // Seçili etkinliği tutmak için
  selectedEvent: EventDto | null;
  setSelectedEvent: (event: EventDto | null) => void;
}

interface EventsProviderProps {
  children: React.ReactNode;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export function EventsProvider({ children }: EventsProviderProps) {
  // 📊 API DATA - Etkinlik listesi
  const { data, loading, error, refetch } = useGetEvents();

  // Raw API verisini EventDto[] formatına dönüştür
  const events: EventDto[] = data?.data?.content || [];

  // 🎯 Seçili etkinliği tutmak için state
  const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);

  // 🎯 CONTEXT VALUE
  const contextValue: EventsContextValue = {
    events,
    eventsListLoading: loading,
    eventsListError: error,
    refetch,
    selectedEvent,
    setSelectedEvent,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
}

// Hook to use EventsContext
export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return context;
}
