"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { UserRegistrationDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { UserType } from "@/enums/UserType";
import { usePost } from "@/hooks/api";

/**
 * Teacher/Instructor Registration Hook
 * Tek hook ile hem teacher hem instructor kaydı
 */
export const useTeacherInstructorRegister = (
  registrationType: UserType.TEACHER | UserType.INSTRUCTOR,
) => {
  const router = useRouter();
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const endpoint =
    registrationType === UserType.TEACHER
      ? API_ENDPOINTS.USERS.REGISTER_TEACHER
      : API_ENDPOINTS.USERS.REGISTER_INSTRUCTOR;

  const { mutate: submitRegistration } = usePost<any, UserRegistrationDto>(
    endpoint,
  );

  const handleSubmit = useCallback(
    async (currentStep: number, nextStep: () => void) => {
      // Step 1: Sadece validation, nextStep
      if (currentStep === 1) {
        nextStep();
        return;
      }

      // Step 2: API'ye gönder
      if (currentStep === 2) {
        setIsLoading(true);

        const payload: UserRegistrationDto = {
          email: values?.loginCredentials?.email || "",
          password: values?.loginCredentials?.password || "",
          confirmPassword: values?.loginCredentials?.confirmPassword || "",
          firstName: values?.personalInfo?.firstName || "",
          lastName: values?.personalInfo?.lastName || "",
          phone: values?.personalInfo?.phone || "",
          userType: "INSTITUTION_USER", // TODO: INSTITUTION_USER yerine TEACHER veya INSTRUCTOR eklenecek
          // userType:
          //   registrationType === UserType.TEACHER
          //     ? UserType.TEACHER
          //     : UserType.INSTRUCTOR,
        };

        try {
          // usePost/executeMutation backend { success, message, data } cevabını açıp
          // sadece data (kullanıcı objesi) döndürüyor; success alanı gelmez.
          const response = await submitRegistration(payload);

          if (response != null) {
            showSnackbar(
              registrationType === UserType.TEACHER
                ? "Öğretmen kaydı başarılı. Profil oluşturmak için giriş yapabilirsiniz."
                : "Eğitmen kaydı başarılı. Giriş yapabilirsiniz.",
              "success",
            );
            nextStep(); // Success step'e geç
          } else {
            showSnackbar("Kayıt işlemi başarısız oldu", "error");
          }
        } catch (error) {
          showSnackbar("Kayıt işlemi sırasında bir hata oluştu", "error");
        } finally {
          setIsLoading(false);
        }
      }

      // Step 3: Success - login'e yönlendir
      if (currentStep === 3) {
        router.push("/auth/login");
      }
    },
    [values, submitRegistration, showSnackbar, registrationType, router],
  );

  return {
    handleSubmit,
    isLoading,
  };
};
