import { useMemo } from "react";
import { createAppointmentColumns } from "../config/appointment-columns";
import type { SelectedAppointment } from "../types";

interface UseAppointmentTableColumnsProps {
  onConfirm: (appointmentId: number) => void;
  onCancel: (appointmentId: number) => void;
  confirmLoading?: boolean;
  cancelLoading?: boolean;
  selectedAppointment?: SelectedAppointment | null;
}

export const useAppointmentTableColumns = ({
  onConfirm,
  onCancel,
  confirmLoading,
  cancelLoading,
  selectedAppointment,
}: UseAppointmentTableColumnsProps) => {
  const columns = useMemo(
    () =>
      createAppointmentColumns({
        onConfirm,
        onCancel,
        confirmLoading: confirmLoading ? selectedAppointment?.id ?? null : null,
        cancelLoading: cancelLoading ? selectedAppointment?.id ?? null : null,
      }),
    [onConfirm, onCancel, confirmLoading, cancelLoading, selectedAppointment]
  );

  return columns;
};
