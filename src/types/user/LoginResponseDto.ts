import { UserDto } from './UserDto';

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserDto;
  permissions: string[];
}
