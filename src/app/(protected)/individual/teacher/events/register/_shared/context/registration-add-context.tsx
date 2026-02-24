"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts";
import type { EventRegistrationAddContextValue } from "../types";
import { useGetEventById, useCreateRegistrationForm } from "../hooks";

const EventRegistrationAddContext = createContext<
  EventRegistrationAddContextValue | undefined
>(undefined);

interface EventRegistrationAddProviderProps {
  children: ReactNode;
}

export function EventRegistrationAddProvider({
  children,
}: EventRegistrationAddProviderProps) {
  const params = useParams();
  const { user } = useAuth();

  const eventId = params.eventId ? parseInt(params.eventId as string) : null;

  const { data: eventData, loading: eventLoading } = useGetEventById(eventId, {
    enabled: !!eventId,
  });

  const event = eventData?.data || null;

  const { submitRegistration: submitFn, submitting } =
    useCreateRegistrationForm();

  const submitRegistration = async (data: {
    eventId: number;
    teacherId: number;
    registrationNote?: string;
  }): Promise<boolean> => {
    return submitFn(data);
  };

  const contextValue: EventRegistrationAddContextValue = {
    event,
    eventLoading,
    submitRegistration,
    submitting,
  };

  return (
    <EventRegistrationAddContext.Provider value={contextValue}>
      {children}
    </EventRegistrationAddContext.Provider>
  );
}

export function useEventRegistrationAdd() {
  const context = useContext(EventRegistrationAddContext);
  if (context === undefined) {
    throw new Error(
      "useEventRegistrationAdd must be used within an EventRegistrationAddProvider",
    );
  }
  return context;
}
