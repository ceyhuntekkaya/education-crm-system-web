"use client";

import { useMemo } from "react";
import { useData } from "@/contexts";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";

interface UseAppointmentsProps {
  schoolId?: number;
  status?: string;
  limit?: number;
}

interface UseAppointmentsReturn {
  appointments: AppointmentDto[];
  slots: AppointmentSlotDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Kullanıcının randevularını getiren hook
 * Global context'ten veri çeker ve filtreleme yapar
 * @param options - Filtreleme seçenekleri (schoolId, status, limit)
 * @returns Randevu verileri ve yönetim fonksiyonları
 */
export const useAppointments = ({
  schoolId,
  status,
  limit,
}: UseAppointmentsProps = {}): UseAppointmentsReturn => {
  const {
    appointmentSlots: slots,
    appointmentsLoading: loading,
    appointmentsError: error,
    refetchAppointments: refetch,
  } = useData();

  // Filtrelenmiş randevular - sadece appointment objesi olanlar
  const appointments = useMemo(() => {
    // Slot'lardan appointment bilgilerini çıkar ve slot bilgileriyle birleştir
    let filtered = slots
      .filter((slot) => slot.appointment) // Sadece appointment'ı olanlar
      .map((slot) => ({
        ...slot.appointment!,
        // Slot bilgilerini de ekle - appointment'ta null olan alanları slot'tan al
        slotDate: slot.slotDate,
        dayOfWeekName: slot.dayOfWeekName,
        // Eğer appointment'ta staffUserName null ise, slot'tan al
        staffUserId: slot.appointment!.staffUserId ?? slot.staffUserId,
        staffUserName: slot.appointment!.staffUserName ?? slot.staffUserName,
      }));

    // schoolId filtresi
    if (schoolId) {
      filtered = filtered.filter((apt) => apt.schoolId === schoolId);
    }

    // status filtresi
    if (status) {
      filtered = filtered.filter((apt) => apt.status === status);
    }

    // limit filtresi
    if (limit && filtered.length > limit) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }, [slots, schoolId, status, limit]);

  return {
    appointments,
    slots,
    loading,
    error,
    refetch,
  };
};
