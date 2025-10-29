import { UserProfileDto, PasswordChangeDto } from "@/types";
import { MutationOptions } from "@/hooks";

/**
 * User add/edit context type
 */
export interface UserAddEditContextType {
  isEditing: boolean;
  userId: number | null;
  user: UserProfileDto | null;
  userLoading: boolean;
  // Password change
  changePassword: (
    data: PasswordChangeDto,
    mutationOptions?: MutationOptions<void, PasswordChangeDto>
  ) => Promise<void | null>;
  changePasswordLoading: boolean;
}
