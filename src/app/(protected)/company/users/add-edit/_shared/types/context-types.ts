import {
  UserDto,
  PasswordChangeDto,
  UserRegistrationDto,
  UserProfileDto,
  UserUpdateDto,
} from "@/types";
import { MutationOptions } from "@/hooks";

/**
 * User add/edit context type
 */
export interface UserAddEditContextType {
  isEditing: boolean;
  userId: number | null;
  user: UserDto | null;
  userLoading: boolean;
  // Password change
  changePassword: (
    data: PasswordChangeDto,
    mutationOptions?: MutationOptions<void, PasswordChangeDto>
  ) => Promise<void | null>;
  changePasswordLoading: boolean;
  // Add user
  postUser: (
    data: UserRegistrationDto,
    mutationOptions?: MutationOptions<UserProfileDto, UserRegistrationDto>
  ) => Promise<UserProfileDto | null>;
  isAdding: boolean;
  // Edit user
  putUser: (
    data: UserUpdateDto,
    mutationOptions?: MutationOptions<UserProfileDto, UserUpdateDto>
  ) => Promise<UserProfileDto | null>;
  isUpdating: boolean;
}
