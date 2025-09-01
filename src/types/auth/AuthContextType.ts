import { UserDto } from "@/types/user/UserDto";
import { LoginRequest } from "./LoginRequest";

export interface AuthContextType {
  user: UserDto | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  login: (formData: LoginRequest) => void;
  logout: () => void;
  isAuthenticated: boolean;
  currentRole: string;
  currentDepartments: string[];
  currentPermissions: string[];
  accessToken: string | null;
}
