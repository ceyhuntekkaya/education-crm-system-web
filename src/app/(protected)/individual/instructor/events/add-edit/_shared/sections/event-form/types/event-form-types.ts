import type { EventDto } from "@/types";

export interface EventFormProps {
  className?: string;
  initialData?: EventDto | null;
  isEditMode?: boolean;
}
