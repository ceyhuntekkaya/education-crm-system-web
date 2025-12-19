import { usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { AuthenticationRequest, AuthenticationResponse } from "@/types";
import { UserDto } from "@/types/dto/user/UserDto";

interface UseAuthLoginProps {
  onLoginSuccess: (data: AuthenticationResponse) => void;
  onLoginError: (error: any) => void;
}

export function useAuthLogin({ onLoginSuccess, onLoginError }: UseAuthLoginProps) {
  const {
    submitForm: login,
    loading: loginLoading,
    error: loginError,
  } = usePostForm<AuthenticationRequest, AuthenticationResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    {
      onSuccess: (data) => {
        // console.log("login başarılı:", data);
        onLoginSuccess(data);
      },
      onError: (err) => {
        const msg = typeof err === "string" ? err : String(err);
        console.error("Login hatası:", {
          error: err,
          message: msg,
          timestamp: new Date().toISOString(),
        });
        onLoginError(err);
      },
    }
  );

  return {
    login,
    loginLoading,
    loginError,
  };
}
