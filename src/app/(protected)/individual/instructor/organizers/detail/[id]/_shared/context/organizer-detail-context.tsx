"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useOrganizerDetail } from "../hooks/api/use-organizer-detail";
import { useDeleteOrganizer } from "../../../../_shared/hooks/api/useOrganizersApi";
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

  // 🗑️ DELETE HOOK
  const { mutate: deleteMutate, loading: isDeleting } =
    useDeleteOrganizer(organizerId);

  const deleteOrganizer = (): Promise<boolean> => {
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

  const contextValue: OrganizerDetailContextValue = {
    organizer,
    isLoading: loading,
    error,
    organizerId,
    refetch,
    deleteOrganizer,
    isDeleting,
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
