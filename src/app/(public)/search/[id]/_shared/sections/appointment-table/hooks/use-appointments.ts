import { useState, useEffect, useCallback } from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { mockAppointments } from "../mock";

interface UseAppointmentsProps {
  schoolId?: number;
  status?: string;
  limit?: number;
}

interface UseAppointmentsReturn {
  appointments: AppointmentDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useAppointments = ({
  schoolId,
  status,
  limit = 50,
}: UseAppointmentsProps = {}): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filter mock data based on parameters
      let filteredAppointments = mockAppointments;

      // if (schoolId) {
      //   filteredAppointments = filteredAppointments.filter(
      //     (apt: AppointmentDto) => apt.schoolId === schoolId
      //   );
      // }

      // if (status) {
      //   filteredAppointments = filteredAppointments.filter(
      //     (apt: AppointmentDto) => apt.status === status
      //   );
      // }

      // if (limit) {
      //   filteredAppointments = filteredAppointments.slice(0, limit);
      // }

      setAppointments(filteredAppointments);
    } catch (err) {
      setError("Randevular yüklenirken bir hata oluştu");
      console.error("Appointment fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = () => {
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    refetch,
  };
};
