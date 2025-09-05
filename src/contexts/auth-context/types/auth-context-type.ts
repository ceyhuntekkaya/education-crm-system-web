import { AuthenticationRequest, UserDto } from "@/types";

export interface AuthContextType {
  user: UserDto | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  login: (formData: AuthenticationRequest) => void;
  logout: () => void;
  isAuthenticated: boolean;
  currentRole: string;
  currentDepartments: string[];
  currentPermissions: string[];
  accessToken: string | null;
}
