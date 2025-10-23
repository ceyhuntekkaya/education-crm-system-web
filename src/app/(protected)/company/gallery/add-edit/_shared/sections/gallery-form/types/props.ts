import { GalleryDto } from "@/types";

export interface GalleryFormProps {
  className?: string;
  initialData?: GalleryDto | null;
  isEditing?: boolean;
}
