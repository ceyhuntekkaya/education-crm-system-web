"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useTeacherEventsContext } from "@/app/(protected)/individual/teacher/events/_shared/contexts/events-context";
import type { ApiResponseEventRegistrationDto } from "@/app/(protected)/individual/teacher/events/_shared/types/api-response.types";
import type { EventRegistrationCreateDto } from "@/types";

/**
 * Etkinliğe kayıt oluşturma hook'u
 */
export const useCreateRegistrationForm = () => {
  const { showSnackbar } = useSnackbar();
  const { refetchRegistrations } = useTeacherEventsContext();
  const { mutate: createRegistration, loading: submitting } = usePost<
    ApiResponseEventRegistrationDto,
    EventRegistrationCreateDto
  >(API_ENDPOINTS.WEBINAR.REGISTRATIONS.CREATE);

  const submitRegistration = async (
    data: EventRegistrationCreateDto,
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      createRegistration(data, {
        showSnackbar: false,
        onSuccess: () => {
          showSnackbar("Etkinliğe başarıyla kayıt oldunuz!", "success");
          refetchRegistrations();
          resolve(true);
        },
        onError: (errorMsg: string) => {
          showSnackbar(errorMsg || "Kayıt sırasında bir hata oluştu.", "error");
          resolve(false);
        },
      });
    });
  };

  return { submitRegistration, submitting };
};
