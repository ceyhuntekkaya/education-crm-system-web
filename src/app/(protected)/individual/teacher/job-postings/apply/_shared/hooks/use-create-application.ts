"use client";

import { useCreateApplication } from "@/app/(protected)/individual/teacher/job-postings/_shared/hooks/api";
import { useSnackbar } from "@/contexts";
import type { ApplicationCreateDto } from "@/types";

/**
 * Başvuru oluşturma hook'u
 */
export const useCreateApplicationForm = () => {
  const { mutate: createApplication, loading, error } = useCreateApplication();
  const { showSnackbar } = useSnackbar();

  const submitApplication = async (
    data: ApplicationCreateDto,
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      createApplication(data, {
        onSuccess: (response) => {
          showSnackbar("Başvurunuz başarıyla gönderildi", "success");
          resolve(response);
        },
        onError: (errorMsg: string) => {
          showSnackbar(errorMsg || "Başvuru gönderilemedi", "error");
          reject(new Error(errorMsg));
        },
      });
    });
  };

  return {
    submitApplication,
    submitting: loading,
  };
};
