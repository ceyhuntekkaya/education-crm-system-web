import { SchoolDto } from "@/types";

export interface SchoolFormProps {
  className?: string;
  isEditing?: boolean;
  initialData?: SchoolDto | null;
}
