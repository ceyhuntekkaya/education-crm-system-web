import { UserProfileDto } from "@/types";

/**
 * User add/edit context type
 */
export interface UserAddEditContextType {
  isEditing: boolean;
  userId: number | null;
  user: UserProfileDto | null;
  userLoading: boolean;
}
