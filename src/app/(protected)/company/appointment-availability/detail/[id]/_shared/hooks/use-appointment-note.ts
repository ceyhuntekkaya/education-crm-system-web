"use client";

import { useState } from "react";
import { usePost } from "@/hooks";
import { useAuth } from "@/contexts";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";
import { AppointmentNoteDto } from "@/types/dto/appointment/AppointmentNoteDto";

/**
 * Appointment note ekleme hook'u
 */
export const useAddAppointmentNote = (appointmentId: number) => {
  const { user } = useAuth();
  const {
    mutate: postNote,
    loading: isLoading,
    error,
  } = usePost<AppointmentNoteDto, AppointmentNoteCreateDto>(
    API_ENDPOINTS.APPOINTMENTS.NOTES(appointmentId)
  );

  const addNote = async (
    noteData: Omit<AppointmentNoteCreateDto, "appointmentId" | "authorUserId">
  ): Promise<boolean> => {
    try {
      // Auth context'ten kullanıcı ID'si al
      if (!user?.id) {
        console.error("Kullanıcı bilgisi bulunamadı");
        return false;
      }

      // API çağrısı için tam createDto oluştur
      const createDto: AppointmentNoteCreateDto = {
        ...noteData,
        appointmentId,
        authorUserId: user.id,
      };

      // POST isteği gönder
      const result = await postNote(createDto);

      // Başarılı olursa true döndür
      return result !== null;
    } catch (err) {
      console.error("Not eklenirken hata oluştu:", err);
      return false;
    }
  };

  return {
    addNote,
    isLoading,
    error,
  };
};
