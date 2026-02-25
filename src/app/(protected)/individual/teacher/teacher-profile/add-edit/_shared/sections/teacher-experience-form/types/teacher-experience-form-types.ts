import type { TeacherExperienceDto } from "@/types";

export interface TeacherExperienceFormProps {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  editData?: TeacherExperienceDto | null;
}
