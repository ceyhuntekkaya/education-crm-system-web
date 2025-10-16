import { useState, useMemo } from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

/**
 * Hook for managing frontend appointment filtering
 */
export const useAppointmentDetailsFilter = (appointments: AppointmentDto[]) => {
  const [appointmentFilters, setFilters] = useState<any>({});

  // Frontend tabanlı filtreleme
  const filteredAppointments = useMemo(() => {
    if (!appointments || appointments.length === 0) {
      return [];
    }

    // Eğer hiç filtre yoksa tüm listeyi döndür
    if (!appointmentFilters || Object.keys(appointmentFilters).length === 0) {
      return appointments;
    }

    return appointments.filter((appointment) => {
      // Temel randevu bilgileri
      if (appointmentFilters.title) {
        const searchTerm = appointmentFilters.title.toLowerCase();
        const title = (appointment.title || "").toLowerCase();
        if (!title.includes(searchTerm)) {
          return false;
        }
      }

      if (appointmentFilters.appointmentNumber) {
        const searchTerm = appointmentFilters.appointmentNumber.toLowerCase();
        const appointmentNum = (
          appointment.appointmentNumber || ""
        ).toLowerCase();
        if (!appointmentNum.includes(searchTerm)) {
          return false;
        }
      }

      // Okul bilgileri
      if (appointmentFilters.schoolName) {
        const searchTerm = appointmentFilters.schoolName.toLowerCase();
        const schoolName = (appointment.schoolName || "").toLowerCase();
        if (!schoolName.includes(searchTerm)) {
          return false;
        }
      }

      if (appointmentFilters.campusName) {
        const searchTerm = appointmentFilters.campusName.toLowerCase();
        const campusName = (appointment.campusName || "").toLowerCase();
        if (!campusName.includes(searchTerm)) {
          return false;
        }
      }

      // Kişi bilgileri
      if (appointmentFilters.parentName) {
        const searchTerm = appointmentFilters.parentName.toLowerCase();
        // parentName veya parentUserName field'larını kontrol et
        const parentName = (
          appointment.parentName ||
          appointment.parentUserName ||
          ""
        ).toLowerCase();
        if (!parentName.includes(searchTerm)) {
          return false;
        }
      }

      if (appointmentFilters.studentName) {
        const searchTerm = appointmentFilters.studentName.toLowerCase();
        const studentName = (appointment.studentName || "").toLowerCase();
        if (!studentName.includes(searchTerm)) {
          return false;
        }
      }

      if (appointmentFilters.staffUserName) {
        const searchTerm = appointmentFilters.staffUserName.toLowerCase();
        const staffName = (appointment.staffUserName || "").toLowerCase();
        if (!staffName.includes(searchTerm)) {
          return false;
        }
      }

      // Durum filtreleri (string values, not arrays)
      if (appointmentFilters.appointmentType) {
        if (
          appointment.appointmentType !== appointmentFilters.appointmentType
        ) {
          return false;
        }
      }

      if (appointmentFilters.status) {
        if (appointment.status !== appointmentFilters.status) {
          return false;
        }
      }

      if (appointmentFilters.outcome) {
        if (appointment.outcome !== appointmentFilters.outcome) {
          return false;
        }
      }

      // Tarih filtreleri
      if (appointmentFilters.appointmentDate) {
        if (
          appointment.appointmentDate !== appointmentFilters.appointmentDate
        ) {
          return false;
        }
      }

      if (appointmentFilters.startDate && appointment.appointmentDate) {
        if (appointment.appointmentDate < appointmentFilters.startDate) {
          return false;
        }
      }

      if (appointmentFilters.endDate && appointment.appointmentDate) {
        if (appointment.appointmentDate > appointmentFilters.endDate) {
          return false;
        }
      }

      // Zaman aralığı filtreleri
      if (appointmentFilters.startTime && appointment.startTime) {
        if (appointment.startTime < appointmentFilters.startTime) {
          return false;
        }
      }

      if (appointmentFilters.endTime && appointment.endTime) {
        if (appointment.endTime > appointmentFilters.endTime) {
          return false;
        }
      }

      // Konum filtreleri
      if (appointmentFilters.location) {
        const searchTerm = appointmentFilters.location.toLowerCase();
        const location = (appointment.location || "").toLowerCase();
        if (!location.includes(searchTerm)) {
          return false;
        }
      }

      // Boolean filtreleri
      if (appointmentFilters.isOnline !== undefined) {
        if (appointment.isOnline !== appointmentFilters.isOnline) {
          return false;
        }
      }

      if (appointmentFilters.followUpRequired !== undefined) {
        if (
          appointment.followUpRequired !== appointmentFilters.followUpRequired
        ) {
          return false;
        }
      }

      return true;
    });
  }, [appointments, appointmentFilters]);

  const setAppointmentFilters = (filters: any) => {
    setFilters(filters);
  };

  const clearAppointmentFilters = () => {
    setFilters({});
  };

  return {
    appointmentFilters,
    filteredAppointments,
    setAppointmentFilters,
    clearAppointmentFilters,
  };
};
