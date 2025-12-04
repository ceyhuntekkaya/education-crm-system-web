import { useState, useMemo } from "react";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";

/**
 * Hook for managing frontend appointment slot filtering
 * Yeni AppointmentSlotDto yapısına göre güncellenmiş
 */
export const useAppointmentDetailsFilter = (slots: AppointmentSlotDto[]) => {
  const [appointmentFilters, setFilters] = useState<any>({});

  // Frontend tabanlı filtreleme
  const filteredAppointments = useMemo(() => {
    if (!slots || slots.length === 0) {
      return [];
    }

    // Eğer hiç filtre yoksa tüm listeyi döndür
    if (!appointmentFilters || Object.keys(appointmentFilters).length === 0) {
      return slots;
    }

    return slots.filter((slot) => {
      // Kurum bilgileri
      if (appointmentFilters.schoolName) {
        const searchTerm = appointmentFilters.schoolName.toLowerCase();
        const schoolName = (slot.schoolName || "").toLowerCase();
        if (!schoolName.includes(searchTerm)) {
          return false;
        }
      }

      // Personel bilgileri
      if (appointmentFilters.staffUserName) {
        const searchTerm = appointmentFilters.staffUserName.toLowerCase();
        const staffName = (slot.staffUserName || "").toLowerCase();
        if (!staffName.includes(searchTerm)) {
          return false;
        }
      }

      // Gün filtreleri
      if (appointmentFilters.dayOfWeekName) {
        const searchTerm = appointmentFilters.dayOfWeekName.toLowerCase();
        const dayName = (slot.dayOfWeekName || "").toLowerCase();
        if (!dayName.includes(searchTerm)) {
          return false;
        }
      }

      // Slot tarih filtreleri
      if (appointmentFilters.slotDateStart && slot.slotDate) {
        if (slot.slotDate < appointmentFilters.slotDateStart) {
          return false;
        }
      }

      if (appointmentFilters.slotDateEnd && slot.slotDate) {
        if (slot.slotDate > appointmentFilters.slotDateEnd) {
          return false;
        }
      }

      if (appointmentFilters.slotDate && slot.slotDate) {
        if (
          !slot.slotDate.includes(appointmentFilters.slotDate.substring(0, 10))
        ) {
          return false;
        }
      }

      // Randevu tipi filtreleri
      if (appointmentFilters.appointmentType) {
        if (slot.appointmentType !== appointmentFilters.appointmentType) {
          return false;
        }
      }

      // Süre filtresi
      if (appointmentFilters.durationMinutes !== undefined) {
        if (slot.durationMinutes !== appointmentFilters.durationMinutes) {
          return false;
        }
      }

      // Müsaitlik durumu
      if (appointmentFilters.isAvailable !== undefined) {
        if (slot.isAvailable !== appointmentFilters.isAvailable) {
          return false;
        }
      }

      // Boolean filtreleri
      if (appointmentFilters.onlineMeetingAvailable !== undefined) {
        if (
          slot.onlineMeetingAvailable !==
          appointmentFilters.onlineMeetingAvailable
        ) {
          return false;
        }
      }

      if (appointmentFilters.requiresApproval !== undefined) {
        if (slot.requiresApproval !== appointmentFilters.requiresApproval) {
          return false;
        }
      }

      if (appointmentFilters.isActive !== undefined) {
        if (slot.isActive !== appointmentFilters.isActive) {
          return false;
        }
      }

      // Randevu bilgileri (appointment içinden)
      if (slot.appointment) {
        const appointment = slot.appointment;

        // Randevu numarası
        if (appointmentFilters.appointmentNumber) {
          const searchTerm = appointmentFilters.appointmentNumber.toLowerCase();
          const appointmentNumber = (
            appointment.appointmentNumber || ""
          ).toLowerCase();
          if (!appointmentNumber.includes(searchTerm)) {
            return false;
          }
        }

        // Randevu durumu
        if (appointmentFilters.appointmentStatus) {
          if (appointment.status !== appointmentFilters.appointmentStatus) {
            return false;
          }
        }

        // Randevu sonucu
        if (appointmentFilters.appointmentOutcome) {
          if (appointment.outcome !== appointmentFilters.appointmentOutcome) {
            return false;
          }
        }

        // Veli adı
        if (appointmentFilters.parentName) {
          const searchTerm = appointmentFilters.parentName.toLowerCase();
          const parentName = (appointment.parentUserName || "").toLowerCase();
          if (!parentName.includes(searchTerm)) {
            return false;
          }
        }

        // Öğrenci adı
        if (appointmentFilters.studentName) {
          const searchTerm = appointmentFilters.studentName.toLowerCase();
          const studentName = (appointment.studentName || "").toLowerCase();
          if (!studentName.includes(searchTerm)) {
            return false;
          }
        }

        // Randevu tarihi
        if (appointmentFilters.appointmentDate && appointment.appointmentDate) {
          if (
            !appointment.appointmentDate.includes(
              appointmentFilters.appointmentDate
            )
          ) {
            return false;
          }
        }
      } else {
        // Eğer appointment yoksa ve appointment ile ilgili filtre varsa, bu slot'u gösterme
        if (
          appointmentFilters.appointmentNumber ||
          appointmentFilters.appointmentStatus ||
          appointmentFilters.appointmentOutcome ||
          appointmentFilters.parentName ||
          appointmentFilters.studentName ||
          appointmentFilters.appointmentDate
        ) {
          return false;
        }
      }

      return true;
    });
  }, [slots, appointmentFilters]);

  const setAppointmentFilters = (filters: any) => {
    setFilters(filters);
  };

  const clearAppointmentFilters = () => {
    setFilters({});
  };

  const removeAppointmentFilter = (key: string) => {
    setFilters((prevFilters: any) => {
      const newFilters = { ...prevFilters };
      delete newFilters[key];
      return newFilters;
    });
  };

  return {
    appointmentFilters,
    filteredAppointments,
    setAppointmentFilters,
    clearAppointmentFilters,
    removeAppointmentFilter,
  };
};
