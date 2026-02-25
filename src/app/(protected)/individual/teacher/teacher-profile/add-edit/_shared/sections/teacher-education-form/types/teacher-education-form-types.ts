import type { TeacherEducationDto } from "@/types";

export interface TeacherEducationFormProps {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  editData?: TeacherEducationDto | null;
}
