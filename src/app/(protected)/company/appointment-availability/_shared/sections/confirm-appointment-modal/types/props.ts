import { SelectedAppointment } from "../../../types/appointment.types";

export interface ConfirmAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  selectedAppointment: SelectedAppointment | null;
  onConfirm: (appointmentId: number, confirmedBy: number) => Promise<void>;
  loading?: boolean;
}

export interface ConfirmAppointmentFormContentProps {
  onConfirm: (appointmentId: number, confirmedBy: number) => Promise<void>;
  loading?: boolean;
  onClose: () => void;
}
