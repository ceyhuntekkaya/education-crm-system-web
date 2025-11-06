"use client";

import { useState, useCallback } from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { CancelledByType } from "@/enums";

interface SelectedAppointment {
  id: number;
  appointment: AppointmentDto;
  slotDate?: string;
}

interface UseAppointmentModalsReturn {
  // Confirm modal state
  confirmModalOpen: boolean;
  openConfirmModal: (appointment: SelectedAppointment) => void;
  closeConfirmModal: () => void;

  // Cancel modal state
  cancelModalOpen: boolean;
  openCancelModal: (appointment: SelectedAppointment) => void;
  closeCancelModal: () => void;

  // Selected appointment
  selectedAppointment: SelectedAppointment | null;
}

/**
 * Modal state yönetimi için hook
 * Randevu onaylama ve iptal modallarının açılma/kapanma state'lerini yönetir
 */
export const useAppointmentModals = (): UseAppointmentModalsReturn => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<SelectedAppointment | null>(null);

  const openConfirmModal = useCallback((appointment: SelectedAppointment) => {
    setSelectedAppointment(appointment);
    setConfirmModalOpen(true);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModalOpen(false);
    setSelectedAppointment(null);
  }, []);

  const openCancelModal = useCallback((appointment: SelectedAppointment) => {
    setSelectedAppointment(appointment);
    setCancelModalOpen(true);
  }, []);

  const closeCancelModal = useCallback(() => {
    setCancelModalOpen(false);
    setSelectedAppointment(null);
  }, []);

  return {
    confirmModalOpen,
    openConfirmModal,
    closeConfirmModal,
    cancelModalOpen,
    openCancelModal,
    closeCancelModal,
    selectedAppointment,
  };
};
