import { UserProfileDto } from "@/types";

export interface UserFormData extends Partial<UserProfileDto> {
  password?: string;
  confirmPassword?: string;
  userType?: string;
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
  acceptMarketing?: boolean;
}
