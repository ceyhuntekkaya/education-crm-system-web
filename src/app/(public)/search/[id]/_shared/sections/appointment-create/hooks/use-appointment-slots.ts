"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS, ApiResponse } from "@/lib";
import { AppointmentSlotDto } from "@/types";
import { useEffect, useState } from "react";

/**
 * İki tarih arası okul slotları request DTO
 */
interface AppointmentSlotSearchRequest {
  startDate: string; // Format: "YYYY-MM-DD"
  endDate: string; // Format: "YYYY-MM-DD"
  schoolId: number;
}

/**
 * API Response wrapper - Backend'den gelen standart response yapısı
 */


interface UseAppointmentSlotsProps {
  schoolId: number;
  enabled?: boolean; // Hook'u aktif etmek için
}

interface UseAppointmentSlotsReturn {
  slots: AppointmentSlotDto[];
  slotsLoading: boolean;
  slotsError: string | null;
  refetchSlots: () => void;
}

/**
 * İki tarih arası okul slotlarını getiren hook
 * Bugünden itibaren 10 gün için slotları getirir
 *
 * @param schoolId - Okul ID
 * @param enabled - Hook'un çalışıp çalışmayacağı (default: true)
 * @returns Slot verileri ve yönetim fonksiyonları
 */
export const useAppointmentSlots = ({
  schoolId,
  enabled = true,
}: UseAppointmentSlotsProps): UseAppointmentSlotsReturn => {
  const [slots, setSlots] = useState<AppointmentSlotDto[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const { mutate: fetchSlots } = usePost<
    ApiResponse<AppointmentSlotDto[]>,
    AppointmentSlotSearchRequest
  >(API_ENDPOINTS.APPOINTMENTS.SLOTS_SEARCH_DATE, {
    showSnackbar: false, // ⚠️ Snackbar gösterimini kapat
    onSuccess: (response) => {
      console.log("✅ Slot API Response:", response);

      // Backend'den gelen response yapısını kontrol et
      if (response && response.success && Array.isArray(response.data)) {
        console.log("✅ Slotlar başarıyla getirildi:", response.data);
        setSlots(response.data);
        setSlotsLoading(false);
        setSlotsError(null);
      } else {
        console.warn("⚠️ Beklenmeyen response formatı:", response);
        setSlots([]);
        setSlotsLoading(false);
        setSlotsError("Beklenmeyen veri formatı");
      }
    },
    onError: (error) => {
      console.error("❌ Slot getirme hatası:", error);
      setSlotsError(error || "Slotlar yüklenirken hata oluştu");
      setSlots([]);
      setSlotsLoading(false);
    },
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
      schoolId,
    });
  };

  /**
   * Component mount olduğunda ve schoolId değiştiğinde slotları getir
   */
  useEffect(() => {
    refetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolId, enabled]);

  return {
    slots,
    slotsLoading,
    slotsError,
    refetchSlots,
  };
};
