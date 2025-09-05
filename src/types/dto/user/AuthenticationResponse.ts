import { UserDto } from "./UserDto";

export interface AuthenticationResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: UserDto;
}
