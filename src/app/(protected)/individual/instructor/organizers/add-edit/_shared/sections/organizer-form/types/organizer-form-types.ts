import type { EventOrganizerDto } from "@/types";

export interface OrganizerFormProps {
  className?: string;
  initialData?: EventOrganizerDto | null;
  isEditMode?: boolean;
}
