import { useState, useMemo } from "react";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";

/**
 * Hook for managing frontend appointment slot filtering
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
      // Okul bilgileri
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
      if (appointmentFilters.dayOfWeek) {
        if (slot.dayOfWeek !== appointmentFilters.dayOfWeek) {
          return false;
        }
      }

      // Zaman aralığı filtreleri
      if (appointmentFilters.startTime && slot.startTime) {
        if (slot.startTime < appointmentFilters.startTime) {
          return false;
        }
      }

      if (appointmentFilters.endTime && slot.endTime) {
        if (slot.endTime > appointmentFilters.endTime) {
          return false;
        }
      }

      // Randevu tipi filtreleri
      if (appointmentFilters.appointmentType) {
        if (slot.appointmentType !== appointmentFilters.appointmentType) {
          return false;
        }
      }

      // Başlık filtreleri
      if (appointmentFilters.title) {
        const searchTerm = appointmentFilters.title.toLowerCase();
        const title = (slot.title || "").toLowerCase();
        if (!title.includes(searchTerm)) {
          return false;
        }
      }

      // Konum filtreleri
      if (appointmentFilters.location) {
        const searchTerm = appointmentFilters.location.toLowerCase();
        const location = (slot.location || "").toLowerCase();
        if (!location.includes(searchTerm)) {
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

      if (appointmentFilters.isRecurring !== undefined) {
        if (slot.isRecurring !== appointmentFilters.isRecurring) {
          return false;
        }
      }

      if (appointmentFilters.isActive !== undefined) {
        if (slot.isActive !== appointmentFilters.isActive) {
          return false;
        }
      }

      // Kapasite filtreleri
      if (appointmentFilters.minCapacity !== undefined) {
        if (!slot.capacity || slot.capacity < appointmentFilters.minCapacity) {
          return false;
        }
      }

      if (appointmentFilters.minAvailableCapacity !== undefined) {
        if (
          slot.availableCapacity === undefined ||
          slot.availableCapacity < appointmentFilters.minAvailableCapacity
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
