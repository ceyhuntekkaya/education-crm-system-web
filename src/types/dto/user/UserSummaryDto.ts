import { UserType } from "../../../enums/UserType";

export interface UserSummaryDto {
  /** Format: int64 */
  id?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  /** @enum {string} */
  userType?: "INSTITUTION_USER" | "PARENT";
  profileImageUrl?: string;
  isActive?: boolean;
}
