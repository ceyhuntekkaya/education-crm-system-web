"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentSlotCreateDto, AppointmentSlotDto } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Appointment Slot ekleme hook'u
 */
export const useAddSlot = () => {
  const router = useRouter();

  const {
    mutate: postSlot,
    loading: isLoading,
    error,
  } = usePost<AppointmentSlotDto, AppointmentSlotCreateDto>(
    API_ENDPOINTS.APPOINTMENTS.SLOT_CREATE,
    {
      onSuccess: (data) => {
        console.log("✅ onSuccess alanı -> Slot başarıyla eklendi:", data);
        // Appointment availability sayfasına yönlendir
        router.push("/company/appointment-availability");
      },
      onError: (error) => {
        console.log("❌ onError alanı -> Slot eklenirken hata:", error);
      },
    }
  );

  return {
    postSlot,
    isLoading,
    error,
  };
};
