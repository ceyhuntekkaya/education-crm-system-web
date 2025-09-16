import { useState, useEffect, useCallback } from "react";
import { AppointmentDto } from "@/types/dto/appointment";
import { AppointmentStatus } from "@/enums/AppointmentStatus";
import {
  UseAppointmentsOptions,
  UseAppointmentsReturn,
} from "../types/appointment-table-types";
import { mockAppointments } from "../mock/appointment-mock-data";

export const useAppointments = ({
  schoolId,
  initialAppointments = [],
  autoRefresh = false,
  refreshInterval = 30000,
}: UseAppointmentsOptions = {}): UseAppointmentsReturn => {
  const [appointments, setAppointments] =
    useState<AppointmentDto[]>(mockAppointments); // Mock data ile başla
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Gerçek API çağrısı burada olacak
      // const appointmentService = new AppointmentService();
      // const result = await appointmentService.searchAppointments({ schoolId });

      // Şimdilik mock data kullanıyoruz
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      setAppointments(mockAppointments);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Randevular yüklenirken hata oluştu"
      );
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAppointmentStatus = async (
    appointmentId: number,
    status: AppointmentStatus
  ): Promise<void> => {
    try {
      // Gerçek API çağrısı burada olacak
      // const appointmentService = new AppointmentService();
      // await appointmentService.updateAppointment(appointmentId, { status });

      // Mock update
      setAppointments((prev) =>
        prev.map((app) => (app.id === appointmentId ? { ...app, status } : app))
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Randevu durumu güncellenirken hata oluştu"
      );
      throw err;
    }
  };

  const deleteAppointment = async (appointmentId: number): Promise<void> => {
    try {
      // Gerçek API çağrısı burada olacak
      // const appointmentService = new AppointmentService();
      // await appointmentService.deleteAppointment(appointmentId);

      // Mock delete
      setAppointments((prev) => prev.filter((app) => app.id !== appointmentId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Randevu silinirken hata oluştu"
      );
      throw err;
    }
  };

  const refresh = async (): Promise<void> => {
    await fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchAppointments, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    refresh,
    updateAppointmentStatus,
    deleteAppointment,
  };
};
