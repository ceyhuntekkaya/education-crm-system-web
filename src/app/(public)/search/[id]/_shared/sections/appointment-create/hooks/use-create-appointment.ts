"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentDto } from "@/types";

/**
 * Randevu oluşturma request DTO
 */
export interface AppointmentCreateRequestDto {
  appointmentSlotId: number;
  schoolId: number;
  parentUserId?: number;

  appointmentType:
    | "INFORMATION_MEETING"
    | "SCHOOL_TOUR"
    | "ENROLLMENT_INTERVIEW"
    | "PARENT_MEETING"
    | "CONSULTATION"
    | "ASSESSMENT"
    | "ORIENTATION"
    | "ONLINE_MEETING"
    | "PHONE_CALL"
    | "GROUP_MEETING"
    | "OTHER";
  isOnline?: boolean;

  studentName: string;
  studentAge?: number;
  studentBirthDate?: string; // Format: "YYYY-MM-DD"
  studentGender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  currentSchool?: string;
  gradeInterested?: string;

  specialRequests?: string;
  notes?: string;
}

interface UseCreateAppointmentReturn {
  createAppointment: (data: AppointmentCreateRequestDto) => void;
  isCreating: boolean;
  creationError: string | null;
  createdAppointment: AppointmentDto | null;
}

/**
 * Randevu oluşturma hook'u
 *
 * @param onSuccess - Başarılı oluşturma callback'i
 * @param onError - Hata callback'i
 * @returns Randevu oluşturma fonksiyonları
 */
export const useCreateAppointment = (
  onSuccess?: (appointment: AppointmentDto) => void,
  onError?: (error: string) => void
): UseCreateAppointmentReturn => {
  const {
    mutate: createAppointmentMutation,
    loading: isCreating,
    error: creationError,
    data: createdAppointment,
  } = usePost<AppointmentDto, AppointmentCreateRequestDto>(
    API_ENDPOINTS.APPOINTMENTS.CREATE,
    {
      onSuccess: (data) => {
        console.log("✅ Randevu başarıyla oluşturuldu:", data);
        onSuccess?.(data);
      },
      onError: (error) => {
        console.error("❌ Randevu oluşturma hatası:", error);
        onError?.(error);
      },
    }
  );

  return {
    createAppointment: createAppointmentMutation,
    isCreating,
    creationError,
    createdAppointment: createdAppointment || null,
  };
};
