import { PasswordChangeFormData } from "./form-data";

export interface ChangePasswordSectionProps {
  className?: string;
  initialData?: PasswordChangeFormData | null;
  isEditing?: boolean;
}
