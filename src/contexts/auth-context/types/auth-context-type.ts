import { AuthenticationRequest, UserDto } from "@/types";
import { SchoolDto } from "@/types/dto/institution/SchoolDto";

export interface AuthContextType {
  user: UserDto | null;
  setUser: (user: UserDto | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  login: (formData: AuthenticationRequest) => void;
  logout: () => void;
  isAuthenticated: boolean;
  currentRole: string;
  currentDepartments: string[];
  currentPermissions: string[];
  accessToken: string | null;
  updateUserSchools: (school: SchoolDto, variant?: "add" | "edit") => void;
}
