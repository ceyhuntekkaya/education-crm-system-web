import { useState, useCallback } from "react";
import { useAuth } from "@/contexts";
import { useCompany } from "../../../../../_shared/context";
import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";

interface SubmitSurveyParams {
  surveyId: number;
  appointmentId: string;
}

interface SubmitSurveyPayload {
  surveyId: number;
  appointmentId: string;
  schoolId: number;
  userId: number;
}

interface UseSubmitSurveyReturn {
  submitSurvey: (params: SubmitSurveyParams) => Promise<boolean>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Anket gönderimi için hook
 * API hazır olduğunda usePost hook'u aktif edilecek
 */
export const useSubmitSurvey = (
  onSuccess?: () => void
): UseSubmitSurveyReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const { selectedSchool } = useCompany();

  // API kullanımı için hazır yapı
  // const { post, loading: isPostLoading, error: postError } = usePost(
  //   API_ENDPOINTS.SURVEYS.SUBMIT
  // );

  const submitSurvey = useCallback(
    async ({ surveyId, appointmentId }: SubmitSurveyParams) => {
      setIsLoading(true);
      setError(null);

      try {
        const payload: SubmitSurveyPayload = {
          surveyId,
          appointmentId: appointmentId,
          schoolId: selectedSchool?.id || 0,
          userId: user?.id || 0,
        };

        // API çağrısı için hazır kod (şu an comment)
        // const response = await post(payload);
        // if (!response.success) {
        //   throw new Error(response.message || 'Anket gönderilemedi');
        // }

        // Mock implementation - API hazır olduğunda silinecek
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Survey submitted (MOCK):", payload);

        if (onSuccess) {
          onSuccess();
        }

        return true;
      } catch (err) {
        const errorObj =
          err instanceof Error ? err : new Error("Anket gönderilemedi");
        setError(errorObj);
        throw errorObj;
      } finally {
        setIsLoading(false);
      }
    },
    [selectedSchool?.id, user?.id, onSuccess]
  );

  return {
    submitSurvey,
    isLoading,
    error,
  };
};
