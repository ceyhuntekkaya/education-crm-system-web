"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts";
import { useCompany } from "@/app/(protected)/company/_shared";
import { SlotAddEditContextType } from "../types";
import {
  useSlotById,
  useAddSlot,
  useEditSlot,
  useStaffUsersByCampus,
  useDurationOptions,
  useAppointmentTypeOptions,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

const SlotAddEditContext = createContext<SlotAddEditContextType | undefined>(
  undefined
);

interface SlotAddEditProviderProps {
  children: ReactNode;
}

export const SlotAddEditProvider: React.FC<SlotAddEditProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const { id } = params;

  // Auth ve Company context
  const { user } = useAuth();
  const { selectedSchool } = useCompany();

  // Campus ID'sini al
  const campusId = user?.campus?.id || null;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const slotId = parseEditId(id);

  // Slot data hook
  const {
    slot,
    isLoading: slotLoading,
    error: slotError,
    refetch,
  } = useSlotById({ slotId });

  // Add slot hook
  const { postSlot, isLoading: addLoading, error: addError } = useAddSlot();

  // Edit slot hook - refetch'i props olarak geçir
  const {
    putSlot,
    isLoading: editLoading,
    error: editError,
  } = useEditSlot({
    slotId: slotId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Staff users ve options
  const { staffUserOptions, isLoading: staffLoading } = useStaffUsersByCampus({
    campusId,
  });

  // Duration options
  const durationOptions = useDurationOptions();

  // Appointment type options
  const appointmentTypeOptions = useAppointmentTypeOptions();

  const contextValue: SlotAddEditContextType = {
    // Current slot data
    slot,
    slotLoading: slotLoading || addLoading || editLoading,
    slotError: slotError || addError || editError,

    // Edit mode state
    isEditing,
    slotId: slotId?.toString() || null,

    // Actions
    fetchSlot: refetch,
    postSlot,
    putSlot,

    // Form Options
    staffUserOptions,
    staffLoading,
    durationOptions,
    appointmentTypeOptions,

    // School & Campus info
    campusId,
    selectedSchoolId: selectedSchool?.id || null,
    selectedSchoolName: selectedSchool?.name || null,
  };

  return (
    <SlotAddEditContext.Provider value={contextValue}>
      {children}
    </SlotAddEditContext.Provider>
  );
};

export const useSlotAddEdit = (): SlotAddEditContextType => {
  const context = useContext(SlotAddEditContext);
  if (context === undefined) {
    throw new Error("useSlotAddEdit must be used within a SlotAddEditProvider");
  }
  return context;
};
