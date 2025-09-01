import { UserDto } from "@/types/user/UserDto";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}
