"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { AppointmentAvailabilityContextType } from "../types";
import type { CancelAppointmentFormValues } from "../sections/cancel-appointment-modal/types/form-values";
import {
  useUnifiedAvailability,
  useFilterManagement,
  useAvailabilityActions,
  useAppointmentDetailsFilter,
  useAppointmentModals,
  useAppointmentActions,
  useAppointmentTableData,
  useAppointmentTableColumns,
  useAppointmentModalHandlers,
} from "../hooks";
import { hasValidSearchCriteria } from "../utils";

const AppointmentAvailabilityContext = createContext<
  AppointmentAvailabilityContextType | undefined
>(undefined);

interface AppointmentAvailabilityProviderProps {
  children: ReactNode;
}

export const AppointmentAvailabilityProvider: React.FC<
  AppointmentAvailabilityProviderProps
> = ({ children }) => {
  // Filter management hook
  const {
    filters,
    setFilters,
    updateFilters,
    clearFilters,
    isRangeFilter,
    addSchoolToFilters,
  } = useFilterManagement();

  // Unified availability hook
  const {
    availabilities,
    availabilityLoading,
    availabilityError,
    singleHook,
    rangeHook,
  } = useUnifiedAvailability(filters);

  // Availability actions hook
  const { fetchAvailabilities } = useAvailabilityActions(
    singleHook,
    rangeHook,
    isRangeFilter,
    addSchoolToFilters,
    setFilters
  );

  // Appointment details filtering hook
  const {
    appointmentFilters,
    filteredAppointments,
    setAppointmentFilters,
    clearAppointmentFilters,
    removeAppointmentFilter,
  } = useAppointmentDetailsFilter(availabilities);

  // Modal management hook
  const {
    confirmModalOpen,
    openConfirmModal,
    closeConfirmModal,
    cancelModalOpen,
    openCancelModal,
    closeCancelModal,
    selectedAppointment,
  } = useAppointmentModals();

  // Appointment actions hook
  const {
    confirmAppointment,
    cancelAppointment,
    confirmLoading,
    cancelLoading,
  } = useAppointmentActions();

  // Table data management hook
  const { dataToDisplay, emptyStateConfig } = useAppointmentTableData({
    filters,
    appointmentFilters,
    filteredAppointments,
    availabilities,
  });

  // Modal handlers hook
  const { handleConfirmClick, handleCancelClick } = useAppointmentModalHandlers(
    {
      dataToDisplay,
      openConfirmModal,
      openCancelModal,
    }
  );

  // Table columns hook
  const columns = useAppointmentTableColumns({
    onConfirm: handleConfirmClick,
    onCancel: handleCancelClick,
    confirmLoading,
    cancelLoading,
    selectedAppointment,
  });

  // Veri durumunu hesapla
  const hasSearchCriteria = hasValidSearchCriteria(filters);
  const hasDataToFilter =
    hasSearchCriteria && availabilities.length > 0 && !availabilityLoading;

  const contextValue: AppointmentAvailabilityContextType = {
    // Availability data
    availabilities,
    availabilityLoading,
    availabilityError,

    // Filter parameters
    filters,

    // Frontend appointment filters
    appointmentFilters,
    filteredAppointments,

    // Data state
    hasDataToFilter,

    // Actions
    fetchAvailabilities,
    updateFilters,
    clearFilters,

    // Appointment details filtering
    setAppointmentFilters,
    clearAppointmentFilters,
    removeAppointmentFilter,

    // Appointment operations
    confirmAppointment,
    cancelAppointment,
    confirmLoading,
    cancelLoading,

    // Modal management
    confirmModalOpen,
    cancelModalOpen,
    selectedAppointment,
    openConfirmModal,
    closeConfirmModal,
    openCancelModal,
    closeCancelModal,

    // Table specific
    dataToDisplay,
    emptyStateConfig,
    columns,
  };

  return (
    <AppointmentAvailabilityContext.Provider value={contextValue}>
      {children}
    </AppointmentAvailabilityContext.Provider>
  );
};

export const useAppointmentAvailability =
  (): AppointmentAvailabilityContextType => {
    const context = useContext(AppointmentAvailabilityContext);
    if (context === undefined) {
      throw new Error(
        "useAppointmentAvailability must be used within an AppointmentAvailabilityProvider"
      );
    }
    return context;
  };

// Legacy context için backward compatibility
export const AppointmentProvider = AppointmentAvailabilityProvider;
export const useAppointment = useAppointmentAvailability;
