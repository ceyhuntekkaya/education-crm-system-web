import { UserProfileDto } from "@/types";

export interface UserFormProps {
  className?: string;
  initialData?: UserProfileDto | null;
  isEditing?: boolean;
}
