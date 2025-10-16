"use client";

import { useState } from "react";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";

/**
 * Appointment note ekleme hook'u
 */
export const useAppointmentNote = (appointmentId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addNote = async (
    noteData: Omit<AppointmentNoteCreateDto, "appointmentId" | "authorUserId">
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // API çağrısı - gerçek API endpoint'i ile değiştirilecek
      const createDto: AppointmentNoteCreateDto = {
        ...noteData,
        appointmentId,
        // authorUserId buradan set edilecek veya API'da otomatik ayarlanacak
      };

      // Simüle edilmiş API çağrısı
      console.log("Adding note:", createDto);

      // Gerçek API çağrısı:
      // const response = await appointmentService.addAppointmentNote(appointmentId, createDto);

      // Başarılı
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simülasyon için

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Not eklenirken bir hata oluştu";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addNote,
    isLoading,
    error,
  };
};
