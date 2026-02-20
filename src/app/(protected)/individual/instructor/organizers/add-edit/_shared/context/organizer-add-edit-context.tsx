"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import type { OrganizerAddEditContextValue } from "../types";
import { useAddOrganizer, useEditOrganizer } from "../hooks";
import { useOrganizersContext } from "@/app/(protected)/individual/instructor/organizers/_shared/contexts";
import { useGetOrganizerById } from "@/app/(protected)/individual/instructor/organizers/_shared/hooks/api";
import { isValidEditId, parseEditId } from "../utils";

const OrganizerAddEditContext = createContext<
  OrganizerAddEditContextValue | undefined
>(undefined);

interface OrganizerAddEditProviderProps {
  children: ReactNode;
}

export function OrganizerAddEditProvider({
  children,
}: OrganizerAddEditProviderProps) {
  const params = useParams();
  const { selectedOrganizer } = useOrganizersContext();

  // ID parsing and edit mode determination
  const { id } = params;
  const isEditMode = isValidEditId(id);
  const organizerId = parseEditId(id);

  // Organizatör detayı - edit modunda context'teki seçili organizatör veya API'den çek
  const { data: organizerData, loading: organizerDetailLoading } =
    useGetOrganizerById(isEditMode ? organizerId : null);

  const organizer = isEditMode
    ? selectedOrganizer || organizerData?.data || null
    : null;

  // API Hooks
  const { createOrganizer, isCreating, createError } = useAddOrganizer();
  const { updateOrganizer, isUpdating, updateError } = useEditOrganizer(
    organizerId || 0,
  );

  const contextValue: OrganizerAddEditContextValue = {
    // Current organizer data
    organizer,
    organizerDetailLoading: isEditMode ? organizerDetailLoading : false,
    organizerSubmitLoading: isCreating || isUpdating,
    organizerError: createError || updateError,

    // Edit mode state
    isEditMode,
    organizerId: organizerId?.toString() || null,

    // Actions
    postOrganizer: createOrganizer,
    putOrganizer: updateOrganizer,
  };

  return (
    <OrganizerAddEditContext.Provider value={contextValue}>
      {children}
    </OrganizerAddEditContext.Provider>
  );
}

export function useOrganizerAddEdit() {
  const context = useContext(OrganizerAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizerAddEdit must be used within an OrganizerAddEditProvider",
    );
  }
  return context;
}
