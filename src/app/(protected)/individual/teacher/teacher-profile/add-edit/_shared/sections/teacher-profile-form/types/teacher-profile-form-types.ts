import type { TeacherProfileDto } from "@/types";
import type { TeacherProfileFormValues } from "../schemas";

export interface TeacherProfileFormProps {
  className?: string;
  initialData?: Partial<TeacherProfileDto>;
  onSuccess?: () => void;
}

export interface TeacherProfileFormHandle {
  submit: () => Promise<any>;
  getValues: () => TeacherProfileFormValues;
  validate: () => Promise<boolean>;
}
