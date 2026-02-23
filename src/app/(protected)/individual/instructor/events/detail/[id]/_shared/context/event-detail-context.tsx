"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useEventDetail } from "../hooks/api/use-event-detail";
import { useDeleteEvent } from "../../../../_shared/hooks/api/useEventsApi";
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

  // 🗑️ DELETE HOOK
  const { mutate: deleteMutate, loading: isDeleting } = useDeleteEvent(eventId);

  const deleteEvent = (): Promise<boolean> => {
    return new Promise((resolve) => {
      deleteMutate(undefined, {
        onSuccess: () => resolve(true),
        onError: (error) => {
          // Backend DELETE, data: null döner — executeMutation bunu hata olarak fırlatır.
          // Gerçek bir ağ hatası değilse başarılı say.
          if (error === "API response is empty or null") {
            resolve(true);
          } else {
            resolve(false);
          }
        },
      });
    });
  };

  const contextValue: EventDetailContextValue = {
    event,
    isLoading: loading,
    error,
    eventId,
    refetch,
    deleteEvent,
    isDeleting,
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
