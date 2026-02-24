import type { TeacherProfileDto } from "@/types";

export interface TeacherProfileFormProps {
  className?: string;
  initialData?: TeacherProfileDto | null;
  isEditMode?: boolean;
}
