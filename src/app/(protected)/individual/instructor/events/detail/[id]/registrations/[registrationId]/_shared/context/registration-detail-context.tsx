"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import {
  useGetRegistrationById,
  useUpdateRegistrationStatus,
  useMarkAttendance,
  useDeleteRegistration,
} from "../../../../_shared/hooks/api/use-event-registrations-api";
import type { RegistrationDetailContextValue } from "../types/context-types";

const RegistrationDetailContext = createContext<
  RegistrationDetailContextValue | undefined
>(undefined);

interface RegistrationDetailProviderProps {
  children: React.ReactNode;
}

export function RegistrationDetailProvider({
  children,
}: RegistrationDetailProviderProps) {
  const params = useParams();
  const registrationId = Number(params?.registrationId) || 0;

  // ── Fetch registration ──────────────────────────────────────────────────
  const { data, loading, error, refetch } = useGetRegistrationById(
    registrationId,
    { enabled: registrationId > 0 },
  );

  const registration = data?.data ?? null;

  // ── Mutations ───────────────────────────────────────────────────────────
  const { mutate: statusMutate, loading: isUpdatingStatus } =
    useUpdateRegistrationStatus(registrationId);

  const { mutate: attendanceMutate, loading: isMarkingAttendance } =
    useMarkAttendance(registrationId);

  const { mutate: deleteMutate, loading: isDeleting } =
    useDeleteRegistration(registrationId);

  const updateStatus = (
    payload: { status: string },
    callbacks?: { onSuccess?: () => void; onError?: (e: unknown) => void },
  ) => {
    statusMutate(payload as any, {
      onSuccess: () => callbacks?.onSuccess?.(),
      onError: (e) => callbacks?.onError?.(e),
    });
  };

  const markAttendance = (
    payload: { attended: boolean },
    callbacks?: { onSuccess?: () => void; onError?: (e: unknown) => void },
  ) => {
    attendanceMutate(payload, {
      onSuccess: () => callbacks?.onSuccess?.(),
      onError: (e) => callbacks?.onError?.(e),
    });
  };

  const deleteRegistration = (): Promise<boolean> => {
    return new Promise((resolve) => {
      deleteMutate(undefined, {
        onSuccess: () => resolve(true),
        onError: (error) => {
          if (error === "API response is empty or null") {
            resolve(true);
          } else {
            resolve(false);
          }
        },
      });
    });
  };

  const contextValue: RegistrationDetailContextValue = {
    registration,
    isLoading: loading,
    error,
    registrationId,
    refetch,
    updateStatus,
    isUpdatingStatus,
    markAttendance,
    isMarkingAttendance,
    deleteRegistration,
    isDeleting,
  };

  return (
    <RegistrationDetailContext.Provider value={contextValue}>
      {children}
    </RegistrationDetailContext.Provider>
  );
}

export function useRegistrationDetailContext() {
  const context = useContext(RegistrationDetailContext);
  if (context === undefined) {
    throw new Error(
      "useRegistrationDetailContext must be used within a RegistrationDetailProvider",
    );
  }
  return context;
}
