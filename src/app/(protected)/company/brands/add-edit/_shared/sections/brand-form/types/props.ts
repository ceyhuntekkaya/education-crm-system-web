import { BrandDto } from "@/types";

export interface BrandFormProps {
  className?: string;
  initialData?: BrandDto | null;
  isEditing?: boolean;
}
