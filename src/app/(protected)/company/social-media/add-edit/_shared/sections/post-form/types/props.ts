import { PostDto } from "@/types";

export interface PostFormProps {
  className?: string;
  initialData?: PostDto | null;
  isEditing?: boolean;
}
