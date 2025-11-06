import { useCallback } from "react";
import type { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import type { SelectedAppointment } from "../types";

interface UseAppointmentModalHandlersProps {
  dataToDisplay: AppointmentSlotDto[];
  openConfirmModal?: (appointment: SelectedAppointment) => void;
  openCancelModal?: (appointment: SelectedAppointment) => void;
}

export const useAppointmentModalHandlers = ({
  dataToDisplay,
  openConfirmModal,
  openCancelModal,
}: UseAppointmentModalHandlersProps) => {
  const handleConfirmClick = useCallback(
    (appointmentId: number) => {
      const slotData = dataToDisplay.find(
        (slot) => slot.appointment?.id === appointmentId
      );

      if (slotData?.appointment && openConfirmModal) {
        openConfirmModal({
          id: appointmentId,
          appointment: slotData.appointment,
          slotDate: slotData.slotDate,
        });
      }
    },
    [dataToDisplay, openConfirmModal]
  );

  const handleCancelClick = useCallback(
    (appointmentId: number) => {
      const slotData = dataToDisplay.find(
        (slot) => slot.appointment?.id === appointmentId
      );

      if (slotData?.appointment && openCancelModal) {
        openCancelModal({
          id: appointmentId,
          appointment: slotData.appointment,
          slotDate: slotData.slotDate,
        });
      }
    },
    [dataToDisplay, openCancelModal]
  );

  return {
    handleConfirmClick,
    handleCancelClick,
  };
};
