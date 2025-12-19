"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentSlotCreateDto, AppointmentSlotDto } from "@/types";
import { useRouter } from "next/navigation";

interface UseEditSlotProps {
  slotId: number;
  refetch?: () => void;
}

/**
 * Slot güncelleme hook'u
 */
export const useEditSlot = ({ slotId, refetch }: UseEditSlotProps) => {
  const router = useRouter();

  const {
    mutate: putSlot,
    loading: isLoading,
    error,
  } = usePut<AppointmentSlotDto, AppointmentSlotCreateDto>(
    API_ENDPOINTS.APPOINTMENTS.SLOT_UPDATE(slotId),
    {
      onSuccess: (data) => {
        // console.log("✅ onSuccess alanı -> Slot başarıyla güncellendi:", data);

        // Refetch varsa çağır
        if (refetch) {
          refetch();
        }

        // Appointment availability sayfasına yönlendir
        router.push("/company/appointment-availability");
      },
      onError: (error) => {
        // console.log("❌ onError alanı -> Slot güncellenirken hata:", error);
      },
    }
  );

  return {
    putSlot,
    isLoading,
    error,
  };
};
