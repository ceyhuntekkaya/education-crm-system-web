"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import type { EventAddEditContextValue } from "../types";
import { useAddEvent, useEditEvent } from "../hooks";
import { useEventsContext } from "@/app/(protected)/individual/instructor/events/_shared/contexts";
import { useGetEventById } from "@/app/(protected)/individual/instructor/events/_shared/hooks/api";
import { isValidEditId, parseEditId } from "../utils";

const EventAddEditContext = createContext<EventAddEditContextValue | undefined>(
  undefined,
);

interface EventAddEditProviderProps {
  children: ReactNode;
}

export function EventAddEditProvider({ children }: EventAddEditProviderProps) {
  const params = useParams();
  const { selectedEvent } = useEventsContext();

  // ID parsing and edit mode determination
  const { id } = params;
  const isEditMode = isValidEditId(id);
  const eventId = parseEditId(id);

  // Etkinlik detayı - edit modunda context'teki seçili etkinlik veya API'den çek
  const { data: eventData, loading: eventDetailLoading } = useGetEventById(
    isEditMode ? eventId : null,
  );

  const event = isEditMode ? selectedEvent || eventData?.data || null : null;

  // API Hooks
  const { createEvent, isCreating, createError } = useAddEvent();
  const { updateEvent, isUpdating, updateError } = useEditEvent(eventId || 0);

  const contextValue: EventAddEditContextValue = {
    // Current event data
    event,
    eventDetailLoading: isEditMode ? eventDetailLoading : false,
    eventSubmitLoading: isCreating || isUpdating,
    eventError: createError || updateError,

    // Edit mode state
    isEditMode,
    eventId: eventId?.toString() || null,

    // Actions
    postEvent: createEvent,
    putEvent: updateEvent,
  };

  return (
    <EventAddEditContext.Provider value={contextValue}>
      {children}
    </EventAddEditContext.Provider>
  );
}

export function useEventAddEdit() {
  const context = useContext(EventAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useEventAddEdit must be used within an EventAddEditProvider",
    );
  }
  return context;
}
