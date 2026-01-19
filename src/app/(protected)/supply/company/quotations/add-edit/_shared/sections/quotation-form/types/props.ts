import { QuotationDto } from "@/types";

export interface QuotationFormProps {
  className?: string;
  initialData?: QuotationDto | null;
  isEditing?: boolean;
}
