"use client";

import { usePost } from "@/hooks";
import { useAuth } from "@/contexts";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";
import { AppointmentNoteDto } from "@/types/dto/appointment/AppointmentNoteDto";

/**
 * Appointment note ekleme hook'u
 */
export const useAddAppointmentNote = (
  appointmentId: number,
  refetchNotes?: () => void
) => {
  const { user } = useAuth();
  const {
    mutate: postNote,
    loading: isLoading,
    error,
  } = usePost<AppointmentNoteDto, AppointmentNoteCreateDto>(
    API_ENDPOINTS.APPOINTMENTS.NOTES(appointmentId),
    {
      onSuccess: () => {
        refetchNotes?.();
      },
    }
  );

  const addNote = async (
    noteData: Omit<AppointmentNoteCreateDto, "appointmentId" | "authorUserId">
  ): Promise<boolean> => {
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

    // POST isteği gönder - usePost kendi onSuccess callback'ini çağıracak
    const result = await postNote(createDto);

    // usePost null döndürürse başarısız, data döndürürse başarılı
    return result !== null;
  };

  return {
    addNote,
    isLoading,
    error,
  };
};
