"use client";

import { useGet, usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { useAuth } from "@/contexts";
import { useEffect, useState, useMemo } from "react";

/**
 * İki tarih arası Kurum slotları request DTO
 */
interface AppointmentSlotSearchRequest {
  startDate: string; // Format: "YYYY-MM-DD"
  endDate: string; // Format: "YYYY-MM-DD"
  schoolId: number;
}

interface UseAppointmentDataParams {
  schoolId: string | number;
  enabled?: boolean;
}

interface UseAppointmentDataReturn {
  // Slots data
  slots: AppointmentSlotDto[];
  slotsLoading: boolean;
  slotsError: string | null;
  refetchSlots: () => void;

  // Current appointment data
  currentAppointment: AppointmentSlotDto | null;
  currentAppointmentLoading: boolean;
  currentAppointmentError: string | null;
  refetchCurrentAppointment: () => void;

  // Utility
  hasCurrentAppointment: boolean;
  hasFutureAppointment: boolean;
}

/**
 * Ortak appointment data hook'u
 * Hem slots hem de mevcut randevu verilerini yönetir
 * Tekrarlanan API çağrılarını önler
 *
 * @param schoolId - Kurum ID
 * @param enabled - Hook'un çalışıp çalışmayacağı (default: true)
 * @returns Slot verileri, mevcut randevu ve yönetim fonksiyonları
 */
export const useAppointmentData = ({
  schoolId,
  enabled = true,
}: UseAppointmentDataParams): UseAppointmentDataReturn => {
  // useAuth'dan userId'yi al
  const { user } = useAuth();
  const userId = user?.id;

  // Slots state
  const [slots, setSlots] = useState<AppointmentSlotDto[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Slots API
  const { mutate: fetchSlots } = usePost<
    ApiResponseDto<AppointmentSlotDto[]>,
    AppointmentSlotSearchRequest
  >(API_ENDPOINTS.APPOINTMENTS.SLOTS_SEARCH_DATE, {
    showSnackbar: false,
    onSuccess: (response) => {
      if (response && response.success && Array.isArray(response.data)) {
        setSlots(response.data);
        setSlotsLoading(false);
        setSlotsError(null);
      } else {
        setSlots([]);
        setSlotsLoading(false);
        setSlotsError("Beklenmeyen veri formatı");
      }
    },
    onError: (error) => {
      setSlotsError(error || "Slotlar yüklenirken hata oluştu");
      setSlots([]);
      setSlotsLoading(false);
    },
  });

  // Current appointment API
  const endpoint = userId
    ? API_ENDPOINTS.APPOINTMENTS.CURRENT_APPOINTMENT(userId, schoolId)
    : null;

  const {
    data: appointmentResponse,
    loading: currentAppointmentLoading,
    error: currentAppointmentError,
    refetch: refetchCurrentAppointment,
  } = useGet<ApiResponseDto<AppointmentSlotDto[]>>(endpoint, {
    enabled: enabled && !!userId,
  });

  /**
   * Bugünden itibaren 10 gün için tarih aralığı hesapla
   */
  const getDateRange = () => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 10);

    return {
      startDate: today.toISOString().split("T")[0], // "YYYY-MM-DD"
      endDate: endDate.toISOString().split("T")[0], // "YYYY-MM-DD"
    };
  };

  /**
   * Slotları yeniden getir
   */
  const refetchSlots = () => {
    if (!schoolId || !enabled) return;

    setSlotsLoading(true);
    const { startDate, endDate } = getDateRange();

    fetchSlots({
      startDate,
      endDate,
      schoolId: Number(schoolId),
    });
  };

  /**
   * Component mount olduğunda ve schoolId değiştiğinde slotları getir
   */
  useEffect(() => {
    refetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolId, enabled]);

  /**
   * Mevcut randevu mantığı:
   * - API'den gelen slot'lar içinde appointment field'ı olan ve gelecek tarihli olanı bul
   * - appointment.appointmentDate + appointment.startTime kullanarak kontrol et
   */
  const currentAppointment = useMemo(() => {
    if (!appointmentResponse?.data || appointmentResponse.data.length === 0) {
      return null;
    }

    const now = new Date();

    // Gelecekteki randevuları filtrele
    const futureAppointments = appointmentResponse.data.filter((slot) => {
      // Appointment yoksa pas geç
      if (!slot.appointment || !slot.appointment.appointmentDate) {
        return false;
      }

      // appointmentDate + startTime ile tam datetime oluştur
      const { appointmentDate, startTime } = slot.appointment;
      const appointmentDateTime = startTime
        ? new Date(`${appointmentDate}T${startTime}`)
        : new Date(appointmentDate);

      // Gelecek tarihli mi kontrol et
      return appointmentDateTime > now;
    });

    // Gelecek randevu yoksa null dön
    if (futureAppointments.length === 0) {
      return null;
    }

    // En yakın gelecek randevuyu bul (tarihe göre sırala)
    futureAppointments.sort((a, b) => {
      const dateA = a.appointment?.startTime
        ? new Date(
            `${a.appointment.appointmentDate}T${a.appointment.startTime}`
          )
        : new Date(a.appointment?.appointmentDate || "");

      const dateB = b.appointment?.startTime
        ? new Date(
            `${b.appointment.appointmentDate}T${b.appointment.startTime}`
          )
        : new Date(b.appointment?.appointmentDate || "");

      return dateA.getTime() - dateB.getTime();
    });

    return futureAppointments[0];
  }, [appointmentResponse]);

  /**
   * Yardımcı boolean değerler
   */
  const hasCurrentAppointment = !!currentAppointment;
  const hasFutureAppointment = !!currentAppointment?.appointment;

  return {
    // Slots
    slots,
    slotsLoading,
    slotsError,
    refetchSlots,

    // Current appointment
    currentAppointment,
    currentAppointmentLoading,
    currentAppointmentError,
    refetchCurrentAppointment,

    // Utility
    hasCurrentAppointment,
    hasFutureAppointment,
  };
};
