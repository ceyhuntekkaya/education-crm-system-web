export interface PasswordResetConfirmDto {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
